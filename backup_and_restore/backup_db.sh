#!/bin/bash

# Parameters with defaults
ENV_FILE="./.env"
CONTAINER_NAME=""
DB_NAME=""
USER=""
OUTPUT_DIRECTORY=""
DB_TYPE="both"
TIMESTAMP=""
CONTAINER_ENGINE=""
HELP=false

# Function to detect container engine
detect_container_engine() {
    if [[ -n "$CONTAINER_ENGINE" ]]; then
        echo "$CONTAINER_ENGINE"
        return
    fi
    
    # Check for podman first (often preferred on RHEL/Fedora)
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
DATABASE BACKUP SCRIPT - Bash (Docker/Podman)

USAGE:
  ./backup_and_restore/backup_db.sh [OPTIONS]

DESCRIPTION:
  Backup NL-BIOMERO PostgreSQL databases (OMERO and/or BIOMERO) with error handling and validation.
  Supports both Docker and Podman container engines.

PARAMETERS:
  --envFile <path>         Path to .env file (default: ./.env)
  --containerName <name>   Override container name (auto-detected)
  --dbName <name>         Override database name (from .env)
  --user <username>       Override database user (from .env)
  --outputDirectory <dir> Output directory (default: ./backup_and_restore/backups)
  --dbType <type>         Database to backup: omero|biomero|both (default: both)
  --containerEngine <eng> Force container engine: docker|podman (auto-detected)
  --help                  Show this help message

EXAMPLES:
  # Backup both databases (default, auto-detect container engine)
  ./backup_and_restore/backup_db.sh

  # Force using podman
  ./backup_and_restore/backup_db.sh --containerEngine podman

  # Backup only OMERO database with docker
  ./backup_and_restore/backup_db.sh --dbType omero --containerEngine docker

  # Backup to custom directory
  ./backup_and_restore/backup_db.sh --outputDirectory "/backup/daily"

  # Custom configuration
  ./backup_and_restore/backup_db.sh --containerName "custom-db" --user "admin" --dbName "mydb"

  # Use different .env file
  ./backup_and_restore/backup_db.sh --envFile "./production.env"

OUTPUT FILES:
  {database}.{timestamp}.pg_dump
  Example: omero.2025-07-24_14-30-15-UTC.pg_dump

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
        --dbName)
            DB_NAME="$2"
            shift 2
            ;;
        --user)
            USER="$2"
            shift 2
            ;;
        --outputDirectory)
            OUTPUT_DIRECTORY="$2"
            shift 2
            ;;
        --dbType)
            if [[ "$2" == "omero" || "$2" == "biomero" || "$2" == "both" ]]; then
                DB_TYPE="$2"
            else
                echo "Error: dbType must be 'omero', 'biomero', or 'both'" >&2
                exit 1
            fi
            shift 2
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

# Simple .env reader
declare -A env_hash
if [[ -f "$ENV_FILE" ]]; then
    while IFS='=' read -r key value; do
        # Skip comments and empty lines
        if [[ ! "$key" =~ ^[[:space:]]*# && "$key" =~ ^[^[:space:]]+$ ]]; then
            # Remove quotes and trim whitespace
            key=$(echo "$key" | xargs)
            value=$(echo "$value" | xargs | sed 's/^"\(.*\)"$/\1/')
            env_hash["$key"]="$value"
        fi
    done < "$ENV_FILE"
else
    echo "Warning: .env file not found: $ENV_FILE" >&2
fi

# Single timestamp for all backups
if [[ -n "$TIMESTAMP" ]]; then
    # Use provided timestamp for coordinated backups
    timestamp="$TIMESTAMP"
    echo "Using provided timestamp: $timestamp"
else
    # Generate new timestamp
    timestamp=$(date '+%Y-%m-%d_%H-%M-%S-UTC')
fi

# Function to backup one database
backup_single() {
    local db_type="$1"
    local container_name="$2"
    local db_name="$3"
    local user="$4"
    local output_directory="$5"
    local timestamp="$6"
    
    # Auto-configure based on database type (Linux defaults with underscores)
    if [[ "$db_type" == "biomero" ]]; then
        final_container_name="${container_name:-nl-biomero_database-biomero_1}"  # Linux default
        final_db_name="${db_name:-${env_hash[BIOMERO_POSTGRES_DB]}}"
        final_user="${user:-${env_hash[BIOMERO_POSTGRES_USER]}}"
    else
        # OMERO database
        final_container_name="${container_name:-nl-biomero_database_1}"  # Linux default
        final_db_name="${db_name:-${env_hash[POSTGRES_DB]}}"
        final_user="${user:-${env_hash[POSTGRES_USER]}}"
    fi

    final_output_dir="${output_directory:-./backup_and_restore/backups}"
    
    # Generate filename using shared timestamp
    filename="${final_db_name}.${timestamp}.pg_dump"
    final_output="${final_output_dir}/${filename}"

    # Create output directory
    mkdir -p "$final_output_dir"

    echo "Backing up: ${final_user}@${final_db_name} from ${final_container_name} (${db_type} database)"
    echo "Output: ${final_output}"

    # Check if container exists and is running
    if ! $ENGINE ps --filter "name=${final_container_name}" --format "{{.Names}}" | grep -q "^${final_container_name}$"; then
        echo "Error: Container '${final_container_name}' not found or not running" >&2
        echo "Available containers:" >&2
        $ENGINE ps --format "table {{.Names}}\t{{.Status}}" >&2
        return 1
    fi

    # Backup with error checking (using detected container engine)
    if ! $ENGINE exec "$final_container_name" pg_dump -Fc -f "/tmp/$filename" "$final_db_name" -U "$final_user" 2>/dev/null; then
        echo "Error: pg_dump failed! Check container name and credentials." >&2
        echo "Container: $final_container_name" >&2
        echo "Database: $final_db_name" >&2
        echo "User: $final_user" >&2
        echo "Engine: $ENGINE" >&2
        return 1
    fi

    # Copy the backup file (using detected container engine)
    if ! $ENGINE cp "${final_container_name}:/tmp/${filename}" "$final_output" 2>/dev/null; then
        echo "Error: Failed to copy backup file!" >&2
        return 1
    fi

    # Cleanup temp file (using detected container engine)
    $ENGINE exec "$final_container_name" rm "/tmp/$filename" 2>/dev/null

    # Verify the backup size
    if [[ ! -f "$final_output" ]]; then
        echo "Error: Backup file was not created!" >&2
        return 1
    fi
    
    # Get file size (cross-platform)
    if command -v stat >/dev/null 2>&1; then
        if stat -f%z "$final_output" >/dev/null 2>&1; then
            # macOS/BSD stat
            backup_size=$(stat -f%z "$final_output")
        else
            # GNU/Linux stat
            backup_size=$(stat -c%s "$final_output")
        fi
    else
        # Fallback using ls
        backup_size=$(ls -l "$final_output" | awk '{print $5}')
    fi
    
    if [[ $backup_size -lt 10240 ]]; then
        echo "Error: Backup file is suspiciously small ($backup_size bytes). Check for errors!" >&2
        echo "Content preview:" >&2
        head -10 "$final_output" >&2
        return 1
    else
        # Calculate size in MB
        if command -v bc >/dev/null 2>&1; then
            backup_size_mb=$(echo "scale=2; $backup_size / 1048576" | bc)
        elif command -v python3 >/dev/null 2>&1; then
            backup_size_mb=$(python3 -c "print(round($backup_size/1048576, 2))")
        else
            backup_size_mb=$(awk "BEGIN {printf \"%.2f\", $backup_size/1048576}")
        fi
        echo "[OK] Backup successful: ${final_output} (${backup_size_mb} MB)"
        return 0
    fi
}

# Handle "both" option or single database
if [[ "$DB_TYPE" == "both" ]]; then
    echo "Backing up both databases with timestamp: $timestamp"
    echo ""
    
    if backup_single "omero" "$CONTAINER_NAME" "$DB_NAME" "$USER" "$OUTPUT_DIRECTORY" "$timestamp"; then
        omero_success=true
    else
        omero_success=false
    fi
    
    echo ""
    
    if backup_single "biomero" "" "" "" "$OUTPUT_DIRECTORY" "$timestamp"; then
        biomero_success=true
    else
        biomero_success=false
    fi
    
    echo ""
    if [[ "$omero_success" == "true" && "$biomero_success" == "true" ]]; then
        echo "[SUCCESS] Both backups completed successfully!"
        exit 0
    else
        echo "[FAIL] One or more backups failed!" >&2
        if [[ "$omero_success" != "true" ]]; then echo "  - OMERO backup failed" >&2; fi
        if [[ "$biomero_success" != "true" ]]; then echo "  - BIOMERO backup failed" >&2; fi
        exit 1
    fi
else
    # Single database backup
    echo "Backing up single database ($DB_TYPE) with timestamp: $timestamp"
    echo ""
    if backup_single "$DB_TYPE" "$CONTAINER_NAME" "$DB_NAME" "$USER" "$OUTPUT_DIRECTORY" "$timestamp"; then
        echo ""
        echo "[SUCCESS] $DB_TYPE backup completed successfully!"
        exit 0
    else
        echo "[FAIL] $DB_TYPE backup failed!" >&2
        exit 1
    fi
fi