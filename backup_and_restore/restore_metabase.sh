#!/bin/bash

# Default values
BACKUP_FILE=""
RESTORE_DIRECTORY=""
BACKUP_DIRECTORY="./backup_and_restore/backups"
FORCE=false
HELP=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --backup-file)
            BACKUP_FILE="$2"
            shift 2
            ;;
        --restore-directory)
            RESTORE_DIRECTORY="$2"
            shift 2
            ;;
        --backup-directory)
            BACKUP_DIRECTORY="$2"
            shift 2
            ;;
        --force)
            FORCE=true
            shift
            ;;
        --help)
            HELP=true
            shift
            ;;
        *)
            echo "[FAIL] Unknown parameter: $1"
            exit 1
            ;;
    esac
done

# Show help if requested
if [ "$HELP" = true ]; then
    cat << 'EOF'
METABASE RESTORE SCRIPT - Bash

USAGE:
  ./backup_and_restore/restore_metabase.sh [OPTIONS]

DESCRIPTION:
  Restores a Metabase backup from a tar.gz archive. This will restore all
  dashboards, data sources, user configurations, and custom settings.

PARAMETERS:
  --backup-file <path>        Path to metabase backup file (.tar.gz) (auto-detects latest if not specified)
  --restore-directory <dir>   Directory to restore to (default: current directory)
  --metabase-folder <name>    Target metabase folder name (default: metabase)
  --backup-directory <dir>    Directory to search for latest backup (default: ./backup_and_restore/backups)
  --force                     Overwrite existing metabase folder without confirmation
  --help                      Show this help message

EXAMPLES:
  # Auto-detect latest backup, extract to ./metabase
  ./backup_and_restore/restore_metabase.sh

  # Restore specific backup to ./metabase
  ./backup_and_restore/restore_metabase.sh --backup-file "./backups/metabase.2025-01-15_10-30-00-UTC.tar.gz"

  # Restore to specific directory (creates that directory)
  ./backup_and_restore/restore_metabase.sh --restore-directory "/my-restore"

  # Force overwrite existing files
  ./backup_and_restore/restore_metabase.sh --force

IMPORTANT NOTES:
  - Stop the Metabase container before restoring
  - The restored folder structure must match docker-compose.yml volume mounts
  - Make sure to backup current metabase folder before restoring
  - Restart Metabase container after successful restore

WARNING:
  This will overwrite the existing Metabase configuration and data!
  Ensure you have a backup of the current state before proceeding.

For more information, see: backup_and_restore/README.md
EOF
    exit 0
fi

# Auto-detect latest backup if not specified
if [ -z "$BACKUP_FILE" ]; then
    # Find latest metabase backup file
    LATEST_BACKUP=$(find "$BACKUP_DIRECTORY" -name "metabase.*.tar.gz" -type f 2>/dev/null | sort -r | head -n 1)
    
    if [ -n "$LATEST_BACKUP" ]; then
        BACKUP_FILE="$LATEST_BACKUP"
        echo "Auto-detected latest backup: $(basename "$BACKUP_FILE")"
    else
        echo "[FAIL] No Metabase backup files found in $BACKUP_DIRECTORY"
        echo "       Available files:"
        if [ -d "$BACKUP_DIRECTORY" ]; then
            ls -la "$BACKUP_DIRECTORY" 2>/dev/null | tail -n +2 | while read -r line; do
                echo "         $line"
            done
        else
            echo "         (directory doesn't exist)"
        fi
        echo ""
        echo "       Use: --backup-file <path-to-backup.tar.gz>"
        echo "       Run with --help for more information"
        exit 1
    fi
fi

# Validate required parameters (now that we have auto-detection)
if [ -z "$BACKUP_FILE" ]; then
    echo "[FAIL] Backup file parameter is required"
    echo "       Use: --backup-file <path-to-backup.tar.gz>"
    echo "       Run with --help for more information"
    exit 1
fi

# Set default values
EXTRACT_TO_DIRECTORY="${RESTORE_DIRECTORY:-.}"

# Create extract directory if it doesn't exist
if [ -n "$RESTORE_DIRECTORY" ] && [ ! -d "$EXTRACT_TO_DIRECTORY" ]; then
    mkdir -p "$EXTRACT_TO_DIRECTORY"
fi

# Validate backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "[FAIL] Backup file not found: $BACKUP_FILE"
    echo "       Please check the file path and try again"
    exit 1
fi

ABSOLUTE_BACKUP_FILE=$(realpath "$BACKUP_FILE")

# Show configuration
echo "METABASE RESTORE CONFIGURATION"
echo "=============================="
echo "  Backup File: $ABSOLUTE_BACKUP_FILE"
echo "  Extract To: $EXTRACT_TO_DIRECTORY"
echo "  Force Overwrite: $([ "$FORCE" = true ] && echo "YES" || echo "NO")"
echo ""

# Check if we'll overwrite existing metabase folder
TARGET_METABASE_PATH="$EXTRACT_TO_DIRECTORY/metabase"
if [ -d "$TARGET_METABASE_PATH" ]; then
    echo "[WARN] metabase folder already exists: $TARGET_METABASE_PATH"
    
    if [ "$FORCE" != true ]; then
        echo ""
        echo "Existing folder contents:"
        if [ "$(ls -A "$TARGET_METABASE_PATH" 2>/dev/null)" ]; then
            for item in "$TARGET_METABASE_PATH"/*; do
                if [ -f "$item" ]; then
                    size_mb=$(du -m "$item" | cut -f1)
                    echo "  * $(basename "$item") (${size_mb} MB)"
                elif [ -d "$item" ]; then
                    echo "  * $(basename "$item") (DIR)"
                fi
            done
        else
            echo "  (empty or inaccessible)"
        fi
        
        echo ""
        read -p "Overwrite existing metabase folder? [y/N]: " response
        if [[ ! "$response" =~ ^[yY]$ ]]; then
            echo "[CANCELLED] Restore cancelled by user"
            exit 0
        fi
    fi
    
    echo "  [ACTION] Removing existing metabase folder..."
    if rm -rf "$TARGET_METABASE_PATH"; then
        echo "  [OK] Existing folder removed"
    else
        echo "[FAIL] Could not remove existing folder"
        exit 1
    fi
fi
fi

# Check if tar is available
if ! command -v tar &> /dev/null; then
    echo "[FAIL] tar command not found"
    echo "       tar is required for extracting compressed archives"
    echo "       Please install tar"
    exit 1
fi

# Verify backup file integrity first
echo "Verifying backup file integrity..."
if tar -tzf "$ABSOLUTE_BACKUP_FILE" >/dev/null 2>&1; then
    echo "  [OK] Backup file integrity verified"
    echo ""
    echo "Archive contents:"
    tar -tzf "$ABSOLUTE_BACKUP_FILE" | head -10 | while read -r line; do
        echo "  * $line"
    done
    
    # Show total number of files if more than 10
    total_files=$(tar -tzf "$ABSOLUTE_BACKUP_FILE" | wc -l)
    if [ "$total_files" -gt 10 ]; then
        echo "  ... and $((total_files - 10)) more files"
    fi
else
    echo "[FAIL] Backup file appears to be corrupted or invalid"
    echo "       tar verification failed"
    exit 1
fi

echo ""
echo "Starting Metabase restore..."
echo "  Source: $ABSOLUTE_BACKUP_FILE"
echo "  Target: $TARGET_METABASE_PATH"
echo ""

# Extract archive - tar will create the metabase folder
echo "Extracting archive..."
cd "$EXTRACT_TO_DIRECTORY" || exit 1

if ! tar -xzf "$ABSOLUTE_BACKUP_FILE"; then
    echo "[FAIL] tar extraction failed"
    exit 1
fi

# Verify the extracted folder exists
if [ ! -d "$TARGET_METABASE_PATH" ]; then
    echo "[FAIL] Extracted metabase folder not found at: $TARGET_METABASE_PATH"
    echo "       The backup may not contain the expected folder structure"
    exit 1
fi

# Show restored contents
echo ""
echo "METABASE RESTORE RESULTS"
echo "========================"
echo "  [OK] Restore completed successfully"
echo "  [OK] Location: $TARGET_METABASE_PATH"
echo ""

echo "Restored folder contents:"
if [ "$(ls -A "$TARGET_METABASE_PATH" 2>/dev/null)" ]; then
    for item in "$TARGET_METABASE_PATH"/*; do
        if [ -f "$item" ]; then
            size_mb=$(du -m "$item" | cut -f1)
            echo "  * $(basename "$item") (${size_mb} MB)"
        elif [ -d "$item" ]; then
            echo "  * $(basename "$item") (DIR)"
        fi
    done
else
    echo "  [WARN] Restored folder appears to be empty"
fi

echo ""
echo "[SUCCESS] Metabase restore completed successfully!"
echo ""
echo "Next Steps:"
echo "  1. Ensure the Metabase container is stopped"
echo "  2. Verify docker-compose.yml volume mount points to restored folder"
echo "  3. Start the Metabase container: docker-compose up -d metabase"
echo "  4. Check Metabase logs: docker-compose logs metabase"
echo "  5. Verify dashboards and configurations are restored"
echo ""
echo "Container commands:"
echo "  docker-compose stop metabase"
echo "  docker-compose up -d metabase"
echo "  docker-compose logs -f metabase"

exit 0
