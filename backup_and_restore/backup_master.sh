#!/bin/bash

# Default values
ENV_FILE="./.env"
OUTPUT_DIRECTORY=""
DB_TYPE="both"
SERVER_CONTAINER_NAME=""
VOLUME_NAME=""
METABASE_FOLDER=""
CONFIG_ONLY=false
DATA_ONLY=false
PARALLEL=false
SKIP_DATABASE=false
SKIP_SERVER=false
SKIP_METABASE=false
HELP=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --env-file)
            ENV_FILE="$2"
            shift 2
            ;;
        --output-directory)
            OUTPUT_DIRECTORY="$2"
            shift 2
            ;;
        --db-type)
            DB_TYPE="$2"
            shift 2
            ;;
        --server-container-name)
            SERVER_CONTAINER_NAME="$2"
            shift 2
            ;;
        --volume-name)
            VOLUME_NAME="$2"
            shift 2
            ;;
        --metabase-folder)
            METABASE_FOLDER="$2"
            shift 2
            ;;
        --config-only)
            CONFIG_ONLY=true
            shift
            ;;
        --data-only)
            DATA_ONLY=true
            shift
            ;;
        --parallel)
            PARALLEL=true
            shift
            ;;
        --skip-database)
            SKIP_DATABASE=true
            shift
            ;;
        --skip-server)
            SKIP_SERVER=true
            shift
            ;;
        --skip-metabase)
            SKIP_METABASE=true
            shift
            ;;
        --help|-h)
            HELP=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Show help if requested
if [ "$HELP" = true ]; then
    cat << 'EOF'
OMERO MASTER BACKUP SCRIPT - Bash

USAGE:
  ./backup_and_restore/backup_master.sh [OPTIONS]

DESCRIPTION:
  Master backup script that coordinates database, server, and Metabase backups with a synchronized timestamp.
  This ensures data consistency by backing up all components at the same point in time.

OPTIONS:
  --env-file <path>           Path to .env file (default: ./.env)
  --output-directory <dir>    Output directory (default: ./backup_and_restore/backups)
  --db-type <type>            Database to backup: omero|biomero|both (default: both)
  --server-container-name <n> Override OMERO server container name (default: nl-biomero-omeroserver-1)
  --volume-name <n>           Override OMERO volume name (default: nl-biomero_omero)
  --metabase-folder <path>    Override metabase folder path (default: ./metabase)
  --config-only               Export config to /OMERO/backup/omero.config only (server backup)
  --data-only                 Backup only data store, skip config export (server backup)
  --parallel                  Run backups in parallel instead of sequentially
  --skip-database             Skip database backup
  --skip-server               Skip server backup
  --skip-metabase             Skip Metabase backup
  --help, -h                  Show this help message

EXAMPLES:
  # Full synchronized backup (default - sequential execution)
  ./backup_and_restore/backup_master.sh

  # Parallel backup for faster execution
  ./backup_and_restore/backup_master.sh --parallel

  # Only OMERO database + server (skip BIOMERO database and Metabase)
  ./backup_and_restore/backup_master.sh --db-type omero --skip-metabase

  # Only export fresh server config, backup both databases and Metabase
  ./backup_and_restore/backup_master.sh --config-only

  # Database and Metabase only (useful for regular automated backups)
  ./backup_and_restore/backup_master.sh --skip-server

  # Server only with custom settings
  ./backup_and_restore/backup_master.sh --skip-database --skip-metabase --server-container-name "custom-omero"

  # Skip Metabase backup (if not using dashboards/custom config)
  ./backup_and_restore/backup_master.sh --skip-metabase

BACKUP CONSISTENCY:
  This script generates a single timestamp and passes it to both backup operations,
  ensuring that the database and server backups represent the same point in time.

SEQUENTIAL VS PARALLEL:
  - Sequential (default): Database first, then server (safer, less resource intensive)
  - Parallel: Both backups run simultaneously for speed (use if you have sufficient resources)

OUTPUT FILES:
  Database: {database}.{timestamp}.pg_dump
  Server:   omero-server.{timestamp}.tar.gz
  All files use the same timestamp for consistency

For more information, see: backup_and_restore/README.md
EOF
    exit 0
fi

# Validate conflicting parameters
if [ "$SKIP_DATABASE" = true ] && [ "$SKIP_SERVER" = true ] && [ "$SKIP_METABASE" = true ]; then
    echo "Error: Cannot skip all backup components. Use individual backup scripts instead."
    exit 1
fi

if [ "$SKIP_SERVER" = true ] && ([ "$CONFIG_ONLY" = true ] || [ "$DATA_ONLY" = true ]); then
    echo "Error: Cannot use --config-only or --data-only when skipping server backup."
    exit 1
fi

# Validate script availability
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DB_SCRIPT="$SCRIPT_DIR/backup_db.sh"
SERVER_SCRIPT="$SCRIPT_DIR/backup_server.sh"
METABASE_SCRIPT="$SCRIPT_DIR/backup_metabase.sh"

if [ "$SKIP_DATABASE" != true ] && [ ! -f "$DB_SCRIPT" ]; then
    echo "Error: Database backup script not found: $DB_SCRIPT"
    exit 1
fi

if [ "$SKIP_SERVER" != true ] && [ ! -f "$SERVER_SCRIPT" ]; then
    echo "Error: Server backup script not found: $SERVER_SCRIPT"
    exit 1
fi

if [ "$SKIP_METABASE" != true ] && [ ! -f "$METABASE_SCRIPT" ]; then
    echo "Error: Metabase backup script not found: $METABASE_SCRIPT"
    exit 1
fi

# Generate single shared timestamp
TIMESTAMP=$(date -u +"%Y-%m-%d_%H-%M-%S-UTC")

# Set default output directory
if [ -z "$OUTPUT_DIRECTORY" ]; then
    OUTPUT_DIRECTORY="./backup_and_restore/backups"
fi

# Create output directory
mkdir -p "$OUTPUT_DIRECTORY"
ABSOLUTE_OUTPUT_DIR=$(realpath "$OUTPUT_DIRECTORY")

echo "[MASTER] NL-BIOMERO MASTER BACKUP"
echo "=================================="
echo "  Timestamp: $TIMESTAMP"
echo "  Output Directory: $ABSOLUTE_OUTPUT_DIR"
echo "  Environment File: $ENV_FILE"
echo "  Database Type: $DB_TYPE"
echo "  Execution Mode: $(if [ "$PARALLEL" = true ]; then echo 'Parallel'; else echo 'Sequential'; fi)"
echo ""

if [ "$SKIP_DATABASE" = true ]; then
    echo "  [SKIP] Database backup: SKIPPED"
else
    echo "  [DB] Database backup: ENABLED ($DB_TYPE)"
fi

if [ "$SKIP_SERVER" = true ]; then
    echo "  [SKIP] Server backup: SKIPPED"
else
    SERVER_MODE="full backup"
    if [ "$CONFIG_ONLY" = true ]; then
        SERVER_MODE="config only"
    elif [ "$DATA_ONLY" = true ]; then
        SERVER_MODE="data only"
    fi
    echo "  [SERVER] Server backup: ENABLED ($SERVER_MODE)"
fi
echo ""

# Build command arguments - Use proper arrays for parameter passing
DB_ARGS=()
SERVER_ARGS=()

# Common arguments
DB_ARGS+=("--envFile" "$ENV_FILE")
DB_ARGS+=("--outputDirectory" "$OUTPUT_DIRECTORY")
DB_ARGS+=("--timestamp" "$TIMESTAMP")
SERVER_ARGS+=("--envFile" "$ENV_FILE")
SERVER_ARGS+=("--outputDirectory" "$OUTPUT_DIRECTORY")
SERVER_ARGS+=("--timestamp" "$TIMESTAMP")

# Database-specific arguments
if [[ "$DB_TYPE" != "both" ]]; then
    DB_ARGS+=("--dbType" "$DB_TYPE")
else
    # Explicitly pass "both" to avoid parameter confusion
    DB_ARGS+=("--dbType" "both")
fi

# Server-specific arguments
if [[ -n "$SERVER_CONTAINER_NAME" ]]; then
    SERVER_ARGS+=("--containerName" "$SERVER_CONTAINER_NAME")
fi
if [[ -n "$VOLUME_NAME" ]]; then
    SERVER_ARGS+=("--volumeName" "$VOLUME_NAME")
fi
if [[ "$CONFIG_ONLY" == "true" ]]; then
    SERVER_ARGS+=("--configOnly")
fi
if [[ "$DATA_ONLY" == "true" ]]; then
    SERVER_ARGS+=("--dataOnly")
fi

# Job tracking variables
DB_PID=""
SERVER_PID=""
DB_SUCCESS=true
SERVER_SUCCESS=true
DB_OUTPUT_FILE=""
SERVER_OUTPUT_FILE=""

# Create temp files for capturing output
if [ "$SKIP_DATABASE" != true ]; then
    DB_OUTPUT_FILE=$(mktemp)
fi
if [ "$SKIP_SERVER" != true ]; then
    SERVER_OUTPUT_FILE=$(mktemp)
fi

# Function to cleanup temp files
cleanup() {
    if [ -n "$DB_OUTPUT_FILE" ] && [ -f "$DB_OUTPUT_FILE" ]; then
        rm -f "$DB_OUTPUT_FILE"
    fi
    if [ -n "$SERVER_OUTPUT_FILE" ] && [ -f "$SERVER_OUTPUT_FILE" ]; then
        rm -f "$SERVER_OUTPUT_FILE"
    fi
}
trap cleanup EXIT

if [[ "$PARALLEL" == "true" ]]; then
    # PARALLEL EXECUTION
    echo "Starting parallel backup process..."
    echo ""
    
    # Start background jobs
    if [ "$SKIP_DATABASE" != true ]; then
        echo "[DB] Starting database backup job..."
        "$DB_SCRIPT" "${DB_ARGS[@]}" > "$DB_OUTPUT_FILE" 2>&1 &
        DB_PID=$!
    fi
    
    if [ "$SKIP_SERVER" != true ]; then
        echo "[SERVER] Starting server backup job..."
        "$SERVER_SCRIPT" "${SERVER_ARGS[@]}" > "$SERVER_OUTPUT_FILE" 2>&1 &
        SERVER_PID=$!
    fi
    
    echo ""
    echo "Waiting for backup jobs to complete..."
    
    # Monitor job progress
    RUNNING_JOBS=0
    if [ -n "$DB_PID" ]; then
        ((RUNNING_JOBS++))
    fi
    if [ -n "$SERVER_PID" ]; then
        ((RUNNING_JOBS++))
    fi
    
    while [ $RUNNING_JOBS -gt 0 ]; do
        sleep 2
        RUNNING_JOBS=0
        
        if [ -n "$DB_PID" ] && kill -0 "$DB_PID" 2>/dev/null; then
            ((RUNNING_JOBS++))
        fi
        if [ -n "$SERVER_PID" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
            ((RUNNING_JOBS++))
        fi
        
        if [ $RUNNING_JOBS -gt 0 ]; then
            echo "   $(date +%H:%M:%S) - $RUNNING_JOBS job(s) still running..."
        fi
    done
    
    echo ""
    
    # Collect results
    if [[ -n "$DB_PID" ]]; then
        echo "[DB] DATABASE BACKUP RESULTS:"
        echo "-----------------------------"
        
        # Wait for job to complete and check exit status
        wait "$DB_PID"
        DB_EXIT_CODE=$?
        
        # Show output
        cat "$DB_OUTPUT_FILE"
        
        # Check for success/failure more rigorously
        DB_OUTPUT_CONTENT=$(cat "$DB_OUTPUT_FILE")
        if [[ $DB_EXIT_CODE -eq 0 ]] && [[ "$DB_OUTPUT_CONTENT" =~ \[SUCCESS\].*completed\ successfully ]]; then
            echo "[OK] Database backup completed successfully"
            DB_SUCCESS=true
        else
            echo "[FAIL] Database backup failed"
            DB_SUCCESS=false
        fi
        echo ""
    fi
    
    if [[ -n "$SERVER_PID" ]]; then
        echo "[SERVER] SERVER BACKUP RESULTS:"
        echo "-------------------------------"
        
        # Wait for job to complete and check exit status
        wait "$SERVER_PID"
        SERVER_EXIT_CODE=$?
        
        # Show output
        cat "$SERVER_OUTPUT_FILE"
        
        # Check for success/failure more rigorously
        SERVER_OUTPUT_CONTENT=$(cat "$SERVER_OUTPUT_FILE")
        if [[ $SERVER_EXIT_CODE -eq 0 ]] && [[ "$SERVER_OUTPUT_CONTENT" =~ \[SUCCESS\].*completed\ successfully ]]; then
            echo "[OK] Server backup completed successfully"
            SERVER_SUCCESS=true
        else
            echo "[FAIL] Server backup failed"
            SERVER_SUCCESS=false
        fi
        echo ""
    fi
else
    # SEQUENTIAL EXECUTION (DEFAULT)
    echo "Starting sequential backup process..."
    echo ""
    
    # Step 1: Database backup
    if [[ "$SKIP_DATABASE" != "true" ]]; then
        echo "[DB] STEP 1: Database Backup"
        echo "-----------------------------"
        
        # Execute database backup
        if "$DB_SCRIPT" "${DB_ARGS[@]}"; then
            DB_SUCCESS=true
            echo "[OK] Database backup completed successfully"
        else
            DB_EXIT_CODE=$?
            DB_SUCCESS=false
            echo "[FAIL] Database backup failed (exit code: $DB_EXIT_CODE)"
        fi
        echo ""
    fi
    
    # Step 2: Server backup (only if database succeeded or was skipped)
    if [[ "$SKIP_SERVER" != "true" ]] && ([[ "$DB_SUCCESS" == "true" ]] || [[ "$SKIP_DATABASE" == "true" ]]); then
        echo "[SERVER] STEP 2: Server Backup"
        echo "-------------------------------"
        
        # Execute server backup
        if "$SERVER_SCRIPT" "${SERVER_ARGS[@]}"; then
            SERVER_SUCCESS=true
            echo "[OK] Server backup completed successfully"
        else
            SERVER_EXIT_CODE=$?
            SERVER_SUCCESS=false
            echo "[FAIL] Server backup failed (exit code: $SERVER_EXIT_CODE)"
        fi
        echo ""
    fi
fi

# Final summary
echo "BACKUP SUMMARY"
echo "=============="
echo "  Timestamp: $TIMESTAMP"
echo "  Execution: $(if [ "$PARALLEL" = true ]; then echo 'Parallel'; else echo 'Sequential'; fi)"

if [[ "$SKIP_DATABASE" != "true" ]]; then
    if [[ "$DB_SUCCESS" == "true" ]]; then
        echo "  [DB] Database: [OK] SUCCESS"
        
        # Show expected database files
        if [[ "$DB_TYPE" == "both" ]] || [[ "$DB_TYPE" == "omero" ]]; then
            echo "    * omero.$TIMESTAMP.pg_dump"
        fi
        if [[ "$DB_TYPE" == "both" ]] || [[ "$DB_TYPE" == "biomero" ]]; then
            echo "    * biomero.$TIMESTAMP.pg_dump"
        fi
    elif [[ "$DB_SUCCESS" == "false" ]]; then
        echo "  [DB] Database: [FAIL] FAILED"
    else
        echo "  [DB] Database: [SKIP] NOT ATTEMPTED"
    fi
fi

if [[ "$SKIP_SERVER" != "true" ]]; then
    if [[ "$SERVER_SUCCESS" == "true" ]]; then
        echo "  [SERVER] Server: [OK] SUCCESS"
        echo "    * omero-server.$TIMESTAMP.tar.gz"
    elif [[ "$SERVER_SUCCESS" == "false" ]]; then
        echo "  [SERVER] Server: [FAIL] FAILED"
    else
        echo "  [SERVER] Server: [SKIP] NOT ATTEMPTED"
    fi
fi

echo ""
echo "Backup Location: $ABSOLUTE_OUTPUT_DIR"

# Check actual files created
echo ""
echo "Files Created:"
BACKUP_FILES=$(find "$ABSOLUTE_OUTPUT_DIR" -name "*$TIMESTAMP*" 2>/dev/null)
if [ -n "$BACKUP_FILES" ]; then
    echo "$BACKUP_FILES" | while read -r file; do
        if [ -f "$file" ]; then
            SIZE_MB=$(du -m "$file" | cut -f1)
            FILENAME=$(basename "$file")
            echo "  [OK] $FILENAME ($SIZE_MB MB)"
        fi
    done
else
    echo "  [WARN] No files found with timestamp $TIMESTAMP"
fi

echo ""

# Determine overall success with proper null checking
OVERALL_SUCCESS=true

# Check database success
if [[ "$SKIP_DATABASE" != "true" ]]; then
    if [[ "$DB_SUCCESS" != "true" ]]; then
        OVERALL_SUCCESS=false
        if [[ "$DB_SUCCESS" == "false" ]]; then
            echo "  [REASON] Database backup failed"
        else
            echo "  [REASON] Database backup was not attempted"
        fi
    fi
fi

# Check server success  
if [[ "$SKIP_SERVER" != "true" ]]; then
    if [[ "$SERVER_SUCCESS" != "true" ]]; then
        OVERALL_SUCCESS=false
        if [[ "$SERVER_SUCCESS" == "false" ]]; then
            echo "  [REASON] Server backup failed"
        else
            echo "  [REASON] Server backup was not attempted"
        fi
    fi
fi

# Check if files were actually created
if [[ -z "$BACKUP_FILES" ]] && ([[ "$SKIP_DATABASE" != "true" ]] || [[ "$SKIP_SERVER" != "true" ]]); then
    OVERALL_SUCCESS=false
    echo "  [REASON] No backup files were created"
fi

if [ "$OVERALL_SUCCESS" = true ]; then
    echo "[SUCCESS] All backup operations completed successfully!"
    echo ""
    
    exit 0
else
    echo "[FAIL] One or more backup operations failed!"
    echo ""
    echo "Troubleshooting:"
    echo "  * Check container status: docker ps"
    echo "  * Ensure NL-BIOMERO containers are running"
    echo "  * Review individual backup script logs above"
    echo "  * Verify disk space and permissions"
    echo "  * Run individual scripts separately for detailed debugging"
    
    exit 1
fi
fi
