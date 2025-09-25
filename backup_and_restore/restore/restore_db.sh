#!/bin/bash

# Parameters with defaults
ENV_FILE="./.env"
DUMP_PATH=""
VOLUME_NAME=""
LOCAL_FOLDER=""
DB_NAME=""
USER=""
PASSWORD=""
DB_TYPE="both"
POSTGRES_VERSION="16"
BACKUP_DIRECTORY="./backup_and_restore/backups"
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
DATABASE RESTORE SCRIPT - Bash (Docker/Podman)

USAGE:
  ./backup_and_restore/restore_db.sh [OPTIONS]

DESCRIPTION:
  Restore NL-BIOMERO PostgreSQL database dumps to new volumes or local folders.
  Supports both Docker and Podman container engines with PostgreSQL version upgrades.

PARAMETERS:
  --envFile <path>           Path to .env file (default: ./.env)
  --dumpPath <path>          Specific dump file path (overrides auto-detection)
  --volumeName <name>        Override volume name (auto-generated from dump timestamp)
  --localFolder <path>       Local folder instead of Docker volume (overrides volumeName)
  --dbName <name>           Override database name (from .env)
  --user <username>         Override database user (from .env)
  --password <password>     Override database password (from .env)
  --dbType <type>          Database to restore: omero|biomero|both (default: both)
  --postgresVersion <ver>  Postgres version (default: 16, e.g., 11, 12, 13, 14, 15, 16)
  --backupDirectory <dir>  Directory to search for latest dumps (default: ./backup_and_restore/backups)
  --containerEngine <eng>  Force container engine: docker|podman (auto-detected)
  --help                   Show this help message

EXAMPLES:
  # Restore both databases from latest dumps to Postgres 16 volumes (default)
  ./backup_and_restore/restore_db.sh

  # Restore to local folder instead of Docker volumes
  ./backup_and_restore/restore_db.sh --localFolder "/srv/postgresql"

  # Force using podman
  ./backup_and_restore/restore_db.sh --containerEngine podman

  # Restore specific dump file with docker
  ./backup_and_restore/restore_db.sh --dumpPath "./backup.pg_dump" --dbType omero --containerEngine docker

  # Restore to Postgres 13
  ./backup_and_restore/restore_db.sh --postgresVersion 13

  # Custom configuration
  ./backup_and_restore/restore_db.sh --volumeName "my-restored-db" --user "admin" --password "secret"

OUTPUT VOLUMES:
  Auto-generated names: {dbtype}-{timestamp}-pg{version}
  Example: omero-2025-07-24-14-06-06-pg16

OUTPUT FOLDERS (with --localFolder):
  {localFolder}/{dbtype}-{timestamp}-pg{version}/
  Example: /srv/postgresql/omero-2025-07-24-14-06-06-pg16/

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
        --dumpPath)
            DUMP_PATH="$2"
            shift 2
            ;;
        --volumeName)
            VOLUME_NAME="$2"
            shift 2
            ;;
        --localFolder)  # NEW PARAMETER
            LOCAL_FOLDER="$2"
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
        --password)
            PASSWORD="$2"
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
        --postgresVersion)
            POSTGRES_VERSION="$2"
            shift 2
            ;;
        --backupDirectory)
            BACKUP_DIRECTORY="$2"
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

# Validate mutually exclusive parameters
if [[ -n "$VOLUME_NAME" && -n "$LOCAL_FOLDER" ]]; then
    echo "Error: --volumeName and --localFolder are mutually exclusive. Choose one." >&2
    exit 1
fi

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

# Function to find latest dump file
find_latest_dump() {
    local backup_dir="$1"
    local db_type="$2"
    
    if [[ ! -d "$backup_dir" ]]; then
        echo "Error: Backup directory not found: $backup_dir" >&2
        return 1
    fi
    
    # Look for dump files matching pattern: {dbname}.{timestamp}.pg_dump
    local pattern
    if [[ "$db_type" == "omero" ]]; then
        pattern="omero.*.pg_dump"
    else
        pattern="biomero.*.pg_dump"
    fi
    
    # Find latest dump file
    local latest_dump
    latest_dump=$(find "$backup_dir" -name "$pattern" -type f -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2-)
    
    if [[ -z "$latest_dump" ]]; then
        echo "Error: No $db_type dump files found in $backup_dir" >&2
        return 1
    fi
    
    echo "Found latest $db_type dump: $(basename "$latest_dump")" >&2
    echo "$latest_dump"
    return 0
}

# Function to generate descriptive volume name from dump file
get_descriptive_volume_name() {
    local dump_path="$1"
    local db_type="$2"
    local postgres_version="$3"
    
    # Extract timestamp from dump filename
    # Example: "omero.2025-07-24_14-06-06-UTC.pg_dump" -> "2025-07-24-14-06-06"
    local filename
    filename=$(basename "$dump_path" .pg_dump)
    
    if [[ "$filename" =~ ([0-9]{4}-[0-9]{2}-[0-9]{2}_[0-9]{2}-[0-9]{2}-[0-9]{2}) ]]; then
        local timestamp="${BASH_REMATCH[1]//_/-}"
        echo "$db_type-$timestamp-pg$postgres_version"
    else
        # Fallback to old naming if pattern doesn't match
        echo "database-$db_type-restored"
    fi
}

# Function to restore one database
restore_single() {
    local db_type="$1"
    local dump_path="$2"
    local volume_name="$3"
    local local_folder="$4"
    local db_name="$5"
    local user="$6"
    local password="$7"
    local postgres_version="$8"
    
    # Auto-configure based on database type
    local final_db_name final_user final_password
    
    if [[ "$db_type" == "biomero" ]]; then
        final_db_name="${db_name:-${env_hash[BIOMERO_POSTGRES_DB]}}"
        final_user="${user:-${env_hash[BIOMERO_POSTGRES_USER]}}"
        final_password="${password:-${env_hash[BIOMERO_POSTGRES_PASSWORD]}}"
    else
        # Default to OMERO
        final_db_name="${db_name:-${env_hash[POSTGRES_DB]}}"
        final_user="${user:-${env_hash[POSTGRES_USER]}}"
        final_password="${password:-${env_hash[POSTGRES_PASSWORD]}}"
    fi

    # Find dump file if not specified (needed for auto-naming)
    if [[ -z "$dump_path" ]]; then
        dump_path=$(find_latest_dump "$BACKUP_DIRECTORY" "$db_type")
        if [[ $? -ne 0 ]]; then
            echo "Error: Could not find dump file for $db_type" >&2
            return 1
        fi
    fi

    # Generate target name/path
    local final_target_path target_type mount_string
    
    if [[ -n "$local_folder" ]]; then
        # LOCAL FOLDER MODE
        local descriptive_name
        descriptive_name=$(get_descriptive_volume_name "$dump_path" "$db_type" "$postgres_version")
        final_target_path="$local_folder/$descriptive_name"
        target_type="local folder"
        
        # Check if folder already exists
        if [[ -d "$final_target_path" ]]; then
            echo "Error: Local folder '$final_target_path' already exists! Please remove it first or choose a different path." >&2
            return 1
        fi
        
        # Create the target directory
        mkdir -p "$final_target_path"
        
        # Convert to absolute path for container mounting
        final_target_path=$(realpath "$final_target_path")
        mount_string="$final_target_path:/var/lib/postgresql/data"
        
    else
        # DOCKER VOLUME MODE
        local final_volume_name
        if [[ -n "$volume_name" ]]; then
            final_volume_name="$volume_name"
        else
            final_volume_name=$(get_descriptive_volume_name "$dump_path" "$db_type" "$postgres_version")
        fi
        target_type="Docker volume"
        
        # Check if volume already exists
        if $ENGINE volume ls -q --filter "name=^${final_volume_name}$" 2>/dev/null | grep -q .; then
            echo "Error: Volume '$final_volume_name' already exists! Please remove it first with: $ENGINE volume rm $final_volume_name" >&2
            return 1
        fi
        
        # Create volume
        echo "Creating volume: $final_volume_name"
        $ENGINE volume create "$final_volume_name" >/dev/null
        mount_string="$final_volume_name:/var/lib/postgresql/data"
        final_target_path="$final_volume_name"  # For display purposes
    fi

    # Verify dump file exists
    if [[ ! -f "$dump_path" ]]; then
        echo "Error: Dump file not found: $dump_path" >&2
        return 1
    fi
    
    echo "Restoring $db_type database:"
    echo "  From: $dump_path"
    echo "  To $target_type: $final_target_path"
    echo "  Database: $final_db_name"
    echo "  User: $final_user"
    echo "  Postgres: $postgres_version"
    echo "  Engine: $ENGINE"
    
    # Convert to absolute path for container mounting
    local absolute_dump_path
    absolute_dump_path=$(realpath "$dump_path")
    if [[ $? -ne 0 ]]; then
        echo "Error: Could not resolve dump path: $dump_path" >&2
        return 1
    fi
    
    # Start postgres container in background
    echo "Starting PostgreSQL container..."
    local container_id error_output
    
    # Capture both stdout and stderr
    error_output=$($ENGINE run -d \
        --userns=keep-id \
        --security-opt label=disable \
        -v "$absolute_dump_path:/dump.pg_dump" \
        -v "$mount_string" \
        -e "POSTGRES_PASSWORD=$final_password" \
        "postgres:$postgres_version" 2>&1)
    
    # Extract container ID from output (should be last line if successful)
    container_id=$(echo "$error_output" | tail -1)

    if [[ -z "$container_id" || ${#container_id} -lt 10 ]]; then
        echo "Error: Failed to start PostgreSQL container" >&2
        echo "Container engine output: $error_output" >&2
        echo "" >&2
        echo "Debug info:" >&2
        echo "  Dump path: $absolute_dump_path" >&2
        echo "  Mount string: $mount_string" >&2
        echo "  Target folder exists: $(ls -ld "$final_target_path" 2>/dev/null || echo "NO")" >&2
        echo "  Target folder permissions: $(stat -c '%a %U:%G' "$final_target_path" 2>/dev/null || echo "N/A")" >&2
        echo "  Dump file exists: $(ls -l "$absolute_dump_path" 2>/dev/null || echo "NO")" >&2
        echo "  Available space in target: $(df -h "$final_target_path" 2>/dev/null | tail -1 || echo "N/A")" >&2
        return 1
    fi
    
    echo "Container started with ID: ${container_id:0:12}..."
    
    # Check if container is actually running
    sleep 2
    if ! $ENGINE ps --filter "id=$container_id" --format "{{.Status}}" | grep -q "Up"; then
        echo "Error: Container started but is not running" >&2
        echo "Container logs:" >&2
        $ENGINE logs "$container_id" 2>&1 || echo "Could not retrieve logs"
        echo "" >&2
        echo "Container status:" >&2
        $ENGINE ps -a --filter "id=$container_id" --format "table {{.ID}}\t{{.Status}}\t{{.Ports}}" 2>&1 || echo "Could not retrieve status"
        return 1
    fi
    
    # Cleanup function
    cleanup_container() {
        echo "Cleaning up container..."
        $ENGINE stop "$container_id" >/dev/null 2>&1
        $ENGINE rm "$container_id" >/dev/null 2>&1
    }
    
    # Set trap to cleanup on exit
    trap cleanup_container EXIT
    
    echo "Waiting for PostgreSQL to be ready..."
    sleep 15
    
    # Wait for postgres to be ready
    local max_attempts=30
    local attempts=0
    while [[ $attempts -lt $max_attempts ]]; do
        if $ENGINE exec "$container_id" pg_isready -U postgres >/dev/null 2>&1; then
            break
        fi
        sleep 2
        ((attempts++))
    done
    
    if [[ $attempts -ge $max_attempts ]]; then
        echo "Error: PostgreSQL failed to start after $max_attempts attempts" >&2
        return 1
    fi
    
    echo "Creating user and database..."
    if ! $ENGINE exec "$container_id" psql -U postgres -c "CREATE USER $final_user WITH PASSWORD '$final_password';" >/dev/null; then
        echo "Error: Failed to create user" >&2
        return 1
    fi
    
    if ! $ENGINE exec "$container_id" createdb -U postgres -O "$final_user" "$final_db_name" >/dev/null; then
        echo "Error: Failed to create database" >&2
        return 1
    fi
    
    echo "Restoring dump file..."
    if ! $ENGINE exec "$container_id" pg_restore -U "$final_user" -Fc -d "$final_db_name" /dump.pg_dump; then
        echo "Error: pg_restore failed" >&2
        echo "This usually means the volume already contained data or there were constraint conflicts." >&2
        return 1
    fi
    
    echo "Verifying restored data..."
    local job_count_output table_name
    if [[ "$db_type" == "biomero" ]]; then
        job_count_output=$($ENGINE exec "$container_id" psql -U "$final_user" -d "$final_db_name" -t -c "SELECT COUNT(*) FROM workflowtracker_events;" 2>/dev/null)
        table_name="workflowtracker_events"
    else
        job_count_output=$($ENGINE exec "$container_id" psql -U "$final_user" -d "$final_db_name" -t -c "SELECT COUNT(*) FROM job;" 2>/dev/null)
        table_name="job"
    fi

    # Extract just the number from the output
    local job_count
    job_count=$(echo "$job_count_output" | xargs)

    if [[ "$job_count" =~ ^[0-9]+$ && $job_count -gt 0 ]]; then
        # Get dump file size
        local dump_size dump_size_mb
        if command -v stat >/dev/null 2>&1; then
            if stat -f%z "$dump_path" >/dev/null 2>&1; then
                dump_size=$(stat -f%z "$dump_path")
            else
                dump_size=$(stat -c%s "$dump_path")
            fi
        else
            dump_size=$(ls -l "$dump_path" | awk '{print $5}')
        fi
        
        # Calculate size in MB
        if command -v bc >/dev/null 2>&1; then
            dump_size_mb=$(echo "scale=2; $dump_size / 1048576" | bc)
        elif command -v python3 >/dev/null 2>&1; then
            dump_size_mb=$(python3 -c "print(round($dump_size/1048576, 2))")
        else
            dump_size_mb=$(awk "BEGIN {printf \"%.2f\", $dump_size/1048576}")
        fi
        
        echo "$table_name records restored: $job_count"
        echo "✅ $db_type restore successful: $final_target_path (${dump_size_mb} MB, $job_count $table_name records)"
        
        # Clear trap since we're returning successfully
        trap - EXIT
        cleanup_container
        
        # Output success info for parsing
        echo "RESTORE_SUCCESS:$final_target_path:$target_type:$mount_string"
        return 0
    else
        echo "Error: No data was restored! Could not verify $table_name count from: '$job_count_output'" >&2
        return 1
    fi
}

# Handle "both" option or single database
if [[ "$DB_TYPE" == "both" ]]; then
    echo "Restoring both databases to Postgres $POSTGRES_VERSION"
    echo ""
    
    # Remove 'local' keyword for variables in main script scope
    if [[ -n "$VOLUME_NAME" ]]; then
        omero_volume="$VOLUME_NAME-omero"
        biomero_volume="$VOLUME_NAME-biomero"
    else
        omero_volume=""  # Let function auto-generate
        biomero_volume="" # Let function auto-generate
    fi
    
    if restore_single "omero" "$DUMP_PATH" "$omero_volume" "$LOCAL_FOLDER" "$DB_NAME" "$USER" "$PASSWORD" "$POSTGRES_VERSION"; then
        omero_success=true
    else
        omero_success=false
    fi
    
    echo ""
    
    if restore_single "biomero" "" "$biomero_volume" "$LOCAL_FOLDER" "" "" "" "$POSTGRES_VERSION"; then
        biomero_success=true
    else
        biomero_success=false
    fi
    
    echo ""
    if [[ "$omero_success" == "true" && "$biomero_success" == "true" ]]; then
        echo "*** Both restores completed successfully! ***"
        echo ""
        echo "Volumes created:"
        if [[ -n "$VOLUME_NAME" ]]; then
            echo "  $VOLUME_NAME-omero"
            echo "  $VOLUME_NAME-biomero"
        else
            omero_dump=$(find_latest_dump "$BACKUP_DIRECTORY" "omero")
            biomero_dump=$(find_latest_dump "$BACKUP_DIRECTORY" "biomero")
            echo "  $(get_descriptive_volume_name "$omero_dump" "omero" "$POSTGRES_VERSION")"
            echo "  $(get_descriptive_volume_name "$biomero_dump" "biomero" "$POSTGRES_VERSION")"
        fi
    else
        echo "Error: *** One or more restores FAILED! ***" >&2
        echo "OMERO success: $omero_success"
        echo "BIOMERO success: $biomero_success"
        exit 1
    fi
else
    # Single database restore
    echo "Restoring single database ($DB_TYPE) to Postgres $POSTGRES_VERSION"
    echo ""
    
    if restore_single "$DB_TYPE" "$DUMP_PATH" "$VOLUME_NAME" "$LOCAL_FOLDER" "$DB_NAME" "$USER" "$PASSWORD" "$POSTGRES_VERSION"; then
        echo ""
        echo "*** Restore completed successfully! ***"
        
        if [[ -n "$LOCAL_FOLDER" ]]; then
            # Local folder mode
            descriptive_name=""
            if [[ -n "$DUMP_PATH" ]]; then
                descriptive_name=$(get_descriptive_volume_name "$DUMP_PATH" "$DB_TYPE" "$POSTGRES_VERSION")
            else
                descriptive_name="database-$DB_TYPE-restored"
            fi
            echo "Local folder created: $LOCAL_FOLDER/$descriptive_name"
        else
            # Volume mode
            if [[ -n "$VOLUME_NAME" ]]; then
                echo "Volume created: $VOLUME_NAME"
            else
                echo "Volume created: database-$DB_TYPE-restored"
            fi
        fi
    else
        exit 1
    fi
fi