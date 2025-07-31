param(
    [string]$envFile = ".\.env",
    [string]$containerName = "",
    [string]$outputDirectory = "",
    [string]$timestamp = "",
    [switch]$skipData = $false,
    [switch]$skipConfig = $false,
    [switch]$help
)

# Show help if requested
if ($help) {
    Write-Output @"
OMERO SERVER BACKUP SCRIPT - PowerShell

USAGE:
  .\backup_and_restore\backup_server.ps1 [OPTIONS]

DESCRIPTION:
  Backup OMERO server data store (/OMERO volume) including configuration.
  Requires running OMERO server container.

PARAMETERS:
  -envFile <path>         Path to .env file (default: .\.env)
  -containerName <name>   Override OMERO server container name (default: nl-biomero-omeroserver-1)
  -outputDirectory <dir>  Output directory (default: .\backup_and_restore\backups)
  -skipConfig             Skip configuration export (/OMERO/backup/omero.config)
  -skipData               Skip data store backup (tar.gz archive)
  -help                   Show this help message

EXAMPLES:
  # Full backup (export fresh config + backup entire volume)
  .\backup_and_restore\backup_server.ps1

  # Export fresh config to /OMERO/backup only
  .\backup_and_restore\backup_server.ps1 -skipData

  # Backup data only (skip config export)
  .\backup_and_restore\backup_server.ps1 -skipConfig

PROCESS:
  1. Export current config to /OMERO/backup/omero.config (unless -skipData)
  2. Create tar.gz archive of entire /OMERO volume (unless -skipConfig)

OUTPUT:
  omero-server.{timestamp}.tar.gz (includes config, data, scripts, everything)

For more information, see: backup_and_restore/README.md
"@
    exit 0
}

# Simple .env reader
$envContent = Get-Content $envFile -ErrorAction SilentlyContinue | Where-Object { $_ -match '^[^#]*=' }
$envHash = @{}
$envContent | ForEach-Object {
    $key, $value = $_ -split '=', 2
    $envHash[$key.Trim()] = $value.Trim()
}

# Auto-configure defaults
$finalContainerName = if ($containerName) { $containerName } else { "nl-biomero-omeroserver-1" }
$finalOutputDir = if ($outputDirectory) { $outputDirectory } else { ".\backup_and_restore\backups" }

# Single timestamp for all backups
if ($timestamp) {
    # Use provided timestamp for coordinated backups
    Write-Output "Using provided timestamp: $timestamp"
} else {
    # Generate new timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss-UTC"
}

# Create output directory
New-Item -ItemType Directory -Path $finalOutputDir -Force | Out-Null
$absoluteOutputDir = (Resolve-Path $finalOutputDir).Path

Write-Output "OMERO Server Backup:"
Write-Output "  Container: $finalContainerName"
Write-Output "  Output: $finalOutputDir"
Write-Output "  Timestamp: $timestamp"
Write-Output ""

$configSuccess = $true
$dataSuccess = $true

if ($skipConfig -and $skipData) {
    Write-Error "Both -skipConfig and -skipData specified, nothing to do!"
    exit 1
}

# Step 1: Export current configuration to /OMERO/backup (unless skipConfig)
if (-not $skipConfig) {
    Write-Output "Exporting OMERO configuration to /OMERO/backup/omero.config..."
    
    # Check if container exists and is running
    $containerCheck = docker ps --filter "name=$finalContainerName" --format "{{.Names}}" 2>$null
    if (-not $containerCheck) {
        Write-Error "Container '$finalContainerName' not found or not running"
        Write-Error "Available containers:"
        docker ps --format "table {{.Names}}\t{{.Status}}" 2>$null
        exit 1
    }
    
    # Create backup directory and export config - all in the server container
    $configCmd = "mkdir -p /OMERO/backup && /opt/omero/server/venv3/bin/omero config get --show-password > /OMERO/backup/omero.config"
    
    $configResult = docker exec $finalContainerName sh -c $configCmd 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Output "[OK] Configuration exported to /OMERO/backup/omero.config"
    } else {
        Write-Error "Failed to export OMERO configuration"
        Write-Error "Command output: $configResult"
        $configSuccess = $false
    }
}

# Step 2: Create tar.gz archive of entire /OMERO volume (unless skipData)
if (-not $skipData) {
    Write-Output "Creating archive of complete OMERO data store..."
    $dataFile = "omero-server.$timestamp.tar.gz"
    $hostDataFile = Join-Path $absoluteOutputDir $dataFile
    
    Write-Output "Creating tar.gz archive (this may take a while)..."
    
    # Check if container exists and is running
    $containerCheck = docker ps --filter "name=$finalContainerName" --format "{{.Names}}" 2>$null
    if (-not $containerCheck) {
        Write-Error "Container '$finalContainerName' not found or not running"
        exit 1
    }
    
    # Create tar archive - all in the server container
    $backupCmd = "cd /OMERO && tar -czf /tmp/$dataFile . && echo 'Archive created successfully'"
    
    $backupResult = docker exec $finalContainerName sh -c $backupCmd 2>&1
    if ($LASTEXITCODE -eq 0) {
        # Copy archive to host
        $copyResult = docker cp "$finalContainerName`:/tmp/$dataFile" $hostDataFile 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            # Cleanup temp file in container
            docker exec $finalContainerName rm "/tmp/$dataFile" 2>$null
            
            # Verify file was created and has reasonable size
            if (Test-Path $hostDataFile) {
                $dataSize = (Get-Item $hostDataFile).Length
                if ($dataSize -lt 1MB) {
                    Write-Error "Archive file is suspiciously small ($([math]::Round($dataSize/1KB, 2)) KB)"
                    $dataSuccess = $false
                } else {
                    Write-Output "[OK] Complete OMERO backup: $hostDataFile ($([math]::Round($dataSize/1MB, 2)) MB)"
                }
            } else {
                Write-Error "Archive file was not created: $hostDataFile"
                $dataSuccess = $false
            }
        } else {
            Write-Error "Failed to copy OMERO archive from container"
            Write-Error "Copy error: $copyResult"
            $dataSuccess = $false
        }
    } else {
        Write-Error "Failed to create OMERO archive"
        Write-Error "Backup command output: $backupResult"
        $dataSuccess = $false
    }
}

Write-Output ""
if ($configSuccess -and $dataSuccess) {
    Write-Output "[SUCCESS] OMERO server backup completed successfully!"
    Write-Output ""
    
    if ($skipConfig) {
        Write-Output "Configuration export skipped."
    } elseif ($skipData) {
        Write-Output "Data backup skipped."
    } else {
        Write-Output "Complete backup created:"
        Write-Output "  omero-server.$timestamp.tar.gz"
        Write-Output ""
        Write-Output "Backup includes:"
        Write-Output "[OK] OMERO binary data store"
        Write-Output "[OK] Current configuration (/OMERO/backup/omero.config)"
    }
    exit 0
} else {
    Write-Error "[FAIL] OMERO server backup failed!"
    if (-not $configSuccess) { Write-Error "  - Configuration export failed" }
    if (-not $dataSuccess) { Write-Error "  - Data archive creation failed" }
    Write-Error ""
    Write-Error "Troubleshooting:"
    Write-Error "  - Ensure container '$finalContainerName' is running: docker ps"
    Write-Error "  - Check container logs: docker logs $finalContainerName"
    Write-Error "  - Verify OMERO server is operational"
    exit 1
}