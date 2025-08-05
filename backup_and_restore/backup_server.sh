#!/bin/bash

# Parameters with defaults
ENV_FILE="./.env"
CONTAINER_NAME=""
OUTPUT_DIRECTORY=""
TIMESTAMP=""
SKIP_DATA=false
SKIP_CONFIG=false
CONTAINER_ENGINE=""
HELP=false
OMERO_FOLDER=""

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
  Can backup from a running container or directly from a local folder.

PARAMETERS:
  --envFile <path>         Path to .env file (default: ./.env)
  --containerName <name>   Override OMERO server container name (default: nl-biomero-omeroserver-1)
  --outputDirectory <dir>  Output directory (default: ./backup_and_restore/backups)
  --omero-folder <path>    Backup from local OMERO folder instead of container
  --skipConfig             Skip configuration export to /OMERO/backup/omero.config
  --skipData               Skip data store backup (tar.gz archive)
  --containerEngine <eng>  Force container engine: docker|podman (auto-detected)
  --timestamp <timestamp>  Use specific timestamp (for coordinated backups)
  --help                   Show this help message

EXAMPLES:
  # Full backup from container (export fresh config + backup entire volume)
  ./backup_and_restore/backup_server.sh

  # Backup from local OMERO folder (no container needed)
  ./backup_and_restore/backup_server.sh --omero-folder "/srv/omero"

  # Export fresh config to /OMERO/backup only
  ./backup_and_restore/backup_server.sh --skipData

  # Backup data only (skip config export)
  ./backup_and_restore/backup_server.sh --skipConfig

  # Force using podman
  ./backup_and_restore/backup_server.sh --containerEngine podman

  # Custom configuration
  ./backup_and_restore/backup_server.sh --containerName "my-omero" --outputDirectory "/backup"

PROCESS (Container Mode):
  1. Export current config to /OMERO/backup/omero.config (unless --skipConfig)
  2. Create tar.gz archive of entire /OMERO volume (unless --skipData)

PROCESS (Folder Mode):
  1. Create tar.gz archive directly from local folder (unless --skipData)
  2. Config export skipped (no container access)

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
        --skipData)
            SKIP_DATA=true
            shift
            ;;
        --skipConfig)
            SKIP_CONFIG=true
            shift
            ;;
        --timestamp)
            TIMESTAMP="$2"
            shift 2
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
        --omero-folder)
            OMERO_FOLDER="$2"
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
if [[ -n "$TIMESTAMP" ]]; then
    # Use provided timestamp for coordinated backups
    timestamp="$TIMESTAMP"
    echo "Using provided timestamp: $timestamp"
else
    # Generate new timestamp
    timestamp=$(date '+%Y-%m-%d_%H-%M-%S-UTC')
fi

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

# Step 1: Export current configuration to /OMERO/backup (unless skipConfig)
if [[ "$SKIP_CONFIG" != "true" ]]; then
    echo "Exporting OMERO configuration to /OMERO/backup/omero.config..."
    
    # Check if container exists and is running
    if ! $ENGINE ps --filter "name=${FINAL_CONTAINER_NAME}" --format "{{.Names}}" | grep -q "^${FINAL_CONTAINER_NAME}$"; then
        echo "Error: Container '${FINAL_CONTAINER_NAME}' not found or not running" >&2
        echo "Available containers:" >&2
        $ENGINE ps --format "table {{.Names}}\t{{.Status}}" >&2
        exit 1
    fi
    
    # Create backup directory and export config - all in the server container
    config_cmd="mkdir -p /OMERO/backup && /opt/omero/server/venv3/bin/omero config get --show-password > /OMERO/backup/omero.config"
    
    if $ENGINE exec "$FINAL_CONTAINER_NAME" sh -c "$config_cmd" >/dev/null 2>&1; then
        echo "[OK] Configuration exported to /OMERO/backup/omero.config"
    else
        echo "Error: Failed to export OMERO configuration" >&2
        config_success=false
    fi
fi

# Step 2: Create tar.gz archive of entire /OMERO volume (unless skipData)
if [[ "$SKIP_DATA" != "true" ]]; then
    echo "Creating archive of complete OMERO data store..."
    data_file="omero-server.$timestamp.tar.gz"
    host_data_file="$absolute_output_dir/$data_file"
    
    echo "Creating tar.gz archive (this may take a while)..."
    
    # Check if container exists and is running
    if ! $ENGINE ps --filter "name=${FINAL_CONTAINER_NAME}" --format "{{.Names}}" | grep -q "^${FINAL_CONTAINER_NAME}$"; then
        echo "Error: Container '${FINAL_CONTAINER_NAME}' not found or not running" >&2
        exit 1
    fi
    
    # Create tar archive - all in the server container
    backup_cmd="cd /OMERO && tar -czf /tmp/$data_file . && echo 'Archive created successfully'"
    
    if $ENGINE exec "$FINAL_CONTAINER_NAME" sh -c "$backup_cmd" >/dev/null 2>&1; then
        # Copy archive to host
        if $ENGINE cp "$FINAL_CONTAINER_NAME:/tmp/$data_file" "$host_data_file" 2>/dev/null; then
            # Cleanup temp file in container
            $ENGINE exec "$FINAL_CONTAINER_NAME" rm "/tmp/$data_file" >/dev/null 2>&1
            
            # Verify file was created and has reasonable size
            if [[ -f "$host_data_file" ]]; then
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
                
                # Check if file is too small (less than 1MB is suspicious for OMERO server)
                if [[ $data_size -lt 1048576 ]]; then
                    echo "Error: Archive file is suspiciously small ($(echo "scale=2; $data_size / 1024" | bc) KB)" >&2
                    data_success=false
                else
                    # Calculate size in MB
                    if command -v bc >/dev/null 2>&1; then
                        data_size_mb=$(echo "scale=2; $data_size / 1048576" | bc)
                    elif command -v python3 >/dev/null 2>&1; then
                        data_size_mb=$(python3 -c "print(round($data_size/1048576, 2))")
                    else
                        data_size_mb=$(awk "BEGIN {printf \"%.2f\", $data_size/1048576}")
                    fi
                    echo "[OK] Complete OMERO backup: $host_data_file ($data_size_mb MB)"
                fi
            else
                echo "Error: Archive file was not created: $host_data_file" >&2
                data_success=false
            fi
        else
            echo "Error: Failed to copy OMERO archive from container" >&2
            data_success=false
        fi
    else
        echo "Error: Failed to create OMERO archive" >&2
        data_success=false
    fi
fi

# DRY: Utility function for tar backup from folder
backup_omero_folder() {
    local folder="$1"
    local output_dir="$2"
    local timestamp="$3"
    local skip_data="$4"
    
    if [[ "$skip_data" == "true" ]]; then
        echo "Data backup skipped (--skipData)."
        return 0
    fi
    
    local data_file="omero-server.$timestamp.tar.gz"
    local host_data_file="$output_dir/$data_file"
    local abs_folder
    abs_folder=$(realpath "$folder")
    
    echo "OMERO Server Folder Backup:"
    echo "  Source: $abs_folder"
    echo "  Output: $output_dir"
    echo "  Timestamp: $timestamp"
    echo ""
    
    echo "Creating tar.gz archive of OMERO folder (this may take a while)..."
    if (cd "$(dirname "$abs_folder")" && tar -czf "$host_data_file" "$(basename "$abs_folder")"); then
        if [[ -f "$host_data_file" ]]; then
            local data_size
            data_size=$(stat -c%s "$host_data_file" 2>/dev/null || stat -f%z "$host_data_file")
            if [[ $data_size -lt 1048576 ]]; then
                echo "Error: Archive file is suspiciously small ($(echo "scale=2; $data_size / 1024" | bc) KB)" >&2
                return 1
            else
                local data_size_mb
                data_size_mb=$(awk "BEGIN {printf \"%.2f\", $data_size/1048576}")
                echo "[OK] OMERO folder backup: $host_data_file ($data_size_mb MB)"
                echo "[SUCCESS] OMERO server folder backup completed successfully!"
                return 0
            fi
        else
            echo "Error: Archive file was not created: $host_data_file" >&2
            return 1
        fi
    else
        echo "Error: Failed to create OMERO folder archive" >&2
        return 1
    fi
}

# Main logic - check for folder mode first
if [[ -n "$OMERO_FOLDER" ]]; then
    mkdir -p "$FINAL_OUTPUT_DIR"
    absolute_output_dir=$(realpath "$FINAL_OUTPUT_DIR")
    backup_omero_folder "$OMERO_FOLDER" "$absolute_output_dir" "$timestamp" "$SKIP_DATA"
    exit $?
fi

echo ""
if [[ "$config_success" == "true" && "$data_success" == "true" ]]; then
    echo "[SUCCESS] OMERO server backup completed successfully!"
    echo ""
    
    if [[ "$SKIP_CONFIG" == "true" ]]; then
        echo "Configuration export skipped."
    elif [[ "$SKIP_DATA" == "true" ]]; then
        echo "Data backup skipped."
    else
        echo "Complete backup created:"
        echo "  omero-server.$timestamp.tar.gz"
        echo ""
        echo "Backup includes:"
        echo "[OK] OMERO binary data store"
        echo "[OK] Current configuration (/OMERO/backup/omero.config)"
    fi
    exit 0
else
    echo "[FAIL] OMERO server backup failed!" >&2
    if [[ "$config_success" != "true" ]]; then echo "  - Configuration export failed" >&2; fi
    if [[ "$data_success" != "true" ]]; then echo "  - Data archive creation failed" >&2; fi
    echo "" >&2
    echo "Troubleshooting:" >&2
    echo "  - Ensure container '$FINAL_CONTAINER_NAME' is running: $ENGINE ps" >&2
    echo "  - Check container logs: $ENGINE logs $FINAL_CONTAINER_NAME" >&2
    echo "  - Verify OMERO server is operational" >&2
    exit 1
fi

if [[ "$SKIP_CONFIG" == "true" && "$SKIP_DATA" == "true" ]]; then
    echo "[FAIL] Both --skipConfig and --skipData specified, nothing to do!" >&2
    exit 1
fi