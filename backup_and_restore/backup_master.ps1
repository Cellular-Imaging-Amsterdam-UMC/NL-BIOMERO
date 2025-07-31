param(
    [string]$envFile = ".\.env",
    [string]$outputDirectory = "",
    [string]$serverContainerName = "",
    [string]$omeroDbContainerName = "",
    [string]$biomeroDbContainerName = "",
    [string]$metabaseFolder = "",
    [switch]$skipDatabase = $false,
    [switch]$skipServer = $false,
    [switch]$skipMetabase = $false,
    [switch]$skipServerData = $false,
    [switch]$skipServerConfig = $false,
    [switch]$help
)

# Show help if requested
if ($help) {
    Write-Output @"
OMERO MASTER BACKUP SCRIPT - PowerShell

USAGE:
  .\backup_and_restore\backup_master.ps1 [OPTIONS]

DESCRIPTION:
  Master backup script that coordinates database, server, and Metabase backups with a synchronized timestamp.
  This ensures data consistency by backing up all components at the same point in time.
  Always backs up both OMERO and BIOMERO databases.

PARAMETERS:
  -envFile <path>                Path to .env file (default: .\.env)
  -outputDirectory <dir>         Output directory (default: .\backup_and_restore\backups)
  -serverContainerName <name>    Override OMERO server container name (default: nl-biomero-omeroserver-1)
  -omeroDbContainerName <name>   Override OMERO database container name (default: nl-biomero_database_1)
  -biomeroDbContainerName <name> Override BIOMERO database container name (default: nl-biomero_database-biomero_1)
  -metabaseFolder <path>         Override metabase folder path (default: .\metabase)
  -skipDatabase                  Skip database backup
  -skipServer                    Skip server backup
  -skipMetabase                  Skip Metabase backup
  -skipServerData                Skip server data backup
  -skipServerConfig              Skip server config export
  -help                          Show this help message

EXAMPLES:
  # Full synchronized backup (default - sequential execution)
  .\backup_and_restore\backup_master.ps1

  # Only server backup (skip databases and Metabase)
  .\backup_and_restore\backup_master.ps1 -skipDatabase -skipMetabase

  # Only export fresh server config, backup both databases and Metabase
  .\backup_and_restore\backup_master.ps1 -configOnly

  # Database and Metabase only (useful for regular automated backups)
  .\backup_and_restore\backup_master.ps1 -skipServer

  # Custom database container names
  .\backup_and_restore\backup_master.ps1 -omeroDbContainerName "custom-omero-db" -biomeroDbContainerName "custom-biomero-db"

BACKUP CONSISTENCY:
  This script generates a single timestamp and passes it to all backup operations,
  ensuring that all backups represent the same point in time.

SEQUENTIAL VS PARALLEL:
  - Sequential (default): Database first, then server (safer, less resource intensive)
  - Parallel: All backups run simultaneously for speed (use if you have sufficient resources)

OUTPUT FILES:
  Database: omero.{timestamp}.pg_dump, biomero.{timestamp}.pg_dump
  Server:   omero-server.{timestamp}.tar.gz
  Metabase: metabase.{timestamp}.tar.gz
  All files use the same timestamp for consistency

For more information, see: backup_and_restore/README.md
"@
    exit 0
}

# Validate conflicting parameters
if ($skipDatabase -and $skipServer -and $skipMetabase) {
    Write-Error "Cannot skip all backup components. Use individual backup scripts instead."
    exit 1
}

if ($skipServer -and ($skipServerData -or $skipServerConfig)) {
    Write-Error "Cannot use -skipServerData or -skipServerConfig when skipping server backup."
    exit 1
}

# Validate script availability
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$dbScript = Join-Path $scriptDir "backup_db.ps1"
$serverScript = Join-Path $scriptDir "backup_server.ps1"
$metabaseScript = Join-Path $scriptDir "backup_metabase.ps1"

if (-not $skipDatabase -and -not (Test-Path $dbScript)) {
    Write-Error "Database backup script not found: $dbScript"
    exit 1
}

if (-not $skipServer -and -not (Test-Path $serverScript)) {
    Write-Error "Server backup script not found: $serverScript"
    exit 1
}

if (-not $skipMetabase -and -not (Test-Path $metabaseScript)) {
    Write-Error "Metabase backup script not found: $metabaseScript"
    exit 1
}

# Generate single shared timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss-UTC"

# Set output directory to subfolder with timestamp
if ($outputDirectory) {
    $finalOutputDir = Join-Path $outputDirectory $timestamp
} else {
    $finalOutputDir = ".\backup_and_restore\backups\$timestamp"
}

# Create output directory
New-Item -ItemType Directory -Path $finalOutputDir -Force | Out-Null
$absoluteOutputDir = (Resolve-Path $finalOutputDir).Path

# Convert envFile to absolute path for background jobs
$absoluteEnvFile = if (Test-Path $envFile) { 
    (Resolve-Path $envFile).Path 
} else { 
    # If .env doesn't exist, still convert to absolute path so error messages are clearer
    (Join-Path (Get-Location).Path $envFile)
}

# Show configuration summary
Write-Output "NL-BIOMERO MASTER BACKUP CONFIGURATION"
Write-Output "====================================="
Write-Output "  Timestamp: $timestamp"
Write-Output "  Output Directory: $absoluteOutputDir"
Write-Output "  Environment File: $absoluteEnvFile"
Write-Output ""

if ($skipDatabase) {
    Write-Output "  [SKIP] Database backup: SKIPPED"
} else {
    Write-Output "  [DB] Database backup: ENABLED (both OMERO and BIOMERO)"
}
if ($skipServer) {
    Write-Output "  [SKIP] Server backup: SKIPPED"
} else {
    $serverMode = if ($skipServerData) { "config only" } elseif ($skipServerConfig) { "data only" } else { "full backup" }
    Write-Output "  [SERVER] Server backup: ENABLED ($serverMode)"
}
if ($skipMetabase) {
    Write-Output "  [SKIP] Metabase backup: SKIPPED"
} else {
    Write-Output "  [METABASE] Metabase backup: ENABLED"
}
Write-Output ""

# Build command arguments - Use hashtables for proper parameter splatting
$omeroDbArgs = @{
    'envFile' = $absoluteEnvFile
    'outputDirectory' = $absoluteOutputDir
    'timestamp' = $timestamp
    'dbType' = 'omero'
}
$biomeroDbArgs = @{
    'envFile' = $absoluteEnvFile
    'outputDirectory' = $absoluteOutputDir
    'timestamp' = $timestamp
    'dbType' = 'biomero'
}
if ($omeroDbContainerName) { $omeroDbArgs['containerName'] = $omeroDbContainerName }
if ($biomeroDbContainerName) { $biomeroDbArgs['containerName'] = $biomeroDbContainerName }
# Server arguments
$serverArgs = @{
    'envFile' = $absoluteEnvFile
    'outputDirectory' = $finalOutputDir
    'timestamp' = $timestamp
}
if ($serverContainerName) { $serverArgs['containerName'] = $serverContainerName }
if ($skipServerData) { $serverArgs['skipData'] = $true }
if ($skipServerConfig) { $serverArgs['skipConfig'] = $true }
$metabaseArgs = @{}
if ($metabaseFolder) { $metabaseArgs['metabaseFolder'] = $metabaseFolder }

# Sequential execution only
Write-Output "Starting backup process..."
Write-Output ""

# Step 1: Database backups
if (-not $skipDatabase) {
    Write-Output "[DB] STEP 1a: OMERO Database Backup"
    Write-Output "-----------------------------------"
    try {
        $omeroDbResult = & $dbScript @omeroDbArgs 2>&1
        $omeroDbExitCode = $LASTEXITCODE
        if ($omeroDbResult -match "Cannot validate argument|ParameterBindingValidationException") {
            $omeroDbSuccess = $false
            Write-Output "[FAIL] Parameter validation error in OMERO database backup"
        } elseif ($omeroDbExitCode -ne 0) {
            $omeroDbSuccess = $false
            Write-Output "[FAIL] OMERO database backup failed with exit code: $omeroDbExitCode"
        } elseif ($omeroDbResult -match "\[FAIL\]|ERROR") {
            $omeroDbSuccess = $false
            Write-Output "[FAIL] OMERO database backup reported failure"
        } else {
            $omeroDbSuccess = $true
        }
        Write-Output $omeroDbResult
    } catch {
        $omeroDbSuccess = $false
        Write-Output "[FAIL] OMERO database backup threw exception: $($_.Exception.Message)"
    }
    if ($omeroDbSuccess) {
        Write-Output "[OK] OMERO database backup completed successfully"
    } else {
        Write-Output "[FAIL] OMERO database backup failed"
    }
    Write-Output ""

    Write-Output "[DB] STEP 1b: BIOMERO Database Backup"
    Write-Output "-------------------------------------"
    try {
        $biomeroDbResult = & $dbScript @biomeroDbArgs 2>&1
        $biomeroDbExitCode = $LASTEXITCODE
        if ($biomeroDbResult -match "Cannot validate argument|ParameterBindingValidationException") {
            $biomeroDbSuccess = $false
            Write-Output "[FAIL] Parameter validation error in BIOMERO database backup"
        } elseif ($biomeroDbExitCode -ne 0) {
            $biomeroDbSuccess = $false
            Write-Output "[FAIL] BIOMERO database backup failed with exit code: $biomeroDbExitCode"
        } elseif ($biomeroDbResult -match "\[FAIL\]|ERROR") {
            $biomeroDbSuccess = $false
            Write-Output "[FAIL] BIOMERO database backup reported failure"
        } else {
            $biomeroDbSuccess = $true
        }
        Write-Output $biomeroDbResult
    } catch {
        $biomeroDbSuccess = $false
        Write-Output "[FAIL] BIOMERO database backup threw exception: $($_.Exception.Message)"
    }
    if ($biomeroDbSuccess) {
        Write-Output "[OK] BIOMERO database backup completed successfully"
    } else {
        Write-Output "[FAIL] BIOMERO database backup failed"
    }
    Write-Output ""
}

# Step 2: Metabase backup (only if databases succeeded or were skipped)
if (-not $skipMetabase -and (($omeroDbSuccess -and $biomeroDbSuccess) -or $skipDatabase)) {
    Write-Output "[METABASE] STEP 2: Metabase Backup"
    Write-Output "---------------------------------"
    try {
        $metabaseResult = & $metabaseScript @metabaseArgs 2>&1
        $metabaseExitCode = $LASTEXITCODE
        if ($metabaseResult -match "Cannot validate argument|ParameterBindingValidationException") {
            $metabaseSuccess = $false
            Write-Output "[FAIL] Parameter validation error in Metabase backup"
        } elseif ($metabaseExitCode -ne 0) {
            $metabaseSuccess = $false
            Write-Output "[FAIL] Metabase backup failed with exit code: $metabaseExitCode"
        } elseif ($metabaseResult -match "\[FAIL\]|ERROR") {
            $metabaseSuccess = $false
            Write-Output "[FAIL] Metabase backup reported failure"
        } else {
            $metabaseSuccess = $true
        }
        Write-Output $metabaseResult
    } catch {
        $metabaseSuccess = $false
        Write-Output "[FAIL] Metabase backup threw exception: $($_.Exception.Message)"
    }
    if ($metabaseSuccess) {
        Write-Output "[OK] Metabase backup completed successfully"
    } else {
        Write-Output "[FAIL] Metabase backup failed"
    }
    Write-Output ""
}

# Step 3: Server backup (only if previous steps succeeded or were skipped)
if (-not $skipServer -and (($omeroDbSuccess -and $biomeroDbSuccess) -or $skipDatabase) -and ($metabaseSuccess -or $skipMetabase)) {
    Write-Output "[SERVER] STEP 3: Server Backup"
    Write-Output "-------------------------------"
    try {
        $serverResult = & $serverScript @serverArgs 2>&1
        $serverExitCode = $LASTEXITCODE
        if ($serverResult -match "Cannot validate argument|ParameterBindingValidationException") {
            $serverSuccess = $false
            Write-Output "[FAIL] Parameter validation error in server backup"
        } elseif ($serverExitCode -ne 0) {
            $serverSuccess = $false
            Write-Output "[FAIL] Server backup failed with exit code: $serverExitCode"
        } elseif ($serverResult -match "\[FAIL\]|ERROR") {
            $serverSuccess = $false
            Write-Output "[FAIL] Server backup reported failure"
        } else {
            $serverSuccess = $true
        }
        Write-Output $serverResult
    } catch {
        $serverSuccess = $false
        Write-Output "[FAIL] Server backup threw exception: $($_.Exception.Message)"
    }
    if ($serverSuccess) {
        Write-Output "[OK] Server backup completed successfully"
    } else {
        Write-Output "[FAIL] Server backup failed"
    }
    Write-Output ""
}

# Final summary
Write-Output "BACKUP SUMMARY"
Write-Output "=============="
Write-Output "  Timestamp: $timestamp"
Write-Output "  Execution: Sequential"

if (-not $skipDatabase) {
    if ($omeroDbSuccess -eq $true) {
        Write-Output "  [DB] OMERO Database: [OK] SUCCESS"
        Write-Output "    * omero.$timestamp.pg_dump"
    } elseif ($omeroDbSuccess -eq $false) {
        Write-Output "  [DB] OMERO Database: [FAIL] FAILED"
    } else {
        Write-Output "  [DB] OMERO Database: [SKIP] NOT ATTEMPTED"
    }
    
    if ($biomeroDbSuccess -eq $true) {
        Write-Output "  [DB] BIOMERO Database: [OK] SUCCESS"
        Write-Output "    * biomero.$timestamp.pg_dump"
    } elseif ($biomeroDbSuccess -eq $false) {
        Write-Output "  [DB] BIOMERO Database: [FAIL] FAILED"
    } else {
        Write-Output "  [DB] BIOMERO Database: [SKIP] NOT ATTEMPTED"
    }
}

if (-not $skipServer) {
    if ($serverSuccess -eq $true) {
        $serverTar = Join-Path $finalOutputDir "omero-server.$timestamp.tar.gz"
        if (Test-Path $serverTar) {
            Write-Output "  [SERVER] Server: [OK] SUCCESS"
            Write-Output "    * omero-server.$timestamp.tar.gz"
        } elseif ($skipServerData) {
            Write-Output "  [SERVER] Server: [OK] SUCCESS"
            Write-Output "    * (config only, no tar.gz created)"
        } else {
            Write-Output "  [SERVER] Server: [OK] SUCCESS"
        }
    } elseif ($serverSuccess -eq $false) {
        Write-Output "  [SERVER] Server: [FAIL] FAILED"
    } else {
        Write-Output "  [SERVER] Server: [SKIP] NOT ATTEMPTED"
    }
}

if (-not $skipMetabase) {
    if ($metabaseSuccess -eq $true) {
        Write-Output "  [METABASE] Metabase: [OK] SUCCESS"
        Write-Output "    * metabase.$timestamp.tar.gz"
    } elseif ($metabaseSuccess -eq $false) {
        Write-Output "  [METABASE] Metabase: [FAIL] FAILED"
    } else {
        Write-Output "  [METABASE] Metabase: [SKIP] NOT ATTEMPTED"
    }
}

Write-Output ""

# Check actual files created - Fix file detection
Write-Output ""
Write-Output "Backup Location: $finalOutputDir"
Write-Output ""
Write-Output "Files Created:"
$backupFiles = Get-ChildItem -Path $finalOutputDir -Filter "*$timestamp*" -File -ErrorAction SilentlyContinue
if ($backupFiles -and $backupFiles.Count -gt 0) {
    $backupFiles | ForEach-Object {
        $sizeMB = [math]::Round($_.Length / 1MB, 2)
        Write-Output "  [OK] $($_.Name) ($sizeMB MB)"
    }
} else {
    Write-Output "  [WARN] No files found with timestamp $timestamp"
}

Write-Output ""

# Determine overall success - Fix success logic
$overallSuccess = $true

# Check database success
if (-not $skipDatabase) {
    if ($omeroDbSuccess -ne $true) { 
        $overallSuccess = $false
        if ($omeroDbSuccess -eq $false) {
            Write-Output "  [REASON] OMERO database backup failed"
        } else {
            Write-Output "  [REASON] OMERO database backup was not attempted"
        }
    }
    
    if ($biomeroDbSuccess -ne $true) { 
        $overallSuccess = $false
        if ($biomeroDbSuccess -eq $false) {
            Write-Output "  [REASON] BIOMERO database backup failed"
        } else {
            Write-Output "  [REASON] BIOMERO database backup was not attempted"
        }
    }
}

# Check server success  
if (-not $skipServer) {
    if ($serverSuccess -ne $true) { 
        $overallSuccess = $false
        if ($serverSuccess -eq $false) {
            Write-Output "  [REASON] Server backup failed"
        } else {
            Write-Output "  [REASON] Server backup was not attempted"
        }
    }
}

# Check Metabase success
if (-not $skipMetabase) {
    if ($metabaseSuccess -ne $true) { 
        $overallSuccess = $false
        if ($metabaseSuccess -eq $false) {
            Write-Output "  [REASON] Metabase backup failed"
        } else {
            Write-Output "  [REASON] Metabase backup was not attempted"
        }
    }
}

# Check if files were actually created
if (-not $actualFilesCreated -and (-not $skipDatabase -or -not $skipServer -or -not $skipMetabase)) {
    $overallSuccess = $false
    Write-Output "  [REASON] No backup files were created"
}

if ($overallSuccess) {
    Write-Output "[SUCCESS] All backup operations completed successfully!"
    Write-Output ""
    
    exit 0
} else {
    Write-Output "[FAIL] One or more backup operations failed!"
    Write-Output ""
    Write-Output "Troubleshooting:"
    Write-Output "  * Check container status: docker ps"
    Write-Output "  * Ensure NL-BIOMERO containers are running"
    Write-Output "  * Review individual backup script logs above"
    Write-Output "  * Verify disk space and permissions"
    Write-Output "  * Run individual scripts separately for detailed debugging"
    
    exit 1
}