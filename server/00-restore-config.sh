#!/bin/bash
# Auto-generated OMERO configuration restoration script
# This loads configuration from backup during container startup

set -eu

omero=/opt/omero/server/venv3/bin/omero
# The path to the OMERO configuration backup file.
# Override CONFIG_BACKUP_PATH environment variable to change location.
config_backup="${CONFIG_BACKUP_PATH:-/OMERO/backup/omero.config}"

echo "Checking for configuration backup..."

if [ -f "$config_backup" ]; then
    echo "Found configuration backup: $config_backup"
    echo "Loading backup configuration..."
    
    # Load configuration from backup
    $omero config load "$config_backup"
    
    echo "Configuration loaded successfully from backup"
else
    echo "No configuration backup found at $config_backup"
    echo "Skipping configuration restoration"
fi

echo "Configuration restoration completed"