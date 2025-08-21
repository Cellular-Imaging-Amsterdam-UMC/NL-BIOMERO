param(
    [string]$envFile = ".\.env",
    [string]$backupPath = "",
    [string]$targetPath = "",
    [string]$volumeName = "",
    [string]$backupDirectory = ".\backup_and_restore\backups",
    [string]$configFile = "",
    [switch]$help
)

# Show help if requested
if ($help) {
    Write-Output @"
OMERO SERVER RESTORE SCRIPT - PowerShell

USAGE:
  .\backup_and_restore\restore_server.ps1 [OPTIONS]

DESCRIPTION:
  Restore OMERO server from backup tar.gz archive. Optionally override configuration.

PARAMETERS:
  -envFile <path>           Path to .env file (default: .\.env)
  -backupPath <path>        Path to backup tar.gz file (auto-detects latest if not specified)
  -targetPath <path>        Local folder to extract to (alternative to volume)
  -volumeName <name>        Docker volume name to create (auto-generated if not specified)
  -backupDirectory <dir>    Directory to search for latest backup (default: .\backup_and_restore\backups)
  -configFile <path>        Custom omero.config file to use instead of backup config
  -help                     Show this help message

EXAMPLES:
  # Restore with original config from backup
  .\backup_and_restore\restore_server.ps1 -backupPath ".\backups\omero-server.2025-07-29_12-09-40-UTC.tar.gz"

  # Restore with custom config file
  .\backup_and_restore\restore_server.ps1 -backupPath ".\backups\omero-server.2025-07-29_12-09-40-UTC.tar.gz" -configFile ".\config\production.omero.config"

  # Auto-detect backup + custom config for development
  .\backup_and_restore\restore_server.ps1 -configFile ".\config\dev.omero.config" -volumeName "dev-omero"

  # Restore old backup with updated LDAP config
  .\backup_and_restore\restore_server.ps1 -backupPath "old-backup.tar.gz" -configFile ".\config\new-ldap.omero.config"

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

For more information, see: backup_and_restore/README.md
"@
    exit 0
}

# Validate config file if provided
if ($configFile) {
    if (-not (Test-Path $configFile)) {
        Write-Error "Config file not found: $configFile"
        exit 1
    }
    
    # Validate it looks like a config file
    $configContent = Get-Content $configFile -ErrorAction SilentlyContinue
    if (-not ($configContent -match "omero\." -or $configContent -match "^#")) {
        Write-Warning "Config file doesn't appear to contain OMERO configuration"
        Write-Output "Expected format: omero.property=value (one per line)"
        $continue = Read-Host "Continue anyway? (y/N)"
        if ($continue -ne "y" -and $continue -ne "Y") {
            exit 1
        }
    }
    
    Write-Output "Using custom config file: $configFile"
}

# Auto-detect latest backup if not specified
if (-not $backupPath) {
    $latestBackup = Get-ChildItem -Path $backupDirectory -Filter "omero-server.*.tar.gz" -ErrorAction SilentlyContinue | 
                    Sort-Object LastWriteTime -Descending | 
                    Select-Object -First 1
    
    if ($latestBackup) {
        $backupPath = $latestBackup.FullName
        Write-Output "Auto-detected latest backup: $($latestBackup.Name)"
    } else {
        Write-Error "No backup files found in $backupDirectory"
        Write-Output "Available files:"
        Get-ChildItem -Path $backupDirectory -ErrorAction SilentlyContinue | ForEach-Object { Write-Output "  $($_.Name)" }
        exit 1
    }
}

# Validate backup file exists
if (-not (Test-Path $backupPath)) {
    Write-Error "Backup file not found: $backupPath"
    exit 1
}

# Extract timestamp from backup filename for naming
$backupFileName = [System.IO.Path]::GetFileName($backupPath)
if ($backupFileName -match "omero-server\.(.+)\.tar\.gz$") {
    $backupTimestamp = $matches[1]
} else {
    $backupTimestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
}

# Determine target (volume or folder)
if ($targetPath) {
    # LOCAL FOLDER MODE: extract directly, no container
    $finalTarget = Join-Path $targetPath "omero-server-$backupTimestamp"
    $targetType = "local folder"
    
    if (Test-Path $finalTarget) {
        Write-Error "Target folder already exists: $finalTarget"
        Write-Output "Remove it first or choose a different path."
        exit 1
    }
    
    New-Item -ItemType Directory -Path $finalTarget -Force | Out-Null
    $finalTarget = (Resolve-Path $finalTarget).Path
    
    Write-Output "OMERO Server Restore:"
    Write-Output "  Backup: $backupPath"
    Write-Output "  Target: $finalTarget ($targetType)"
    Write-Output "  Timestamp: $backupTimestamp"
    if ($configFile) {
        Write-Output "  Config Override: $configFile"
    }
    Write-Output ""
    
    # Extract directly to local folder (no container needed)
    Write-Output "Extracting OMERO backup directly to $finalTarget ..."
    $extractResult = & tar -xzf $backupPath -C $finalTarget 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to extract backup archive: $extractResult"
        exit 1
    }
    
    # Handle configuration
    $hasConfig = $false
    $configSource = ""
    if ($configFile) {
        # CUSTOM CONFIG MODE - Override with provided config file
        Write-Output "Installing custom configuration..."
        $backupDir = Join-Path $finalTarget "backup"
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        if (Copy-Item $configFile (Join-Path $backupDir "omero.config") -Force) {
            Write-Output "[OK] Custom configuration installed: $backupDir\omero.config"
            $hasConfig = $true
            $configSource = "custom file: $(Split-Path $configFile -Leaf)"
        } else {
            Write-Error "Failed to install custom configuration"
            exit 1
        }
    } else {
        $configPath = Join-Path $finalTarget "backup\omero.config"
        if (Test-Path $configPath) {
            Write-Output "[OK] Configuration backup found: $configPath"
            $hasConfig = $true
            $configSource = "backup archive"
        } else {
            Write-Warning "No configuration backup found at $configPath"
            $configSource = "none - manual config required"
        }
    }
    
    # Show result summary
    Write-Output ""
    Write-Output "[SUCCESS] OMERO server restore completed successfully!"
    Write-Output ""
    Write-Output "Local folder created: $finalTarget"
    Write-Output ""
    Write-Output "To use in docker-compose.yml:"
    Write-Output "  services:"
    Write-Output "    omeroserver:"
    Write-Output "      volumes:"
    Write-Output "        - `"${finalTarget}:/OMERO`""
    Write-Output ""
    Write-Output "Configuration restoration:"
    Write-Output "  Config source: $configSource"
    if ($hasConfig) {
        Write-Output "  [OK] 00-restore-config.sh will automatically load config on container start"
        Write-Output "  [OK] No manual configuration required!"
    } else {
        Write-Output "  [WARN] No config available - you'll need to configure manually"
        Write-Output "  [TIP] Use CONFIG_ environment variables in docker-compose.yml"
        Write-Output "  [TIP] Or mount .omero config files to /opt/omero/server/config/"
    }
    Write-Output ""
    Write-Output "Next steps:"
    Write-Output "  1. Update docker-compose.yml with the volume configuration above"
    Write-Output "  2. Start OMERO containers: docker-compose up -d"
    Write-Output "  3. Check logs: docker-compose logs omeroserver"
    Write-Output "  4. Restored to: $finalTarget"
    if ($configFile) {
        Write-Output ""
        Write-Output "Configuration override applied:"
        Write-Output "  [INFO] Original backup config (if any) was replaced"
        Write-Output "  [INFO] Custom config from: $configFile"
        Write-Output "  [INFO] Will be loaded automatically on container startup"
    }
    exit 0
}

# DOCKER VOLUME MODE (existing container-based logic)
if ($volumeName) {
        $finalVolumeName = $volumeName
    } else {
        # Generate volume name from backup timestamp
        $finalVolumeName = "omero-server-$backupTimestamp"
    }
    
    # Check if volume exists
    $existingVolume = docker volume ls -q --filter "name=^${finalVolumeName}$" 2>$null
    if ($existingVolume) {
        Write-Error "Volume already exists: $finalVolumeName"
        Write-Output "Remove it first with: docker volume rm $finalVolumeName"
        exit 1
    }
    
    # Create volume
    docker volume create $finalVolumeName | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to create Docker volume: $finalVolumeName"
        exit 1
    }
    
    $finalTarget = $finalVolumeName
    $targetType = "Docker volume"
}

Write-Output "OMERO Server Restore:"
Write-Output "  Backup: $backupPath"
Write-Output "  Target: $finalTarget ($targetType)"
Write-Output "  Timestamp: $backupTimestamp"
if ($configFile) {
    Write-Output "  Config Override: $configFile"
}
Write-Output ""

# Get backup file size for progress indication
$backupSize = (Get-Item $backupPath).Length
$backupSizeMB = [math]::Round($backupSize / 1MB, 2)
Write-Output "Extracting OMERO backup ($backupSizeMB MB)..."

# Extract backup using temporary container
if ($targetPath) {
    # Extract to local folder
    $tempContainer = docker run -d -v "${finalTarget}:/target" alpine:latest tail -f /dev/null 2>$null
} else {
    # Extract to volume
    $tempContainer = docker run -d -v "${finalVolumeName}:/target" alpine:latest tail -f /dev/null 2>$null
}

if (-not $tempContainer -or $tempContainer.Length -lt 10) {
    Write-Error "Failed to create temporary container for extraction"
    exit 1
}

try {
    # Copy backup to container
    $absoluteBackupPath = (Resolve-Path $backupPath).Path
    docker cp $absoluteBackupPath "${tempContainer}:/tmp/backup.tar.gz"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to copy backup to container"
        exit 1
    }
    
    # Extract backup
    Write-Output "Extracting archive (this may take a while)..."
    docker exec $tempContainer tar -xzf "/tmp/backup.tar.gz" -C /target 2>$null
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to extract backup archive"
        exit 1
    }
    
    # Verify extraction
    $extractedFiles = docker exec $tempContainer sh -c "find /target -type f | wc -l" 2>$null
    if ($extractedFiles -and $extractedFiles -gt 0) {
        Write-Output ">> Backup extracted successfully ($extractedFiles files)"
    } else {
        Write-Error "Backup extraction appears to have failed (no files found)"
        exit 1
    }
    
    # Handle configuration
    $hasConfig = $false
    $configSource = ""
    
    if ($configFile) {
        # CUSTOM CONFIG MODE - Override with provided config file
        Write-Output "Installing custom configuration..."
        
        # Ensure backup directory exists
        docker exec $tempContainer mkdir -p "/target/backup" 2>$null
        
        # Copy custom config to container and place it in backup location
        $absoluteConfigPath = (Resolve-Path $configFile).Path
        docker cp $absoluteConfigPath "${tempContainer}:/tmp/custom.config"
        docker exec $tempContainer cp "/tmp/custom.config" "/target/backup/omero.config"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Output "✅ Custom configuration installed: /OMERO/backup/omero.config"
            $hasConfig = $true
            $configSource = "custom file: $(Split-Path $configFile -Leaf)"
        } else {
            Write-Error "Failed to install custom configuration"
            exit 1
        }
        
        # Cleanup temp file
        docker exec $tempContainer rm "/tmp/custom.config" 2>$null
        
    } else {
        # CHECK FOR EXISTING CONFIG from backup
        $configCheck = docker exec $tempContainer test -f "/target/backup/omero.config" 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Output ">> Configuration backup found: /OMERO/backup/omero.config"
            $hasConfig = $true
            $configSource = "backup archive"
        } else {
            Write-Warning "No configuration backup found at /OMERO/backup/omero.config"
            $configSource = "none - manual config required"
        }
    }
    
    # Cleanup temporary backup file
    docker exec $tempContainer rm "/tmp/backup.tar.gz" 2>$null
    
} finally {
    # Cleanup temporary container
    docker stop $tempContainer | Out-Null
    docker rm $tempContainer | Out-Null
}

Write-Output ""
Write-Output "*** OMERO server restore completed successfully! ***"
Write-Output ""

if ($targetPath) {
    Write-Output "Local folder created: $finalTarget"
    Write-Output ""
    Write-Output "To use in docker-compose.yml:"
    Write-Output "  services:"
    Write-Output "    omeroserver:"
    Write-Output "      volumes:"
    Write-Output "        - `"${finalTarget}:/OMERO`""
} else {
    Write-Output "Docker volume created: $finalVolumeName"
    Write-Output ""
    Write-Output "To use in docker-compose.yml:"
    Write-Output "  volumes:"
    Write-Output "    omero:"
    Write-Output "      external: true"
    Write-Output "      name: $finalVolumeName"
    Write-Output ""
    Write-Output "  services:"
    Write-Output "    omeroserver:"
    Write-Output "      volumes:"
    Write-Output "        - `"omero:/OMERO`""
}

Write-Output ""
Write-Output "Configuration restoration:"
Write-Output "  Config source: $configSource"
if ($hasConfig) {
    Write-Output "  [OK] 00-restore-config.sh will automatically load config on container start"
    Write-Output "  [OK] No manual configuration required!"
} else {
    Write-Output "  [WARN] No config available - you'll need to configure manually"
    Write-Output "  [TIP] Use CONFIG_ environment variables in docker-compose.yml"
    Write-Output "  [TIP] Or mount .omero config files to /opt/omero/server/config/"
}

Write-Output ""
Write-Output "Next steps:"
Write-Output "  1. Update docker-compose.yml with the volume configuration above"
Write-Output "  2. Start OMERO containers: docker-compose up -d"
Write-Output "  3. Check logs: docker-compose logs omeroserver"

# Show volume/folder info
if ($targetPath) {
    $finalSize = (Get-ChildItem -Path $finalTarget -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
    if ($finalSize) {
        $finalSizeMB = [math]::Round($finalSize / 1MB, 2)
        Write-Output "  4. Restored size: $finalSizeMB MB"
    }
} else {
    Write-Output "  4. Check volume: docker volume inspect $finalVolumeName"
}

if ($configFile) {
    Write-Output ""
    Write-Output "Configuration override applied:"
    Write-Output "  [INFO] Original backup config (if any) was replaced"
    Write-Output "  [INFO] Custom config from: $configFile"
    Write-Output "  [INFO] Will be loaded automatically on container startup"
}