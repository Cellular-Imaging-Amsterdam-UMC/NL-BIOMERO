param(
    [string]$envFile = ".\.env",
    [string]$outputDirectory = "",
    [string]$timestamp = "",
    [string]$metabaseFolder = "",
    [switch]$help
)

# Show help if requested
if ($help) {
    Write-Output @"
METABASE BACKUP SCRIPT - PowerShell

USAGE:
  .\backup_and_restore\backup_metabase.ps1 [OPTIONS]

DESCRIPTION:
  Backs up the Metabase data folder containing the H2 database, configurations,
  and dashboard definitions. This preserves all custom dashboards, data sources,
  and user configurations.

PARAMETERS:
  -envFile <path>           Path to .env file (default: .\.env)
  -outputDirectory <dir>    Output directory (default: .\backup_and_restore\backups)
  -timestamp <timestamp>    Custom timestamp (default: auto-generated)
  -metabaseFolder <path>    Path to metabase folder (default: .\metabase)
  -help                     Show this help message

EXAMPLES:
  # Standard backup
  .\backup_and_restore\backup_metabase.ps1

  # Backup to specific directory
  .\backup_and_restore\backup_metabase.ps1 -outputDirectory "C:\Backups"

  # Use custom timestamp (for coordination with other backups)
  .\backup_and_restore\backup_metabase.ps1 -timestamp "2025-01-15_10-30-00-UTC"

  # Custom metabase folder location
  .\backup_and_restore\backup_metabase.ps1 -metabaseFolder ".\custom-metabase"

OUTPUT FILES:
  metabase.{timestamp}.tar.gz - Contains entire metabase folder

WHAT'S BACKED UP:
  - metabase.db (H2 database with dashboards, users, settings)
  - metabase.db.mv.db (H2 database file)
  - metabase.db.trace.db (H2 trace file, if present)
  - Any custom configuration files
  - Plugin files (if any)

For more information, see: backup_and_restore/README.md
"@
    exit 0
}

# Set default values
$finalOutputDir = if ($outputDirectory) { $outputDirectory } else { ".\backup_and_restore\backups" }
$finalMetabaseFolder = if ($metabaseFolder) { $metabaseFolder } else { ".\metabase" }
$finalTimestamp = if ($timestamp) { $timestamp } else { Get-Date -Format "yyyy-MM-dd_HH-mm-ss-UTC" }

# Create output directory
New-Item -ItemType Directory -Path $finalOutputDir -Force | Out-Null
$absoluteOutputDir = (Resolve-Path $finalOutputDir).Path

# Validate metabase folder exists
if (-not (Test-Path $finalMetabaseFolder)) {
    Write-Output "[FAIL] Metabase folder not found: $finalMetabaseFolder"
    Write-Output "       Expected location based on docker-compose.yml mount"
    Write-Output "       Ensure NL-BIOMERO is deployed or specify correct path with -metabaseFolder"
    exit 1
}

$absoluteMetabaseFolder = (Resolve-Path $finalMetabaseFolder).Path

# Show configuration
Write-Output "METABASE BACKUP CONFIGURATION"
Write-Output "============================="
Write-Output "  Timestamp: $finalTimestamp"
Write-Output "  Metabase Folder: $absoluteMetabaseFolder"
Write-Output "  Output Directory: $absoluteOutputDir"
Write-Output ""

# Check metabase folder contents
Write-Output "Metabase folder contents:"
$metabaseContents = Get-ChildItem -Path $absoluteMetabaseFolder -ErrorAction SilentlyContinue
if ($metabaseContents) {
    $metabaseContents | ForEach-Object {
        $sizeMB = if ($_.PSIsContainer) { "DIR" } else { [math]::Round($_.Length / 1MB, 2).ToString() + " MB" }
        Write-Output "  * $($_.Name) ($sizeMB)"
    }
} else {
    Write-Output "  [WARN] Metabase folder is empty or inaccessible"
}
Write-Output ""

# Check if tar is available
$tarCommand = Get-Command tar -ErrorAction SilentlyContinue
if (-not $tarCommand) {
    Write-Output "[FAIL] tar command not found"
    Write-Output "       tar is required for creating compressed archives"
    Write-Output "       Please install tar or use Windows 10/11 which includes it"
    exit 1
}

# Define output file
$backupFileName = "metabase.$finalTimestamp.tar.gz"
$backupFilePath = Join-Path $absoluteOutputDir $backupFileName

Write-Output "Starting Metabase backup..."
Write-Output "  Source: $absoluteMetabaseFolder"
Write-Output "  Target: $backupFilePath"
Write-Output ""

try {
    # Change to parent directory of metabase folder for relative paths in archive
    $metabaseFolderName = Split-Path -Leaf $absoluteMetabaseFolder
    $metabaseParentDir = Split-Path -Parent $absoluteMetabaseFolder
    
    # Create tar archive with compression
    # Use relative path to avoid full path structure in archive
    Push-Location $metabaseParentDir
    
    Write-Output "Creating compressed archive..."
    $tarArgs = @(
        "-czf"
        $backupFilePath
        $metabaseFolderName
    )
    
    & tar @tarArgs
    $tarExitCode = $LASTEXITCODE
    
} catch {
    Write-Output "[FAIL] Error creating archive: $($_.Exception.Message)"
    exit 1
} finally {
    Pop-Location
}

# Check if backup was successful
if ($tarExitCode -ne 0) {
    Write-Output "[FAIL] tar command failed with exit code: $tarExitCode"
    exit 1
}

if (-not (Test-Path $backupFilePath)) {
    Write-Output "[FAIL] Backup file was not created: $backupFilePath"
    exit 1
}

# Get backup file size
$backupFile = Get-Item $backupFilePath
$backupSizeMB = [math]::Round($backupFile.Length / 1MB, 2)

Write-Output ""
Write-Output "METABASE BACKUP RESULTS"
Write-Output "======================="
Write-Output "  [OK] Backup completed successfully"
Write-Output "  [OK] File: $backupFileName"
Write-Output "  [OK] Size: $backupSizeMB MB"
Write-Output "  [OK] Location: $absoluteOutputDir"
Write-Output ""

# Verify archive contents (quick check)
Write-Output "Archive contents verification:"
try {
    $tarListArgs = @("-tzf", $backupFilePath)
    $archiveContents = & tar @tarListArgs 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Output "  [OK] Archive is readable and contains:"
        $archiveContents | ForEach-Object { Write-Output "    * $_" }
    } else {
        Write-Output "  [WARN] Could not verify archive contents"
    }
} catch {
    Write-Output "  [WARN] Could not verify archive contents: $($_.Exception.Message)"
}

Write-Output ""
Write-Output "[SUCCESS] Metabase backup completed successfully!"
Write-Output ""

exit 0
