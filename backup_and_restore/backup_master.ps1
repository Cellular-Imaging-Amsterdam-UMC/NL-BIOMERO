param(
    [string]$envFile = ".\.env",
    [string]$outputDirectory = "",
    [ValidateSet("omero", "biomero", "both")]
    [string]$dbType = "both",
    [string]$serverContainerName = "",
    [string]$volumeName = "",
    [string]$metabaseFolder = "",
    [switch]$configOnly = $false,
    [switch]$dataOnly = $false,
    [switch]$parallel = $false,
    [switch]$skipDatabase = $false,
    [switch]$skipServer = $false,
    [switch]$skipMetabase = $false,
    [switch]$help
)

# Show help if requested
if ($help) {
    Write-Output @"
OMERO MASTER BACKUP SCRIPT - PowerShell

USAGE:
  .\backup_and_restore\backup_master.ps1 [OPTIONS]

DESCRIPTION:
  Master backup script that coordinates both database and server backups with a synchronized timestamp.
  This ensures data consistency by backing up both components at the same point in time.

PARAMETERS:
  -envFile <path>           Path to .env file (default: .\.env)
  -outputDirectory <dir>    Output directory (default: .\backup_and_restore\backups)
  -dbType <type>            Database to backup: omero|biomero|both (default: both)
  -serverContainerName <n>  Override OMERO server container name (default: nl-biomero-omeroserver-1)
  -volumeName <n>           Override OMERO volume name (default: nl-biomero_omero)
  -metabaseFolder <path>    Override metabase folder path (default: .\metabase)
  -configOnly               Export config to /OMERO/backup/omero.config only (server backup)
  -dataOnly                 Backup only data store, skip config export (server backup)
  -parallel                 Run backups in parallel instead of sequentially
  -skipDatabase             Skip database backup (database only)
  -skipServer               Skip server backup (server only)
  -skipMetabase             Skip Metabase backup (metabase only)
  -help                     Show this help message

EXAMPLES:
  # Full synchronized backup (default - sequential execution)
  .\backup_and_restore\backup_master.ps1

  # Parallel backup for faster execution
  .\backup_and_restore\backup_master.ps1 -parallel

  # Only OMERO database + server (skip BIOMERO database and Metabase)
  .\backup_and_restore\backup_master.ps1 -dbType omero -skipMetabase

  # Only export fresh server config, backup both databases and Metabase
  .\backup_and_restore\backup_master.ps1 -configOnly

  # Database and Metabase only (useful for regular automated backups)
  .\backup_and_restore\backup_master.ps1 -skipServer

  # Server only with custom settings
  .\backup_and_restore\backup_master.ps1 -skipDatabase -skipMetabase -serverContainerName "custom-omero"

  # Skip Metabase backup (if not using dashboards/custom config)
  .\backup_and_restore\backup_master.ps1 -skipMetabase

BACKUP CONSISTENCY:
  This script generates a single timestamp and passes it to both backup operations,
  ensuring that the database and server backups represent the same point in time.

SEQUENTIAL VS PARALLEL:
  - Sequential (default): Database first, then server (safer, less resource intensive)
  - Parallel: Both backups run simultaneously for speed (use if you have sufficient resources)

OUTPUT FILES:
  Database: {database}.{timestamp}.pg_dump
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

if ($skipServer -and ($configOnly -or $dataOnly)) {
    Write-Error "Cannot use -configOnly or -dataOnly when skipping server backup."
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

# Set default output directory
$finalOutputDir = if ($outputDirectory) { $outputDirectory } else { ".\backup_and_restore\backups" }

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
Write-Output "  Database Type: $dbType"
Write-Output "  Execution Mode: $(if ($parallel) { 'Parallel' } else { 'Sequential' })"
Write-Output ""

if ($skipDatabase) {
    Write-Output "  [SKIP] Database backup: SKIPPED"
} else {
    Write-Output "  [DB] Database backup: ENABLED ($dbType)"
}

if ($skipServer) {
    Write-Output "  [SKIP] Server backup: SKIPPED"
} else {
    $serverMode = if ($configOnly) { "config only" } elseif ($dataOnly) { "data only" } else { "full backup" }
    Write-Output "  [SERVER] Server backup: ENABLED ($serverMode)"
}

if ($skipMetabase) {
    Write-Output "  [SKIP] Metabase backup: SKIPPED"
} else {
    Write-Output "  [METABASE] Metabase backup: ENABLED"
}
Write-Output ""

# Build command arguments - Use hashtables for proper parameter splatting
$dbArgs = @{
    'envFile' = $absoluteEnvFile
    'outputDirectory' = $absoluteOutputDir
    'timestamp' = $timestamp
    'dbType' = $dbType
}

$serverArgs = @{
    'envFile' = $absoluteEnvFile
    'outputDirectory' = $absoluteOutputDir
    'timestamp' = $timestamp
}

$metabaseArgs = @{
    'envFile' = $absoluteEnvFile
    'outputDirectory' = $absoluteOutputDir
    'timestamp' = $timestamp
}

# Server-specific arguments
if ($serverContainerName) {
    $serverArgs['containerName'] = $serverContainerName
}
if ($volumeName) {
    $serverArgs['volumeName'] = $volumeName
}
if ($configOnly) {
    $serverArgs['configOnly'] = $true
}
if ($dataOnly) {
    $serverArgs['dataOnly'] = $true
}

# Metabase-specific arguments
if ($metabaseFolder) {
    $metabaseArgs['metabaseFolder'] = $metabaseFolder
}

# Job tracking variables
$dbJob = $null
$serverJob = $null
$metabaseJob = $null
$dbSuccess = $null  # Changed: Start as null instead of true
$serverSuccess = $null  # Changed: Start as null instead of true
$metabaseSuccess = $null

try {
    if ($parallel) {
        # PARALLEL EXECUTION
        Write-Output "Starting parallel backup process..."
        Write-Output ""
        
        # Start background jobs with parameters embedded in script blocks
        if (-not $skipDatabase) {
            Write-Output "[DB] Starting database backup job..."
            $dbJob = Start-Job -ScriptBlock {
                param($scriptPath, $envFile, $outputDir, $timestamp, $dbType)
                & $scriptPath -envFile $envFile -outputDirectory $outputDir -timestamp $timestamp -dbType $dbType
            } -ArgumentList $dbScript, $absoluteEnvFile, $absoluteOutputDir, $timestamp, $dbType
        }
        
        if (-not $skipServer) {
            Write-Output "[SERVER] Starting server backup job..."
            
            # Build server command with proper parameter handling
            $serverJob = Start-Job -ScriptBlock {
                param($scriptPath, $envFile, $outputDir, $timestamp, $containerName, $volumeName, $configOnly, $dataOnly)
                
                # Build arguments properly as individual parameters
                $jobArgs = @{
                    'envFile' = $envFile
                    'outputDirectory' = $outputDir
                    'timestamp' = $timestamp
                }
                
                if ($containerName) { $jobArgs['containerName'] = $containerName }
                if ($volumeName) { $jobArgs['volumeName'] = $volumeName }
                if ($configOnly) { $jobArgs['configOnly'] = $true }
                if ($dataOnly) { $jobArgs['dataOnly'] = $true }
                
                & $scriptPath @jobArgs
            } -ArgumentList $serverScript, $absoluteEnvFile, $absoluteOutputDir, $timestamp, $serverContainerName, $volumeName, $configOnly, $dataOnly
        }

        if (-not $skipMetabase) {
            Write-Output "[METABASE] Starting Metabase backup job..."
            
            $metabaseJob = Start-Job -ScriptBlock {
                param($scriptPath, $envFile, $outputDir, $timestamp, $metabaseFolder)
                
                $jobArgs = @{
                    'envFile' = $envFile
                    'outputDirectory' = $outputDir
                    'timestamp' = $timestamp
                }
                
                if ($metabaseFolder) { $jobArgs['metabaseFolder'] = $metabaseFolder }
                
                & $scriptPath @jobArgs
            } -ArgumentList $metabaseScript, $absoluteEnvFile, $absoluteOutputDir, $timestamp, $metabaseFolder
        }

        Write-Output ""
        Write-Output "Waiting for backup jobs to complete..."
        
        # Monitor job progress
        $jobs = @()
        if ($dbJob) { $jobs += $dbJob }
        if ($serverJob) { $jobs += $serverJob }
        if ($metabaseJob) { $jobs += $metabaseJob }
        
        if ($jobs.Count -gt 0) {
            while ($jobs | Where-Object { $_.State -eq "Running" }) {
                Start-Sleep -Seconds 10
                Write-Output "   $(Get-Date -Format 'HH:mm:ss') - $(($jobs | Where-Object { $_.State -eq 'Running' }).Count) job(s) still running..."
            }
        }
        
        Write-Output ""
        
        # Collect results
        if ($dbJob) {
            Write-Output "[DB] DATABASE BACKUP RESULTS:"
            Write-Output "-----------------------------"
            
            # Wait for job to complete and get exit code
            Wait-Job -Job $dbJob | Out-Null
            $dbResult = Receive-Job -Job $dbJob -Keep
            
            # Much more aggressive error detection for parallel jobs
            $dbJobFailed = $true  # Start as failed, only mark success if we're sure
            
            # Check for obvious failure indicators first
            if ($dbResult -match "Cannot validate argument|ParameterBindingValidationException") {
                Write-Output "[FAIL] Parameter validation error detected"
            } elseif ($dbResult -match "\[FAIL\]|ERROR|Failed to|not found|not running") {
                Write-Output "[FAIL] Error keywords detected in output"
            } elseif ($dbJob.State -eq "Failed") {
                Write-Output "[FAIL] PowerShell job state indicates failure"
            } elseif ($dbJob.ChildJobs[0].JobStateInfo.State -eq "Failed") {
                Write-Output "[FAIL] Child job state indicates failure"
            } elseif ($dbResult -match "\[SUCCESS\].*completed successfully") {
                # Only mark as success if we see explicit success message
                $dbJobFailed = $false
                Write-Output "[OK] Success message detected in output"
            } else {
                Write-Output "[FAIL] No clear success indicator found"
            }
            
            $dbSuccess = -not $dbJobFailed
            
            Write-Output $dbResult
            
            if ($dbSuccess) {
                Write-Output "[OK] Database backup completed successfully"
            } else {
                Write-Output "[FAIL] Database backup failed"
            }
            Write-Output ""
        }
        
        if ($serverJob) {
            Write-Output "[SERVER] SERVER BACKUP RESULTS:"
            Write-Output "-------------------------------"
            
            # Wait for job to complete and get exit code
            Wait-Job -Job $serverJob | Out-Null
            $serverResult = Receive-Job -Job $serverJob -Keep
            
            # Much more aggressive error detection for parallel jobs
            $serverJobFailed = $true  # Start as failed, only mark success if we're sure
            
            # Check for obvious failure indicators first
            if ($serverResult -match "Cannot validate argument|ParameterBindingValidationException") {
                Write-Output "[FAIL] Parameter validation error detected"
            } elseif ($serverResult -match "\[FAIL\]|ERROR|Failed to|not found|not running") {
                Write-Output "[FAIL] Error keywords detected in output"
            } elseif ($serverJob.State -eq "Failed") {
                Write-Output "[FAIL] PowerShell job state indicates failure"
            } elseif ($serverJob.ChildJobs[0].JobStateInfo.State -eq "Failed") {
                Write-Output "[FAIL] Child job state indicates failure"
            } elseif ($serverResult -match "\[SUCCESS\].*completed successfully") {
                # Only mark as success if we see explicit success message
                $serverJobFailed = $false
                Write-Output "[OK] Success message detected in output"
            } else {
                Write-Output "[FAIL] No clear success indicator found"
            }
            
            $serverSuccess = -not $serverJobFailed
            
            Write-Output $serverResult
            
            if ($serverSuccess) {
                Write-Output "[OK] Server backup completed successfully"
            } else {
                Write-Output "[FAIL] Server backup failed"
            }
            Write-Output ""
        }
        
        if ($metabaseJob) {
            Write-Output "[METABASE] METABASE BACKUP RESULTS:"
            Write-Output "----------------------------------"
            
            # Wait for job to complete and get exit code
            Wait-Job -Job $metabaseJob | Out-Null
            $metabaseResult = Receive-Job -Job $metabaseJob -Keep
            
            # Much more aggressive error detection for parallel jobs
            $metabaseJobFailed = $true  # Start as failed, only mark success if we're sure
            
            # Check for obvious failure indicators first
            if ($metabaseResult -match "Cannot validate argument|ParameterBindingValidationException") {
                Write-Output "[FAIL] Parameter validation error detected"
            } elseif ($metabaseResult -match "\[FAIL\]|ERROR|Failed to|not found|not running") {
                Write-Output "[FAIL] Error keywords detected in output"
            } elseif ($metabaseJob.State -eq "Failed") {
                Write-Output "[FAIL] PowerShell job state indicates failure"
            } elseif ($metabaseJob.ChildJobs[0].JobStateInfo.State -eq "Failed") {
                Write-Output "[FAIL] Child job state indicates failure"
            } elseif ($metabaseResult -match "\[SUCCESS\].*completed successfully") {
                # Only mark as success if we see explicit success message
                $metabaseJobFailed = $false
                Write-Output "[OK] Success message detected in output"
            } else {
                Write-Output "[FAIL] No clear success indicator found"
            }
            
            $metabaseSuccess = -not $metabaseJobFailed
            
            Write-Output $metabaseResult
            
            if ($metabaseSuccess) {
                Write-Output "[OK] Metabase backup completed successfully"
            } else {
                Write-Output "[FAIL] Metabase backup failed"
            }
            Write-Output ""
        }
        
    } else {
        # SEQUENTIAL EXECUTION (DEFAULT)
        Write-Output "Starting sequential backup process..."
        Write-Output ""
        
        # Step 1: Database backup
        if (-not $skipDatabase) {
            Write-Output "[DB] STEP 1: Database Backup"
            Write-Output "-----------------------------"
            
            # Execute database backup and capture all output
            try {
                $dbResult = & $dbScript @dbArgs 2>&1
                $dbExitCode = $LASTEXITCODE
                
                # Check for validation errors in the output
                if ($dbResult -match "Cannot validate argument|ParameterBindingValidationException") {
                    $dbSuccess = $false
                    Write-Output "[FAIL] Parameter validation error in database backup"
                } elseif ($dbExitCode -ne 0) {
                    $dbSuccess = $false
                    Write-Output "[FAIL] Database backup failed with exit code: $dbExitCode"
                } elseif ($dbResult -match "\[FAIL\]|ERROR") {
                    $dbSuccess = $false
                    Write-Output "[FAIL] Database backup reported failure"
                } else {
                    $dbSuccess = $true
                }
                
                Write-Output $dbResult
                
            } catch {
                $dbSuccess = $false
                Write-Output "[FAIL] Database backup threw exception: $($_.Exception.Message)"
            }
            
            if ($dbSuccess) {
                Write-Output "[OK] Database backup completed successfully"
            } else {
                Write-Output "[FAIL] Database backup failed"
            }
            Write-Output ""
        }

        # Step 2: Metabase backup (only if database succeeded or was skipped)
        if (-not $skipMetabase -and ($dbSuccess -or $skipDatabase)) {
            Write-Output "[METABASE] STEP 2: Metabase Backup"
            Write-Output "---------------------------------"
            
            # Execute Metabase backup and capture all output
            try {
                $metabaseResult = & $metabaseScript @metabaseArgs 2>&1
                $metabaseExitCode = $LASTEXITCODE
                
                # Check for validation errors in the output
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
        if (-not $skipServer -and (($dbSuccess -or $skipDatabase) -and ($metabaseSuccess -or $skipMetabase))) {
            Write-Output "[SERVER] STEP 3: Server Backup"
            Write-Output "-------------------------------"
            
            # Execute server backup and capture all output
            try {
                $serverResult = & $serverScript @serverArgs 2>&1
                $serverExitCode = $LASTEXITCODE
                
                # Check for validation errors in the output
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
    }
    
} finally {
    # Cleanup background jobs
    if ($dbJob) {
        Remove-Job -Job $dbJob -Force -ErrorAction SilentlyContinue
    }
    if ($serverJob) {
        Remove-Job -Job $serverJob -Force -ErrorAction SilentlyContinue
    }
    if ($metabaseJob) {
        Remove-Job -Job $metabaseJob -Force -ErrorAction SilentlyContinue
    }
}

# Final summary
Write-Output "BACKUP SUMMARY"
Write-Output "=============="
Write-Output "  Timestamp: $timestamp"
Write-Output "  Execution: $(if ($parallel) { 'Parallel' } else { 'Sequential' })"

if (-not $skipDatabase) {
    if ($dbSuccess -eq $true) {
        Write-Output "  [DB] Database: [OK] SUCCESS"
        
        # Show expected database files
        $dbFiles = @()
        if ($dbType -eq "both" -or $dbType -eq "omero") {
            $dbFiles += "omero.$timestamp.pg_dump"
        }
        if ($dbType -eq "both" -or $dbType -eq "biomero") {
            $dbFiles += "biomero.$timestamp.pg_dump"
        }
        $dbFiles | ForEach-Object { Write-Output "    * $_" }
        
    } elseif ($dbSuccess -eq $false) {
        Write-Output "  [DB] Database: [FAIL] FAILED"
    } else {
        Write-Output "  [DB] Database: [SKIP] NOT ATTEMPTED"
    }
}

if (-not $skipServer) {
    if ($serverSuccess -eq $true) {
        Write-Output "  [SERVER] Server: [OK] SUCCESS"
        Write-Output "    * omero-server.$timestamp.tar.gz"
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
Write-Output "Files Created:"
$backupFiles = Get-ChildItem -Path $absoluteOutputDir -Filter "*$timestamp*" -ErrorAction SilentlyContinue
if ($backupFiles -and $backupFiles.Count -gt 0) {
    $actualFilesCreated = $true
    $backupFiles | ForEach-Object {
        $sizeMB = [math]::Round($_.Length / 1MB, 2)
        Write-Output "  [OK] $($_.Name) ($sizeMB MB)"
    }
} else {
    $actualFilesCreated = $false
    Write-Output "  [WARN] No files found with timestamp $timestamp"
}

Write-Output ""

# Determine overall success - Fix success logic
$overallSuccess = $true

# Check database success
if (-not $skipDatabase) {
    if ($dbSuccess -ne $true) { 
        $overallSuccess = $false
        if ($dbSuccess -eq $false) {
            Write-Output "  [REASON] Database backup failed"
        } else {
            Write-Output "  [REASON] Database backup was not attempted"
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