#!/bin/bash

# Default parameters
ENV_FILE="./.env"
CONTAINER_NAME=""
DB_NAME=""
USER=""
OUTPUT_DIRECTORY=""
DB_TYPE="both"

# Function to show help
show_help() {
    cat << 'EOF'
DATABASE BACKUP SCRIPT - Bash

USAGE:
  ./backup_and_restore/backup_db.sh [OPTIONS]

DESCRIPTION:
  Backup NL-BIOMERO PostgreSQL databases (OMERO and/or BIOMERO) with error handling and validation.

PARAMETERS:
  --envFile <path>         Path to .env file (default: ./.env)
  --containerName <name>   Override container name (auto-detected)
  --dbName <name>         Override database name (from .env)
  --user <username>       Override database user (from .env)
  --outputDirectory <dir> Output directory (default: ./backup_and_restore/backups)
  --dbType <type>         Database to backup: omero|biomero|both (default: both)
  --help                  Show this help message

EXAMPLES:
  # Backup both databases (default)
  ./backup_and_restore/backup_db.sh

  # Backup only OMERO database
  ./backup_and_restore/backup_db.sh --dbType omero

  # Backup to custom directory
  ./backup_and_restore/backup_db.sh --outputDirectory "/backup/daily"

  # Custom configuration
  ./backup_and_restore/backup_db.sh --containerName "custom-db" --user "admin" --dbName "mydb"

  # Use different .env file
  ./backup_and_restore/backup_db.sh --envFile "./production.env"

OUTPUT FILES:
  {database}.{timestamp}.pg_dump
  Example: omero.2025-07-24_14-30-15-UTC.pg_dump

For more information, see: backup_and_restore/README.md
EOF
    exit 0
}

# Add this case to your parameter parsing while loop:
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
                echo "Error: dbType must be 'omero', 'biomero', or 'both'"
                exit 1
            fi
            shift 2
            ;;
        *)
            echo "Unknown parameter: $1"
            exit 1
            ;;
    esac
done

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
fi

# Single timestamp for all backups
timestamp=$(date '+%Y-%m-%d_%H-%M-%S-UTC')

# Function to backup one database
backup_single() {
    local db_type="$1"
    local container_name="$2"
    local db_name="$3"
    local user="$4"
    local output_directory="$5"
    local timestamp="$6"
    
    # Auto-configure based on database type
    if [[ "$db_type" == "biomero" ]]; then
        final_container_name="${container_name:-nl-biomero-database-biomero-1}"
        final_db_name="${db_name:-${env_hash[BIOMERO_POSTGRES_DB]}}"
        final_user="${user:-${env_hash[BIOMERO_POSTGRES_USER]}}"
    else
        # Default to OMERO
        final_container_name="${container_name:-nl-biomero-database-1}"
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

    # Backup with error checking
    if ! docker exec "$final_container_name" pg_dump -Fc -f "/tmp/$filename" "$final_db_name" -U "$final_user"; then
        echo "Error: pg_dump failed! Check container name and credentials." >&2
        echo "Container: $final_container_name"
        echo "Database: $final_db_name"
        echo "User: $final_user"
        return 1
    fi

    # Copy the backup file
    if ! docker cp "${final_container_name}:/tmp/${filename}" "$final_output"; then
        echo "Error: Failed to copy backup file!" >&2
        return 1
    fi

    # Cleanup temp file
    docker exec "$final_container_name" rm "/tmp/$filename"

    # Verify the backup size
    if [[ ! -f "$final_output" ]]; then
        echo "Error: Backup file was not created!" >&2
        return 1
    fi
    
    backup_size=$(stat -f%z "$final_output" 2>/dev/null || stat -c%s "$final_output" 2>/dev/null)
    if [[ $backup_size -lt 10240 ]]; then
        echo "Warning: Backup file is suspiciously small ($backup_size bytes). Check for errors!" >&2
        echo "Content preview:"
        head -10 "$final_output"
        return 1
    else
        backup_size_mb=$(echo "scale=2; $backup_size / 1048576" | bc -l 2>/dev/null || python3 -c "print(round($backup_size/1048576, 2))")
        echo "Backup successful: ${final_output} (${backup_size_mb} MB)"
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
        echo "*** Both backups completed successfully! ***"
    else
        echo "Error: One or more backups failed!" >&2
        exit 1
    fi
else
    # Single database backup
    echo "Backing up single database ($DB_TYPE) with timestamp: $timestamp"
    echo ""
    if backup_single "$DB_TYPE" "$CONTAINER_NAME" "$DB_NAME" "$USER" "$OUTPUT_DIRECTORY" "$timestamp"; then
        echo ""
        echo "*** Backup completed successfully! ***"
    else
        exit 1
    fi
fi