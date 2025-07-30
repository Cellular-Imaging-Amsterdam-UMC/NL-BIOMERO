#!/bin/bash


# Parameters with defaults
ENV_FILE="./.env"
BACKUP_PATH=""
TARGET_PATH=""
VOLUME_NAME=""
BACKUP_DIRECTORY="./backup_and_restore/backups"
CONFIG_FILE=""
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
OMERO SERVER RESTORE SCRIPT - Bash

USAGE:
  ./backup_and_restore/restore_server.sh [OPTIONS]

DESCRIPTION:
  Restore OMERO server from backup tar.gz archive. Optionally override configuration.

PARAMETERS:
  --envFile <path>           Path to .env file (default: ./.env)
  --backupPath <path>        Path to backup tar.gz file (auto-detects latest if not specified)
  --targetPath <path>        Local folder to extract to (alternative to volume)
  --volumeName <name>        Docker volume name to create (auto-generated if not specified)
  --backupDirectory <dir>    Directory to search for latest backup (default: ./backup_and_restore/backups)
  --configFile <path>        Custom omero.config file to use instead of backup config
  --containerEngine <eng>    Force container engine: docker|podman (auto-detected)
  --help                     Show this help message

EXAMPLES:
  # Restore with original config from backup
  ./backup_and_restore/restore_server.sh --backupPath "./backups/omero-server.2025-07-29_12-09-40-UTC.tar.gz"

  # Restore with custom config file
  ./backup_and_restore/restore_server.sh --backupPath "./backups/omero-server.2025-07-29_12-09-40-UTC.tar.gz" --configFile "./config/production.omero.config"

  # Auto-detect backup + custom config for development
  ./backup_and_restore/restore_server.sh --configFile "./config/dev.omero.config" --volumeName "dev-omero"

  # Restore old backup with updated LDAP config
  ./backup_and_restore/restore_server.sh --backupPath "old-backup.tar.gz" --configFile "./config/new-ldap.omero.config"

CONFIG FILE FORMAT:
  Standard OMERO config dump format (from 'omero config get'):
    omero.db.host=database
    omero.db.name=omero
    omero.ldap.config=true
    omero.ldap.urls=ldap://new-server:389
    # etc...

PROCESS:
  1. Extract backup tar.gz to target location
  2. Override /OMERO/backup/omero.config with custom config (if provided)
  3. Verify backup contents and configuration
  4. Show docker-compose configuration

OUTPUT:
  Docker volume or local folder ready for mounting
  Automatic configuration restoration on container startup

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
        --backupPath)
            BACKUP_PATH="$2"
            shift 2
            ;;
        --targetPath)
            TARGET_PATH="$2"
            shift 2
            ;;
        --volumeName)
            VOLUME_NAME="$2"
            shift 2
            ;;
        --backupDirectory)
            BACKUP_DIRECTORY="$2"
            shift 2
            ;;
        --configFile)
            CONFIG_FILE="$2"
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

# Validate config file if provided
if [[ -n "$CONFIG_FILE" ]]; then
    if [[ ! -f "$CONFIG_FILE" ]]; then
        echo "Error: Config file not found: $CONFIG_FILE" >&2
        exit 1
    fi
    
    # Validate it looks like a config file
    if ! grep -q "omero\." "$CONFIG_FILE" 2>/dev/null && ! grep -q "^#" "$CONFIG_FILE" 2>/dev/null; then
        echo "Warning: Config file doesn't appear to contain OMERO configuration" >&2
        echo "Expected format: omero.property=value (one per line)"
        echo -n "Continue anyway? (y/N): "
        read -r continue_response
        if [[ "$continue_response" != "y" && "$continue_response" != "Y" ]]; then
            exit 1
        fi
    fi
    
    echo "Using custom config file: $CONFIG_FILE"
fi

# Auto-detect latest backup if not specified
if [[ -z "$BACKUP_PATH" ]]; then
    if [[ -d "$BACKUP_DIRECTORY" ]]; then
        latest_backup=$(ls -1t "$BACKUP_DIRECTORY"/omero-server.*.tar.gz 2>/dev/null | head -1)
        
        if [[ -n "$latest_backup" ]]; then
            BACKUP_PATH="$latest_backup"
            echo "Auto-detected latest backup: $(basename "$latest_backup")"
        else
            echo "Error: No backup files found in $BACKUP_DIRECTORY" >&2
            echo "Available files:"
            ls -1 "$BACKUP_DIRECTORY" 2>/dev/null | sed 's/^/  /' || echo "  (directory not found)"
            exit 1
        fi
    else
        echo "Error: Backup directory not found: $BACKUP_DIRECTORY" >&2
        exit 1
    fi
fi

# Validate backup file exists
if [[ ! -f "$BACKUP_PATH" ]]; then
    echo "Error: Backup file not found: $BACKUP_PATH" >&2
    exit 1
fi

# Extract timestamp from backup filename for naming
backup_filename=$(basename "$BACKUP_PATH")
if [[ "$backup_filename" =~ omero-server\.(.+)\.tar\.gz$ ]]; then
    backup_timestamp="${BASH_REMATCH[1]}"
else
    backup_timestamp=$(date '+%Y-%m-%d_%H-%M-%S')
fi

# Determine target (volume or folder)
if [[ -n "$TARGET_PATH" ]]; then
    # LOCAL FOLDER MODE
    final_target="$TARGET_PATH/omero-server-$backup_timestamp"
    target_type="local folder"
    
    if [[ -d "$final_target" ]]; then
        echo "Error: Target folder already exists: $final_target" >&2
        echo "Remove it first or choose a different path."
        exit 1
    fi
    
    mkdir -p "$final_target"
    final_target=$(realpath "$final_target")
    
else
    # DOCKER VOLUME MODE
    if [[ -n "$VOLUME_NAME" ]]; then
        final_volume_name="$VOLUME_NAME"
    else
        # Generate volume name from backup timestamp
        final_volume_name="omero-server-$backup_timestamp"
    fi
    
    # Check if volume exists
    existing_volume=$($ENGINE volume ls -q --filter "name=^${final_volume_name}$" 2>/dev/null)
    if [[ -n "$existing_volume" ]]; then
        echo "Error: Volume already exists: $final_volume_name" >&2
        echo "Remove it first with: $ENGINE volume rm $final_volume_name"
        exit 1
    fi
    
    # Create volume
    if ! $ENGINE volume create "$final_volume_name" >/dev/null; then
        echo "Error: Failed to create Docker volume: $final_volume_name" >&2
        exit 1
    fi
    
    final_target="$final_volume_name"
    target_type="Docker volume"
fi

echo "OMERO Server Restore:"
echo "  Backup: $BACKUP_PATH"
echo "  Target: $final_target ($target_type)"
echo "  Engine: $ENGINE"
echo "  Timestamp: $backup_timestamp"
if [[ -n "$CONFIG_FILE" ]]; then
    echo "  Config Override: $CONFIG_FILE"
fi
echo ""

# Get backup file size for progress indication
if command -v stat >/dev/null 2>&1; then
    if stat -f%z "$BACKUP_PATH" >/dev/null 2>&1; then
        # macOS/BSD stat
        backup_size=$(stat -f%z "$BACKUP_PATH")
    else
        # GNU/Linux stat
        backup_size=$(stat -c%s "$BACKUP_PATH")
    fi
    
    # Calculate size in MB
    if command -v bc >/dev/null 2>&1; then
        backup_size_mb=$(echo "scale=2; $backup_size / 1048576" | bc)
    elif command -v python3 >/dev/null 2>&1; then
        backup_size_mb=$(python3 -c "print(round($backup_size/1048576, 2))")
    else
        backup_size_mb=$(awk "BEGIN {printf \"%.2f\", $backup_size/1048576}")
    fi
    
    echo "Extracting OMERO backup ($backup_size_mb MB)..."
else
    echo "Extracting OMERO backup..."
fi

# Extract backup using temporary container
if [[ -n "$TARGET_PATH" ]]; then
    # Extract to local folder
    temp_container=$($ENGINE run -d -v "$final_target:/target" alpine:latest tail -f /dev/null 2>/dev/null)
else
    # Extract to volume
    temp_container=$($ENGINE run -d -v "$final_volume_name:/target" alpine:latest tail -f /dev/null 2>/dev/null)
fi

if [[ -z "$temp_container" || ${#temp_container} -lt 10 ]]; then
    echo "Error: Failed to create temporary container for extraction" >&2
    exit 1
fi

# Cleanup function
cleanup_container() {
    echo "Cleaning up temporary container..."
    $ENGINE stop "$temp_container" >/dev/null 2>&1
    $ENGINE rm "$temp_container" >/dev/null 2>&1
}

# Set trap to cleanup on exit
trap cleanup_container EXIT

# Copy backup to container
absolute_backup_path=$(realpath "$BACKUP_PATH")
if ! $ENGINE cp "$absolute_backup_path" "$temp_container:/tmp/backup.tar.gz"; then
    echo "Error: Failed to copy backup to container" >&2
    exit 1
fi

# Extract backup
echo "Extracting archive (this may take a while)..."
if ! $ENGINE exec "$temp_container" tar -xzf "/tmp/backup.tar.gz" -C /target >/dev/null 2>&1; then
    echo "Error: Failed to extract backup archive" >&2
    exit 1
fi

# Verify extraction
extracted_files=$($ENGINE exec "$temp_container" sh -c "find /target -type f | wc -l" 2>/dev/null)
if [[ -n "$extracted_files" && "$extracted_files" -gt 0 ]]; then
    echo "[OK] Backup extracted successfully ($extracted_files files)"
else
    echo "Error: Backup extraction appears to have failed (no files found)" >&2
    exit 1
fi

# Handle configuration
has_config=false
config_source=""

if [[ -n "$CONFIG_FILE" ]]; then
    # CUSTOM CONFIG MODE - Override with provided config file
    echo "Installing custom configuration..."
    
    # Ensure backup directory exists
    $ENGINE exec "$temp_container" mkdir -p "/target/backup" >/dev/null 2>&1
    
    # Copy custom config to container and place it in backup location
    absolute_config_path=$(realpath "$CONFIG_FILE")
    if $ENGINE cp "$absolute_config_path" "$temp_container:/tmp/custom.config"; then
        if $ENGINE exec "$temp_container" cp "/tmp/custom.config" "/target/backup/omero.config"; then
            echo "[OK] Custom configuration installed: /OMERO/backup/omero.config"
            has_config=true
            config_source="custom file: $(basename "$CONFIG_FILE")"
        else
            echo "Error: Failed to install custom configuration" >&2
            exit 1
        fi

        # Cleanup temp file
        $ENGINE exec "$temp_container" rm "/tmp/custom.config" >/dev/null 2>&1
    else
        echo "Error: Failed to copy custom config to container" >&2
        exit 1
    fi
    
else
    # CHECK FOR EXISTING CONFIG from backup
    if $ENGINE exec "$temp_container" test -f "/target/backup/omero.config" >/dev/null 2>&1; then
        echo "[OK] Configuration backup found: /OMERO/backup/omero.config"
        has_config=true
        config_source="backup archive"
    else
        echo "[WARN] No configuration backup found at /OMERO/backup/omero.config"
        config_source="none - manual config required"
    fi
fi

# Cleanup temporary backup file
$ENGINE exec "$temp_container" rm "/tmp/backup.tar.gz" >/dev/null 2>&1

# Clear trap since we're handling cleanup manually
trap - EXIT
cleanup_container

echo ""
echo "[SUCCESS] OMERO server restore completed successfully!"
echo ""

if [[ -n "$TARGET_PATH" ]]; then
    echo "Local folder created: $final_target"
    echo ""
    echo "To use in docker-compose.yml:"
    echo "  services:"
    echo "    omeroserver:"
    echo "      volumes:"
    echo "        - \"$final_target:/OMERO\""
else
    echo "Docker volume created: $final_volume_name"
    echo ""
    echo "To use in docker-compose.yml:"
    echo "  volumes:"
    echo "    omero:"
    echo "      external: true"
    echo "      name: $final_volume_name"
    echo ""
    echo "  services:"
    echo "    omeroserver:"
    echo "      volumes:"
    echo "        - \"omero:/OMERO\""
fi

echo ""
echo "Configuration restoration:"
echo "  Config source: $config_source"
if [[ "$has_config" == "true" ]]; then
    echo "  [OK] 00-restore-config.sh will automatically load config on container start"
    echo "  [OK] No manual configuration required!"
else
    echo "  [WARN] No config available - you'll need to configure manually"
    echo "  [TIP] Use CONFIG_ environment variables in docker-compose.yml"
    echo "  [TIP] Or mount .omero config files to /opt/omero/server/config/"
fi

echo ""
echo "Next steps:"
echo "  1. Update docker-compose.yml with the volume configuration above"
echo "  2. Start OMERO containers: $ENGINE-compose up -d"
echo "  3. Check logs: $ENGINE-compose logs omeroserver"

# Show volume/folder info
if [[ -n "$TARGET_PATH" ]]; then
    echo "  4. Restored to: $final_target"
else
    echo "  4. Check volume: $ENGINE volume inspect $final_volume_name"
fi

if [[ -n "$CONFIG_FILE" ]]; then
    echo ""
    echo "Configuration override applied:"
    echo "  [INFO] Original backup config (if any) was replaced"
    echo "  [INFO] Custom config from: $CONFIG_FILE"
    echo "  [INFO] Will be loaded automatically on container startup"
fi