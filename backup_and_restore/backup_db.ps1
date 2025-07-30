param(
    [string]$envFile = ".\.env",
    [string]$containerName = "",
    [string]$dbName = "",
    [string]$user = "",
    [string]$outputDirectory = "",
    [ValidateSet("omero", "biomero", "both")]
    [string]$dbType = "both",
    [string]$timestamp = "",
    [switch]$help
)

# Show help if requested
if ($help) {
    Write-Output @"
DATABASE BACKUP SCRIPT - PowerShell

USAGE:
  .\backup_and_restore\backup_db.ps1 [OPTIONS]

DESCRIPTION:
  Backup NL-BIOMERO PostgreSQL databases (OMERO and/or BIOMERO) with error handling and validation.

PARAMETERS:
  -envFile <path>         Path to .env file (default: .\.env)
  -containerName <name>   Override container name (auto-detected)
  -dbName <name>         Override database name (from .env)
  -user <username>       Override database user (from .env)
  -outputDirectory <dir> Output directory (default: .\backup_and_restore\backups)
  -dbType <type>         Database to backup: omero|biomero|both (default: both)
  -help                  Show this help message

EXAMPLES:
  # Backup both databases (default)
  .\backup_and_restore\backup_db.ps1

  # Backup only OMERO database
  .\backup_and_restore\backup_db.ps1 -dbType omero

  # Backup to custom directory
  .\backup_and_restore\backup_db.ps1 -outputDirectory "C:\Backups"

  # Custom configuration
  .\backup_and_restore\backup_db.ps1 -containerName "custom-db" -user "admin" -dbName "mydb"

  # Use different .env file
  .\backup_and_restore\backup_db.ps1 -envFile ".\production.env"

OUTPUT FILES:
  {database}.{timestamp}.pg_dump
  Example: omero.2025-07-24_14-30-15-UTC.pg_dump

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

# Single timestamp for all backups
if ($timestamp) {
    # Use provided timestamp for coordinated backups
    Write-Output "Using provided timestamp: $timestamp"
} else {
    # Generate new timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss-UTC"
}

# Function to backup one database 
function Backup-Single {
    param($dbType, $containerName, $dbName, $user, $outputDirectory, $timestamp)
    
    # Auto-configure based on database type 
    if ($dbType -eq "biomero") {
        $finalContainerName = if ($containerName) { $containerName } else { "nl-biomero-database-biomero-1" }
        $finalDbName = if ($dbName) { $dbName } else { $envHash['BIOMERO_POSTGRES_DB'] }
        $finalUser = if ($user) { $user } else { $envHash['BIOMERO_POSTGRES_USER'] }
    } else {
        # Default to OMERO
        $finalContainerName = if ($containerName) { $containerName } else { "nl-biomero-database-1" }
        $finalDbName = if ($dbName) { $dbName } else { $envHash['POSTGRES_DB'] }
        $finalUser = if ($user) { $user } else { $envHash['POSTGRES_USER'] }
    }

    $finalOutputDir = if ($outputDirectory) { $outputDirectory } else { ".\backup_and_restore\backups" }

    # Generate filename using shared timestamp
    $filename = "$finalDbName.$timestamp.pg_dump"
    $finalOutput = Join-Path $finalOutputDir $filename

    # Create output directory
    New-Item -ItemType Directory -Path $finalOutputDir -Force | Out-Null

    Write-Host "Backing up: $finalUser@$finalDbName from $finalContainerName ($dbType database)"
    Write-Host "Output: $finalOutput"

    # Backup with error checking 
    $dumpResult = docker exec $finalContainerName pg_dump -Fc -f "/tmp/$filename" $finalDbName -U $finalUser 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Error "pg_dump failed! Check container name and credentials."
        Write-Error "Container: $finalContainerName"
        Write-Error "Database: $finalDbName"
        Write-Error "User: $finalUser"
        Write-Error "Error output: $dumpResult"
        return $false
    }

    # Copy the backup file
    $copyResult = docker cp "${finalContainerName}:/tmp/$filename" $finalOutput 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to copy backup file!"
        Write-Error "Copy error: $copyResult"
        return $false
    }

    # Cleanup temp file
    docker exec $finalContainerName rm "/tmp/$filename" 2>$null

    # Verify the backup size 
    if (-not (Test-Path $finalOutput)) {
        Write-Error "Backup file was not created: $finalOutput"
        return $false
    }
    
    $backupSize = (Get-Item $finalOutput).Length
    if ($backupSize -lt 10KB) {
        Write-Error "Backup file is suspiciously small ($backupSize bytes). Check for errors!"
        Write-Output "Content preview:"
        Get-Content $finalOutput -Head 10
        return $false
    } else {
        Write-Output "[OK] Backup successful: $finalOutput ($([math]::Round($backupSize/1MB, 2)) MB)"
        return $true
    }
}

# Handle "both" option or single database
if ($dbType -eq "both") {
    Write-Output "Backing up both databases with timestamp: $timestamp"
    Write-Output ""
    
    $omeroSuccess = Backup-Single "omero" $containerName $dbName $user $outputDirectory $timestamp
    Write-Output ""
    $biomeroSuccess = Backup-Single "biomero" "" "" "" $outputDirectory $timestamp  # Use defaults for biomero
    
    Write-Output ""
    if ($omeroSuccess -and $biomeroSuccess) {
        Write-Output "[SUCCESS] Both backups completed successfully!"
        exit 0
    } else {
        Write-Error "[FAIL] One or more backups failed!"
        if (-not $omeroSuccess) { Write-Error "  - OMERO backup failed" }
        if (-not $biomeroSuccess) { Write-Error "  - BIOMERO backup failed" }
        exit 1
    }
} else {
    # Single database backup
    Write-Output "Backing up single database ($dbType) with timestamp: $timestamp"
    Write-Output ""
    $success = Backup-Single $dbType $containerName $dbName $user $outputDirectory $timestamp
    if (-not $success) {
        Write-Error "[FAIL] $dbType backup failed!"
        exit 1
    } else {
        Write-Output ""
        Write-Output "[SUCCESS] $dbType backup completed successfully!"
        exit 0
    }
}