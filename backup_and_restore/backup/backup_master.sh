#!/bin/bash

# Default values
ENV_FILE="./.env"
OUTPUT_DIRECTORY=""
SERVER_CONTAINER_NAME=""
OMERO_DB_CONTAINER_NAME=""
BIOMERO_DB_CONTAINER_NAME=""
METABASE_FOLDER=""
CONFIG_ONLY=false
DATA_ONLY=false
PARALLEL=false
SKIP_DATABASE=false
SKIP_SERVER=false
SKIP_METABASE=false
SKIP_SERVER_DATA=false
SKIP_SERVER_CONFIG=false
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
        --server-container-name)
            SERVER_CONTAINER_NAME="$2"
            shift 2
            ;;
        --omero-db-container-name)
            OMERO_DB_CONTAINER_NAME="$2"
            shift 2
            ;;
        --biomero-db-container-name)
            BIOMERO_DB_CONTAINER_NAME="$2"
            shift 2
            ;;
        --omero-folder)
            OMERO_FOLDER="$2"
            shift 2
            ;;
        --metabase-folder)
            METABASE_FOLDER="$2"
            shift 2
            ;;
        --skip-server-data)
            SKIP_SERVER_DATA=true
            shift
            ;;
        --skip-server-config)
            SKIP_SERVER_CONFIG=true
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
  Always backs up both OMERO and BIOMERO databases.

OPTIONS:
  --env-file <path>                Path to .env file (default: ./.env)
  --output-directory <dir>         Output directory (default: ./backup_and_restore/backups)
  --server-container-name <name>   Override OMERO server container name (default: nl-biomero-omeroserver-1)
  --omero-db-container-name <name> Override OMERO database container name (default: nl-biomero_database_1)
  --biomero-db-container-name <n>  Override BIOMERO database container name (default: nl-biomero_database-biomero_1)
  --metabase-folder <path>         Override metabase folder path (default: ./metabase)
  --omero-folder <path>            Backup from local OMERO folder instead of container
  --skip-server-data               Skip OMERO server data backup (only config)
  --skip-server-config             Skip OMERO server config backup (only data)
  --skip-database                  Skip database backup
  --skip-server                    Skip server backup
  --skip-metabase                  Skip Metabase backup
  --help, -h                       Show this help message

EXAMPLES:
  # Full synchronized backup (default)
  ./backup_and_restore/backup_master.sh

  # Only server config (skip server data)
  ./backup_and_restore/backup_master.sh --skip-server-data

  # Only server data (skip server config)
  ./backup_and_restore/backup_master.sh --skip-server-config

  # Database and Metabase only (skip server backup)
  ./backup_and_restore/backup_master.sh --skip-server

  # Custom database container names
  ./backup_and_restore/backup_master.sh --omero-db-container-name "custom-omero-db" --biomero-db-container-name "custom-biomero-db"

BACKUP CONSISTENCY:
  This script generates a single timestamp and passes it to all backup operations,
  ensuring that all backups represent the same point in time.

OUTPUT FILES:
  Database: omero.{timestamp}.pg_dump, biomero.{timestamp}.pg_dump
  Server:   omero-server.{timestamp}.tar.gz (unless --skip-server-data)
  Metabase: metabase.{timestamp}.tar.gz
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

if [ "$SKIP_SERVER" = true ] && ([ "$SKIP_SERVER_DATA" = true ] || [ "$SKIP_SERVER_CONFIG" = true ]); then
    echo "Error: Cannot use --skip-server-data or --skip-server-config when skipping server backup."
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

# Set output directory to subfolder with timestamp
if [ -z "$OUTPUT_DIRECTORY" ]; then
    OUTPUT_DIRECTORY="./backup_and_restore/backups"
fi
OUTPUT_DIRECTORY="$OUTPUT_DIRECTORY/$TIMESTAMP"

# Create output directory
mkdir -p "$OUTPUT_DIRECTORY"
ABSOLUTE_OUTPUT_DIR=$(realpath "$OUTPUT_DIRECTORY")

echo "[MASTER] NL-BIOMERO MASTER BACKUP"
echo "=================================="
echo "  Timestamp: $TIMESTAMP"
echo "  Output Directory: $ABSOLUTE_OUTPUT_DIR"
echo "  Environment File: $ENV_FILE"
echo ""
if [ "$SKIP_DATABASE" = true ]; then
    echo "  [SKIP] Database backup: SKIPPED"
else
    echo "  [DB] Database backup: ENABLED (both OMERO and BIOMERO)"
fi
if [ "$SKIP_SERVER" = true ]; then
    echo "  [SKIP] Server backup: SKIPPED"
else
    SERVER_MODE="full backup"
    if [ "$SKIP_SERVER_DATA" = true ]; then
        SERVER_MODE="config only"
    elif [ "$SKIP_SERVER_CONFIG" = true ]; then
        SERVER_MODE="data only"
    fi
    echo "  [SERVER] Server backup: ENABLED ($SERVER_MODE)"
fi
if [ "$SKIP_METABASE" = true ]; then
    echo "  [SKIP] Metabase backup: SKIPPED"
else
    echo "  [METABASE] Metabase backup: ENABLED"
fi
echo ""

# Build command arguments - Use proper arrays for parameter passing
OMERO_DB_ARGS=()
BIOMERO_DB_ARGS=()
SERVER_ARGS=()
METABASE_ARGS=()

# Common arguments for databases
OMERO_DB_ARGS+=("--envFile" "$ENV_FILE")
OMERO_DB_ARGS+=("--outputDirectory" "$OUTPUT_DIRECTORY")
OMERO_DB_ARGS+=("--timestamp" "$TIMESTAMP")
OMERO_DB_ARGS+=("--dbType" "omero")

BIOMERO_DB_ARGS+=("--envFile" "$ENV_FILE")
BIOMERO_DB_ARGS+=("--outputDirectory" "$OUTPUT_DIRECTORY")
BIOMERO_DB_ARGS+=("--timestamp" "$TIMESTAMP")
BIOMERO_DB_ARGS+=("--dbType" "biomero")

# Database-specific container names
if [[ -n "$OMERO_DB_CONTAINER_NAME" ]]; then
    OMERO_DB_ARGS+=("--containerName" "$OMERO_DB_CONTAINER_NAME")
fi
if [[ -n "$BIOMERO_DB_CONTAINER_NAME" ]]; then
    BIOMERO_DB_ARGS+=("--containerName" "$BIOMERO_DB_CONTAINER_NAME")
fi

# Server arguments
SERVER_ARGS+=("--envFile" "$ENV_FILE")
SERVER_ARGS+=("--outputDirectory" "$OUTPUT_DIRECTORY")
SERVER_ARGS+=("--timestamp" "$TIMESTAMP")
if [[ -n "$SERVER_CONTAINER_NAME" ]]; then
    SERVER_ARGS+=("--containerName" "$SERVER_CONTAINER_NAME")
fi
if [[ -n "$OMERO_FOLDER" ]]; then
    SERVER_ARGS+=("--omero-folder" "$OMERO_FOLDER")
fi
if [[ "$SKIP_SERVER_DATA" == "true" ]]; then
    SERVER_ARGS+=("--skipData")
fi
if [[ "$SKIP_SERVER_CONFIG" == "true" ]]; then
    SERVER_ARGS+=("--skipConfig")
fi

# Metabase arguments (use correct parameter names)
METABASE_ARGS+=("--env-file" "$ENV_FILE")
METABASE_ARGS+=("--output-directory" "$OUTPUT_DIRECTORY")
METABASE_ARGS+=("--timestamp" "$TIMESTAMP")
if [[ -n "$METABASE_FOLDER" ]]; then
    METABASE_ARGS+=("--metabase-folder" "$METABASE_FOLDER")
fi

# Job tracking variables
OMERO_DB_PID=""
BIOMERO_DB_PID=""
SERVER_PID=""
METABASE_PID=""
OMERO_DB_SUCCESS=true
BIOMERO_DB_SUCCESS=true
SERVER_SUCCESS=true
METABASE_SUCCESS=true
OMERO_DB_OUTPUT_FILE=""
BIOMERO_DB_OUTPUT_FILE=""
SERVER_OUTPUT_FILE=""
METABASE_OUTPUT_FILE=""

# Create temp files for capturing output
if [ "$SKIP_DATABASE" != true ]; then
    OMERO_DB_OUTPUT_FILE=$(mktemp)
    BIOMERO_DB_OUTPUT_FILE=$(mktemp)
fi
if [ "$SKIP_SERVER" != true ]; then
    SERVER_OUTPUT_FILE=$(mktemp)
fi
if [ "$SKIP_METABASE" != true ]; then
    METABASE_OUTPUT_FILE=$(mktemp)
fi

# Function to cleanup temp files
cleanup() {
    if [ -n "$OMERO_DB_OUTPUT_FILE" ] && [ -f "$OMERO_DB_OUTPUT_FILE" ]; then
        rm -f "$OMERO_DB_OUTPUT_FILE"
    fi
    if [ -n "$BIOMERO_DB_OUTPUT_FILE" ] && [ -f "$BIOMERO_DB_OUTPUT_FILE" ]; then
        rm -f "$BIOMERO_DB_OUTPUT_FILE"
    fi
    if [ -n "$SERVER_OUTPUT_FILE" ] && [ -f "$SERVER_OUTPUT_FILE" ]; then
        rm -f "$SERVER_OUTPUT_FILE"
    fi
    if [ -n "$METABASE_OUTPUT_FILE" ] && [ -f "$METABASE_OUTPUT_FILE" ]; then
        rm -f "$METABASE_OUTPUT_FILE"
    fi
}
trap cleanup EXIT

# Sequential execution only
echo "Starting backup process..."
echo ""

# Step 1: Database backups
if [[ "$SKIP_DATABASE" != "true" ]]; then
    echo "[DB] STEP 1a: OMERO Database Backup"
    echo "-----------------------------------"
    if "$DB_SCRIPT" "${OMERO_DB_ARGS[@]}"; then
        OMERO_DB_SUCCESS=true
        echo "[OK] OMERO database backup completed successfully"
    else
        OMERO_DB_EXIT_CODE=$?
        OMERO_DB_SUCCESS=false
        echo "[FAIL] OMERO database backup failed (exit code: $OMERO_DB_EXIT_CODE)"
    fi
    echo ""

    echo "[DB] STEP 1b: BIOMERO Database Backup"
    echo "-------------------------------------"
    if "$DB_SCRIPT" "${BIOMERO_DB_ARGS[@]}"; then
        BIOMERO_DB_SUCCESS=true
        echo "[OK] BIOMERO database backup completed successfully"
    else
        BIOMERO_DB_EXIT_CODE=$?
        BIOMERO_DB_SUCCESS=false
        echo "[FAIL] BIOMERO database backup failed (exit code: $BIOMERO_DB_EXIT_CODE)"
    fi
    echo ""
fi

# Step 2: Metabase backup (only if databases succeeded or were skipped)
if [[ "$SKIP_METABASE" != "true" ]] && ([[ "$OMERO_DB_SUCCESS" == "true" && "$BIOMERO_DB_SUCCESS" == "true" ]] || [[ "$SKIP_DATABASE" == "true" ]]); then
    echo "[METABASE] STEP 2: Metabase Backup"
    echo "---------------------------------"
    if "$METABASE_SCRIPT" "${METABASE_ARGS[@]}"; then
        METABASE_SUCCESS=true
        echo "[OK] Metabase backup completed successfully"
    else
        METABASE_EXIT_CODE=$?
        METABASE_SUCCESS=false
        echo "[FAIL] Metabase backup failed (exit code: $METABASE_EXIT_CODE)"
    fi
    echo ""
fi

# Step 3: Server backup (only if previous steps succeeded or were skipped)
if [[ "$SKIP_SERVER" != "true" ]] && ([[ "$OMERO_DB_SUCCESS" == "true" && "$BIOMERO_DB_SUCCESS" == "true" ]] || [[ "$SKIP_DATABASE" == "true" ]]) && ([[ "$METABASE_SUCCESS" == "true" ]] || [[ "$SKIP_METABASE" == "true" ]]); then
    echo "[SERVER] STEP 3: Server Backup"
    echo "-------------------------------"
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

# Final summary
echo "BACKUP SUMMARY"
echo "=============="
echo "  Timestamp: $TIMESTAMP"
echo "  Execution: Sequential"

if [[ "$SKIP_DATABASE" != "true" ]]; then
    if [[ "$OMERO_DB_SUCCESS" == "true" ]]; then
        echo "  [DB] OMERO Database: [OK] SUCCESS"
        echo "    * omero.$TIMESTAMP.pg_dump"
    elif [[ "$OMERO_DB_SUCCESS" == "false" ]]; then
        echo "  [DB] OMERO Database: [FAIL] FAILED"
    else
        echo "  [DB] OMERO Database: [SKIP] NOT ATTEMPTED"
    fi
    
    if [[ "$BIOMERO_DB_SUCCESS" == "true" ]]; then
        echo "  [DB] BIOMERO Database: [OK] SUCCESS"
        echo "    * biomero.$TIMESTAMP.pg_dump"
    elif [[ "$BIOMERO_DB_SUCCESS" == "false" ]]; then
        echo "  [DB] BIOMERO Database: [FAIL] FAILED"
    else
        echo "  [DB] BIOMERO Database: [SKIP] NOT ATTEMPTED"
    fi
fi

if [[ "$SKIP_SERVER" != "true" ]]; then
    if [[ "$SERVER_SUCCESS" == "true" ]]; then
        if [ -f "$ABSOLUTE_OUTPUT_DIR/omero-server.$TIMESTAMP.tar.gz" ]; then
            echo "  [SERVER] Server: [OK] SUCCESS"
            echo "    * omero-server.$TIMESTAMP.tar.gz"
        elif [[ "$SKIP_SERVER_DATA" == "true" ]]; then
            echo "  [SERVER] Server: [OK] SUCCESS"
            echo "    * (config only, no tar.gz created)"
        else
            echo "  [SERVER] Server: [OK] SUCCESS"
        fi
    elif [[ "$SERVER_SUCCESS" == "false" ]]; then
        echo "  [SERVER] Server: [FAIL] FAILED"
    else
        echo "  [SERVER] Server: [SKIP] NOT ATTEMPTED"
    fi
fi

if [[ "$SKIP_METABASE" != "true" ]]; then
    if [[ "$METABASE_SUCCESS" == "true" ]]; then
        echo "  [METABASE] Metabase: [OK] SUCCESS"
        echo "    * metabase.$TIMESTAMP.tar.gz"
    elif [[ "$METABASE_SUCCESS" == "false" ]]; then
        echo "  [METABASE] Metabase: [FAIL] FAILED"
    else
        echo "  [METABASE] Metabase: [SKIP] NOT ATTEMPTED"
    fi
fi

echo ""

# In the summary, only show files that actually exist
echo "Backup Location: $ABSOLUTE_OUTPUT_DIR"
echo ""
echo "Files Created:"
BACKUP_FILES=$(find "$ABSOLUTE_OUTPUT_DIR" -type f -name "*$TIMESTAMP*" 2>/dev/null)
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

# Determine overall success with proper null checking
OVERALL_SUCCESS=true

# Check database success
if [[ "$SKIP_DATABASE" != "true" ]]; then
    if [[ "$OMERO_DB_SUCCESS" != "true" ]]; then
        OVERALL_SUCCESS=false
        if [[ "$OMERO_DB_SUCCESS" == "false" ]]; then
            echo "  [REASON] OMERO database backup failed"
        else
            echo "  [REASON] OMERO database backup was not attempted"
        fi
    fi
    
    if [[ "$BIOMERO_DB_SUCCESS" != "true" ]]; then
        OVERALL_SUCCESS=false
        if [[ "$BIOMERO_DB_SUCCESS" == "false" ]]; then
            echo "  [REASON] BIOMERO database backup failed"
        else
            echo "  [REASON] BIOMERO database backup was not attempted"
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

# Check Metabase success
if [[ "$SKIP_METABASE" != "true" ]]; then
    if [[ "$METABASE_SUCCESS" != "true" ]]; then
        OVERALL_SUCCESS=false
        if [[ "$METABASE_SUCCESS" == "false" ]]; then
            echo "  [REASON] Metabase backup failed"
        else
            echo "  [REASON] Metabase backup was not attempted"
        fi
    fi
fi

# Check if files were actually created
if [[ -z "$BACKUP_FILES" ]] && ([[ "$SKIP_DATABASE" != "true" ]] || [[ "$SKIP_SERVER" != "true" ]] || [[ "$SKIP_METABASE" != "true" ]]); then
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
        echo ""
    fi
    
    # Step 2: Metabase backup (only if databases succeeded or were skipped)
    if [[ "$SKIP_METABASE" != "true" ]] && ([[ "$OMERO_DB_SUCCESS" == "true" && "$BIOMERO_DB_SUCCESS" == "true" ]] || [[ "$SKIP_DATABASE" == "true" ]]); then
        echo "[METABASE] STEP 2: Metabase Backup"
        echo "---------------------------------"
        
        # Execute Metabase backup
        if "$METABASE_SCRIPT" "${METABASE_ARGS[@]}"; then
            METABASE_SUCCESS=true
            echo "[OK] Metabase backup completed successfully"
        else
            METABASE_EXIT_CODE=$?
            METABASE_SUCCESS=false
            echo "[FAIL] Metabase backup failed (exit code: $METABASE_EXIT_CODE)"
        fi
        echo ""
    fi
    
    # Step 3: Server backup (only if previous steps succeeded or were skipped)
    if [[ "$SKIP_SERVER" != "true" ]] && ([[ "$OMERO_DB_SUCCESS" == "true" && "$BIOMERO_DB_SUCCESS" == "true" ]] || [[ "$SKIP_DATABASE" == "true" ]]) && ([[ "$METABASE_SUCCESS" == "true" ]] || [[ "$SKIP_METABASE" == "true" ]]); then
        echo "[SERVER] STEP 3: Server Backup"
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
    if [[ "$OMERO_DB_SUCCESS" == "true" ]]; then
        echo "  [DB] OMERO Database: [OK] SUCCESS"
        echo "    * omero.$TIMESTAMP.pg_dump"
    elif [[ "$OMERO_DB_SUCCESS" == "false" ]]; then
        echo "  [DB] OMERO Database: [FAIL] FAILED"
    else
        echo "  [DB] OMERO Database: [SKIP] NOT ATTEMPTED"
    fi
    
    if [[ "$BIOMERO_DB_SUCCESS" == "true" ]]; then
        echo "  [DB] BIOMERO Database: [OK] SUCCESS"
        echo "    * biomero.$TIMESTAMP.pg_dump"
    elif [[ "$BIOMERO_DB_SUCCESS" == "false" ]]; then
        echo "  [DB] BIOMERO Database: [FAIL] FAILED"
    else
        echo "  [DB] BIOMERO Database: [SKIP] NOT ATTEMPTED"
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

if [[ "$SKIP_METABASE" != "true" ]]; then
    if [[ "$METABASE_SUCCESS" == "true" ]]; then
        echo "  [METABASE] Metabase: [OK] SUCCESS"
        echo "    * metabase.$TIMESTAMP.tar.gz"
    elif [[ "$METABASE_SUCCESS" == "false" ]]; then
        echo "  [METABASE] Metabase: [FAIL] FAILED"
    else
        echo "  [METABASE] Metabase: [SKIP] NOT ATTEMPTED"
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
    if [[ "$OMERO_DB_SUCCESS" != "true" ]]; then
        OVERALL_SUCCESS=false
        if [[ "$OMERO_DB_SUCCESS" == "false" ]]; then
            echo "  [REASON] OMERO database backup failed"
        else
            echo "  [REASON] OMERO database backup was not attempted"
        fi
    fi
    
    if [[ "$BIOMERO_DB_SUCCESS" != "true" ]]; then
        OVERALL_SUCCESS=false
        if [[ "$BIOMERO_DB_SUCCESS" == "false" ]]; then
            echo "  [REASON] BIOMERO database backup failed"
        else
            echo "  [REASON] BIOMERO database backup was not attempted"
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

# Check Metabase success
if [[ "$SKIP_METABASE" != "true" ]]; then
    if [[ "$METABASE_SUCCESS" != "true" ]]; then
        OVERALL_SUCCESS=false
        if [[ "$METABASE_SUCCESS" == "false" ]]; then
            echo "  [REASON] Metabase backup failed"
        else
            echo "  [REASON] Metabase backup was not attempted"
        fi
    fi
fi

# Check if files were actually created
if [[ -z "$BACKUP_FILES" ]] && ([[ "$SKIP_DATABASE" != "true" ]] || [[ "$SKIP_SERVER" != "true" ]] || [[ "$SKIP_METABASE" != "true" ]]); then
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
