param(
    [string]$envFile = ".\.env",
    [string]$containerName = "",
    [string]$outputDirectory = "",
    [string]$volumeName = "",
    [switch]$configOnly = $false,
    [switch]$dataOnly = $false,
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
  -volumeName <name>      Override OMERO volume name (default: nl-biomero_omero)
  -configOnly             Export config to /OMERO/backup/omero.config only
  -dataOnly               Backup only data store (skip config export)
  -help                   Show this help message

EXAMPLES:
  # Full backup (export fresh config + backup entire volume)
  .\backup_and_restore\backup_server.ps1

  # Export fresh config to /OMERO/backup only
  .\backup_and_restore\backup_server.ps1 -configOnly

  # Backup data only (skip config export)
  .\backup_and_restore\backup_server.ps1 -dataOnly

PROCESS:
  1. Export current config to /OMERO/backup/omero.config (unless -dataOnly)
  2. Create tar.gz archive of entire /OMERO volume (unless -configOnly)

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
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss-UTC"

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

# Step 1: Export current configuration to /OMERO/backup (unless dataOnly)
if (-not $dataOnly) {
    Write-Output "Exporting OMERO configuration to /OMERO/backup/omero.config..."
    
    # Create backup directory and export config - all in the server container
    $configCmd = "mkdir -p /OMERO/backup && /opt/omero/server/venv3/bin/omero config get --show-password > /OMERO/backup/omero.config"
    
    docker exec $finalContainerName sh -c $configCmd 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Output ">> Configuration exported to /OMERO/backup/omero.config"
    } else {
        Write-Error "Failed to export OMERO configuration"
        $configSuccess = $false
    }
}

# Step 2: Create tar.gz archive of entire /OMERO volume (unless configOnly)
if (-not $configOnly) {
    Write-Output "Creating archive of complete OMERO data store..."
    $dataFile = "omero-server.$timestamp.tar.gz"
    $hostDataFile = Join-Path $absoluteOutputDir $dataFile
    
    Write-Output "Creating tar.gz archive (this may take a while)..."
    
    # Create tar archive - all in the server container
    $backupCmd = "cd /OMERO && tar -czf /tmp/$dataFile . && echo 'Archive created successfully'"
    
    docker exec $finalContainerName sh -c $backupCmd 2>$null
    if ($LASTEXITCODE -eq 0) {
        # Copy archive to host
        docker cp "$finalContainerName`:/tmp/$dataFile" $hostDataFile
        
        if ($LASTEXITCODE -eq 0) {
            # Cleanup temp file in container
            docker exec $finalContainerName rm "/tmp/$dataFile" 2>$null
            
            $dataSize = (Get-Item $hostDataFile).Length
            Write-Output ">> Complete OMERO backup: $hostDataFile ($([math]::Round($dataSize/1MB, 2)) MB)"
        } else {
            Write-Error "Failed to copy OMERO archive from container"
            $dataSuccess = $false
        }
    } else {
        Write-Error "Failed to create OMERO archive"
        $dataSuccess = $false
    }
}

Write-Output ""
if ($configSuccess -and $dataSuccess) {
    Write-Output "*** OMERO server backup completed successfully! ***"
    Write-Output ""
    
    if ($configOnly) {
        Write-Output "Configuration exported to:"
        Write-Output "  /OMERO/backup/omero.config (inside OMERO volume/mount)"
    } elseif ($dataOnly) {
        Write-Output "Data backup created:"
        Write-Output "  omero-server.$timestamp.tar.gz"
    } else {
        Write-Output "Complete backup created:"
        Write-Output "  omero-server.$timestamp.tar.gz"
        Write-Output ""
        Write-Output "Backup includes:"
        Write-Output ">> OMERO binary data store"
        Write-Output ">> Current configuration (/OMERO/backup/omero.config)"
    }
} else {
    Write-Error "*** OMERO server backup failed! ***"
    exit 1
}