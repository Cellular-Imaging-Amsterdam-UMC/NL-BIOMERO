#!/bin/bash

# Parameters with defaults
ENV_FILE="./.env"
CONTAINER_NAME=""
OUTPUT_DIRECTORY=""
VOLUME_NAME=""
CONFIG_ONLY=false
DATA_ONLY=false
CONTAINER_ENGINE=""
HELP=false

# Function to detect container engine
detect_container_engine() {
    if [[ -n "$CONTAINER_ENGINE" ]]; then
        echo "$CONTAINER_ENGINE"
        return
    fi
    
    if command -v podman >/dev/null 2>&1; then
        echo "podman"
    elif command -v docker >/dev/null 2>&1; then
        echo "docker"
    else
        echo "Error: Neither podman nor docker found in PATH" >&2
        exit 1
    fi
}

# Function to show help
show_help() {
    cat << 'EOF'
OMERO SERVER BACKUP SCRIPT - Bash

USAGE:
  ./backup_and_restore/backup_server.sh [OPTIONS]

DESCRIPTION:
  Backup OMERO server data store (/OMERO volume) including configuration.
  Requires running OMERO server container.

PARAMETERS:
  --envFile <path>         Path to .env file (default: ./.env)
  --containerName <name>   Override OMERO server container name (default: nl-biomero-omeroserver-1)
  --outputDirectory <dir>  Output directory (default: ./backup_and_restore/backups)
  --volumeName <name>      Override OMERO volume name (default: nl-biomero_omero)
  --configOnly             Export config to /OMERO/backup/omero.config only
  --dataOnly               Backup only data store (skip config export)
  --containerEngine <eng>  Force container engine: docker|podman (auto-detected)
  --help                   Show this help message

EXAMPLES:
  # Full backup (export fresh config + backup entire volume)
  ./backup_and_restore/backup_server.sh

  # Export fresh config to /OMERO/backup only
  ./backup_and_restore/backup_server.sh --configOnly

  # Backup data only (skip config export)
  ./backup_and_restore/backup_server.sh --dataOnly

  # Force using podman
  ./backup_and_restore/backup_server.sh --containerEngine podman

  # Custom configuration
  ./backup_and_restore/backup_server.sh --containerName "my-omero" --outputDirectory "/backup"

PROCESS:
  1. Export current config to /OMERO/backup/omero.config (unless --dataOnly)
  2. Create tar.gz archive of entire /OMERO volume (unless --configOnly)

OUTPUT:
  omero-server.{timestamp}.tar.gz (includes config, data, scripts, everything)

CONTAINER ENGINES:
  Auto-detects podman or docker. Prefers podman if both are available.

For more information, see: backup_and_restore/README.md
EOF
    exit 0
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --help)
            show_help
            ;;
        --envFile)
            ENV_FILE="$2"
            shift 2
            ;;
        --containerName)
            CONTAINER_NAME="$2"
            shift 2
            ;;
        --outputDirectory)
            OUTPUT_DIRECTORY="$2"
            shift 2
            ;;
        --volumeName)
            VOLUME_NAME="$2"
            shift 2
            ;;
        --configOnly)
            CONFIG_ONLY=true
            shift
            ;;
        --dataOnly)
            DATA_ONLY=true
            shift
            ;;
        --containerEngine)
            if [[ "$2" == "docker" || "$2" == "podman" ]]; then
                CONTAINER_ENGINE="$2"
            else
                echo "Error: containerEngine must be 'docker' or 'podman'" >&2
                exit 1
            fi
            shift 2
            ;;
        *)
            echo "Unknown parameter: $1" >&2
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Detect container engine
ENGINE=$(detect_container_engine)
echo "Using container engine: $ENGINE"

# Read environment file
declare -A env_hash
if [[ -f "$ENV_FILE" ]]; then
    while IFS= read -r line; do
        if [[ $line =~ ^[^#]*= ]]; then
            key=$(echo "$line" | cut -d'=' -f1 | xargs)
            value=$(echo "$line" | cut -d'=' -f2- | xargs)
            env_hash["$key"]="$value"
        fi
    done < "$ENV_FILE"
fi

# Auto-configure defaults
FINAL_CONTAINER_NAME="${CONTAINER_NAME:-nl-biomero-omeroserver-1}"
FINAL_OUTPUT_DIR="${OUTPUT_DIRECTORY:-./backup_and_restore/backups}"

# Single timestamp for all backups
timestamp=$(date '+%Y-%m-%d_%H-%M-%S-UTC')

# Create output directory
mkdir -p "$FINAL_OUTPUT_DIR"
absolute_output_dir=$(realpath "$FINAL_OUTPUT_DIR")

echo "OMERO Server Backup:"
echo "  Container: $FINAL_CONTAINER_NAME"
echo "  Output: $FINAL_OUTPUT_DIR"
echo "  Engine: $ENGINE"
echo "  Timestamp: $timestamp"
echo ""

config_success=true
data_success=true

# Step 1: Export current configuration to /OMERO/backup (unless dataOnly)
if [[ "$DATA_ONLY" != "true" ]]; then
    echo "Exporting OMERO configuration to /OMERO/backup/omero.config..."
    
    # Create backup directory and export config - all in the server container
    config_cmd="mkdir -p /OMERO/backup && /opt/omero/server/venv3/bin/omero config get --show-password > /OMERO/backup/omero.config"
    
    if $ENGINE exec "$FINAL_CONTAINER_NAME" sh -c "$config_cmd" >/dev/null 2>&1; then
        echo ">> Configuration exported to /OMERO/backup/omero.config"
    else
        echo "Error: Failed to export OMERO configuration" >&2
        config_success=false
    fi
fi

# Step 2: Create tar.gz archive of entire /OMERO volume (unless configOnly)
if [[ "$CONFIG_ONLY" != "true" ]]; then
    echo "Creating archive of complete OMERO data store..."
    data_file="omero-server.$timestamp.tar.gz"
    host_data_file="$absolute_output_dir/$data_file"
    
    echo "Creating tar.gz archive (this may take a while)..."
    
    # Create tar archive - all in the server container
    backup_cmd="cd /OMERO && tar -czf /tmp/$data_file . && echo 'Archive created successfully'"
    
    if $ENGINE exec "$FINAL_CONTAINER_NAME" sh -c "$backup_cmd" >/dev/null 2>&1; then
        # Copy archive to host
        if $ENGINE cp "$FINAL_CONTAINER_NAME:/tmp/$data_file" "$host_data_file"; then
            # Cleanup temp file in container
            $ENGINE exec "$FINAL_CONTAINER_NAME" rm "/tmp/$data_file" >/dev/null 2>&1
            
            # Get file size (cross-platform)
            if command -v stat >/dev/null 2>&1; then
                if stat -f%z "$host_data_file" >/dev/null 2>&1; then
                    # macOS/BSD stat
                    data_size=$(stat -f%z "$host_data_file")
                else
                    # GNU/Linux stat
                    data_size=$(stat -c%s "$host_data_file")
                fi
            else
                # Fallback using ls
                data_size=$(ls -l "$host_data_file" | awk '{print $5}')
            fi
            
            # Calculate size in MB
            if command -v bc >/dev/null 2>&1; then
                data_size_mb=$(echo "scale=2; $data_size / 1048576" | bc)
            elif command -v python3 >/dev/null 2>&1; then
                data_size_mb=$(python3 -c "print(round($data_size/1048576, 2))")
            else
                data_size_mb=$(awk "BEGIN {printf \"%.2f\", $data_size/1048576}")
            fi
            
            echo ">> Complete OMERO backup: $host_data_file ($data_size_mb MB)"
        else
            echo "Error: Failed to copy OMERO archive from container" >&2
            data_success=false
        fi
    else
        echo "Error: Failed to create OMERO archive" >&2
        data_success=false
    fi
fi

echo ""
if [[ "$config_success" == "true" && "$data_success" == "true" ]]; then
    echo "*** OMERO server backup completed successfully! ***"
    echo ""
    
    if [[ "$CONFIG_ONLY" == "true" ]]; then
        echo "Configuration exported to:"
        echo "  /OMERO/backup/omero.config (inside OMERO volume/mount)"
    elif [[ "$DATA_ONLY" == "true" ]]; then
        echo "Data backup created:"
        echo "  omero-server.$timestamp.tar.gz"
    else
        echo "Complete backup created:"
        echo "  omero-server.$timestamp.tar.gz"
        echo ""
        echo "Backup includes:"
        echo ">> OMERO binary data store"
        echo ">> Current configuration (/OMERO/backup/omero.config)"
    fi
else
    echo "*** OMERO server backup failed! ***" >&2
    exit 1
fi