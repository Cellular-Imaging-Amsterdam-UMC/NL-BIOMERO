param(
    [string]$backupFile = "",
    [string]$restoreDirectory = "",
    [string]$backupDirectory = ".\backup_and_restore\backups",
    [switch]$force = $false,
    [switch]$help
)

# Show help if requested
if ($help) {
    Write-Output @"
METABASE RESTORE SCRIPT - PowerShell

USAGE:
  .\backup_and_restore\restore_metabase.ps1 [OPTIONS]

DESCRIPTION:
  Restores a Metabase backup from a tar.gz archive. This will restore all
  dashboards, data sources, user configurations, and custom settings.

PARAMETERS:
  -backupFile <path>        Path to metabase backup file (.tar.gz) (auto-detects latest if not specified)
  -restoreDirectory <dir>   Directory to extract to (default: current directory)
  -backupDirectory <dir>    Directory to search for latest backup (default: .\backup_and_restore\backups)
  -force                    Overwrite existing files without confirmation
  -help                     Show this help message

EXAMPLES:
  # Auto-detect latest backup, extract to .\metabase
  .\backup_and_restore\restore_metabase.ps1

  # Restore specific backup to .\metabase
  .\backup_and_restore\restore_metabase.ps1 -backupFile ".\backups\metabase.2025-01-15_10-30-00-UTC.tar.gz"

  # Restore to specific directory (creates that directory)
  .\backup_and_restore\restore_metabase.ps1 -restoreDirectory "C:\MyRestore"

  # Force overwrite existing files
  .\backup_and_restore\restore_metabase.ps1 -force

IMPORTANT NOTES:
  - Stop the Metabase container before restoring
  - The restored folder structure must match docker-compose.yml volume mounts
  - Make sure to backup current metabase folder before restoring
  - Restart Metabase container after successful restore

WARNING:
  This will overwrite the existing Metabase configuration and data!
  Ensure you have a backup of the current state before proceeding.

For more information, see: backup_and_restore/README.md
"@
    exit 0
}

# Auto-detect latest backup if not specified
if (-not $backupFile) {
    $latestBackup = Get-ChildItem -Path $backupDirectory -Filter "metabase.*.tar.gz" -ErrorAction SilentlyContinue | 
                    Sort-Object LastWriteTime -Descending | 
                    Select-Object -First 1
    
    if ($latestBackup) {
        $backupFile = $latestBackup.FullName
        Write-Output "Auto-detected latest backup: $($latestBackup.Name)"
    } else {
        Write-Output "[FAIL] No Metabase backup files found in $backupDirectory"
        Write-Output "       Available files:"
        $allFiles = Get-ChildItem -Path $backupDirectory -ErrorAction SilentlyContinue
        if ($allFiles) {
            $allFiles | ForEach-Object { Write-Output "         $($_.Name)" }
        } else {
            Write-Output "         (directory empty or doesn't exist)"
        }
        Write-Output ""
        Write-Output "       Use: -backupFile <path-to-backup.tar.gz>"
        Write-Output "       Run with -help for more information"
        exit 1
    }
}

# Validate required parameters (now that we have auto-detection)
if (-not $backupFile) {
    Write-Output "[FAIL] Backup file parameter is required"
    Write-Output "       Use: -backupFile <path-to-backup.tar.gz>"
    Write-Output "       Run with -help for more information"
    exit 1
}

# Set default values
$extractToDirectory = if ($restoreDirectory) { $restoreDirectory } else { "." }

# Create extract directory if it doesn't exist
if ($restoreDirectory -and (-not (Test-Path $extractToDirectory))) {
    New-Item -ItemType Directory -Path $extractToDirectory -Force | Out-Null
}

# Validate backup file exists
if (-not (Test-Path $backupFile)) {
    Write-Output "[FAIL] Backup file not found: $backupFile"
    Write-Output "       Please check the file path and try again"
    exit 1
}

$absoluteBackupFile = (Resolve-Path $backupFile).Path

# Show configuration
Write-Output "METABASE RESTORE CONFIGURATION"
Write-Output "=============================="
Write-Output "  Backup File: $absoluteBackupFile"
Write-Output "  Extract To: $extractToDirectory"
Write-Output "  Force Overwrite: $(if ($force) { 'YES' } else { 'NO' })"
Write-Output ""

# Check if we'll overwrite existing metabase folder
$targetMetabasePath = Join-Path $extractToDirectory "metabase"
if (Test-Path $targetMetabasePath) {
    Write-Output "[WARN] metabase folder already exists: $targetMetabasePath"
    
    if (-not $force) {
        Write-Output ""
        Write-Output "Existing folder contents:"
        $existingContents = Get-ChildItem -Path $targetMetabasePath -ErrorAction SilentlyContinue
        if ($existingContents) {
            $existingContents | ForEach-Object {
                $sizeMB = if ($_.PSIsContainer) { "DIR" } else { [math]::Round($_.Length / 1MB, 2).ToString() + " MB" }
                Write-Output "  * $($_.Name) ($sizeMB)"
            }
        } else {
            Write-Output "  (empty or inaccessible)"
        }
        
        Write-Output ""
        $response = Read-Host "Overwrite existing metabase folder? [y/N]"
        if ($response -ne "y" -and $response -ne "Y") {
            Write-Output "[CANCELLED] Restore cancelled by user"
            exit 0
        }
    }
    
    Write-Output "  [ACTION] Removing existing metabase folder..."
    try {
        Remove-Item -Path $targetMetabasePath -Recurse -Force
        Write-Output "  [OK] Existing folder removed"
    } catch {
        Write-Output "[FAIL] Could not remove existing folder: $($_.Exception.Message)"
        exit 1
    }
}

# Check if tar is available
$tarCommand = Get-Command tar -ErrorAction SilentlyContinue
if (-not $tarCommand) {
    Write-Output "[FAIL] tar command not found"
    Write-Output "       tar is required for extracting compressed archives"
    Write-Output "       Please install tar or use Windows 10/11 which includes it"
    exit 1
}

# Verify backup file integrity first
Write-Output "Verifying backup file integrity..."
try {
    $verifyArgs = @("-tzf", $absoluteBackupFile)
    $archiveContents = & tar @verifyArgs 2>&1
    $verifyExitCode = $LASTEXITCODE
    
    if ($verifyExitCode -ne 0) {
        Write-Output "[FAIL] Backup file appears to be corrupted or invalid"
        Write-Output "       tar verification failed with exit code: $verifyExitCode"
        exit 1
    }
    
    Write-Output "  [OK] Backup file integrity verified"
    Write-Output ""
    Write-Output "Archive contents:"
    $archiveContents | ForEach-Object { Write-Output "  * $_" }
    
} catch {
    Write-Output "[FAIL] Error verifying backup file: $($_.Exception.Message)"
    exit 1
}

Write-Output ""
Write-Output "Starting Metabase restore..."
Write-Output "  Source: $absoluteBackupFile"
Write-Output "  Target: $targetMetabasePath"
Write-Output ""

try {
    # Extract archive - tar will create the metabase folder
    Push-Location $extractToDirectory
    
    Write-Output "Extracting archive..."
    $extractArgs = @(
        "-xzf"
        $absoluteBackupFile
    )
    
    & tar @extractArgs
    $extractExitCode = $LASTEXITCODE
    
} catch {
    Write-Output "[FAIL] Error extracting archive: $($_.Exception.Message)"
    exit 1
} finally {
    Pop-Location
}

# Check if extraction was successful
if ($extractExitCode -ne 0) {
    Write-Output "[FAIL] tar extraction failed with exit code: $extractExitCode"
    exit 1
}

# Verify the extracted folder exists
if (-not (Test-Path $targetMetabasePath)) {
    Write-Output "[FAIL] Extracted metabase folder not found at: $targetMetabasePath"
    Write-Output "       The backup may not contain the expected folder structure"
    exit 1
}

# Show restored contents
Write-Output ""
Write-Output "METABASE RESTORE RESULTS"
Write-Output "========================"
Write-Output "  [OK] Restore completed successfully"
Write-Output "  [OK] Location: $targetMetabasePath"
Write-Output ""

Write-Output "Restored folder contents:"
$restoredContents = Get-ChildItem -Path $targetMetabasePath -ErrorAction SilentlyContinue
if ($restoredContents) {
    $restoredContents | ForEach-Object {
        $sizeMB = if ($_.PSIsContainer) { "DIR" } else { [math]::Round($_.Length / 1MB, 2).ToString() + " MB" }
        Write-Output "  * $($_.Name) ($sizeMB)"
    }
} else {
    Write-Output "  [WARN] Restored folder appears to be empty"
}

Write-Output ""
Write-Output "[SUCCESS] Metabase restore completed successfully!"
Write-Output ""
Write-Output "Next Steps:"
Write-Output "  1. Ensure the Metabase container is stopped"
Write-Output "  2. Verify docker-compose.yml volume mount points to restored folder"
Write-Output "  3. Start the Metabase container: docker-compose up -d metabase"
Write-Output "  4. Check Metabase logs: docker-compose logs metabase"
Write-Output "  5. Verify dashboards and configurations are restored"
Write-Output ""
Write-Output "Container commands:"
Write-Output "  docker-compose stop metabase"
Write-Output "  docker-compose up -d metabase"
Write-Output "  docker-compose logs -f metabase"

exit 0
