param(
    [string]$envFile = ".\.env",
    [string]$dumpPath = "",
    [string]$volumeName = "",
    [string]$dbName = "",
    [string]$user = "",
    [string]$password = "",
    [ValidateSet("omero", "biomero", "both")]
    [string]$dbType = "both",
    [string]$postgresVersion = "16",
    [string]$backupDirectory = ".\backup_and_restore\backups",
    [switch]$help
)

# Show help if requested
if ($help) {
    Write-Output @"
DATABASE RESTORE SCRIPT - PowerShell

USAGE:
  .\backup_and_restore\restore_db.ps1 [OPTIONS]

DESCRIPTION:
  Restore NL-BIOMERO PostgreSQL database dumps to new Docker volumes with optional Postgres version upgrade.

PARAMETERS:
  -envFile <path>           Path to .env file (default: .\.env)
  -dumpPath <path>          Specific dump file path (overrides auto-detection)
  -volumeName <name>        Override volume name (auto-generated: database-restored, database-biomero-restored)
  -dbName <name>           Override database name (from .env)
  -user <username>         Override database user (from .env)
  -password <password>     Override database password (from .env)
  -dbType <type>          Database to restore: omero|biomero|both (default: both)
  -postgresVersion <ver>  Postgres version (default: 16, e.g., 11, 12, 13, 14, 15, 16)
  -backupDirectory <dir>  Directory to search for latest dumps (default: .\backup_and_restore\backups)
  -help                   Show this help message

EXAMPLES:
  # Restore both databases from latest dumps to Postgres 16 (default)
  .\backup_and_restore\restore_db.ps1

  # Restore specific dump file
  .\backup_and_restore\restore_db.ps1 -dumpPath ".\backup.pg_dump" -dbType omero

  # Restore to Postgres 13
  .\backup_and_restore\restore_db.ps1 -postgresVersion 13

  # Custom configuration
  .\backup_and_restore\restore_db.ps1 -volumeName "my-restored-db" -user "admin" -password "secret"

OUTPUT VOLUMES:
  Default volume names: database-restored, database-biomero-restored

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

# Function to find latest dump file
function Find-LatestDump {
    param($backupDir, $dbType)
    
    if (-not (Test-Path $backupDir)) {
        Write-Error "Backup directory not found: $backupDir"
        return $null
    }
    
    # Look for dump files matching pattern: {dbname}.{timestamp}.pg_dump
    $pattern = if ($dbType -eq "omero") { "omero.*.pg_dump" } else { "biomero.*.pg_dump" }
    $dumpFiles = Get-ChildItem -Path $backupDir -Filter $pattern | Sort-Object LastWriteTime -Descending
    
    if ($dumpFiles.Count -eq 0) {
        Write-Error "No $dbType dump files found in $backupDir"
        return $null
    }
    
    # FIXED: Use Write-Host instead of Write-Output so it doesn't get captured as return value
    Write-Host "Found latest $dbType dump: $($dumpFiles[0].Name)" -ForegroundColor Green
    return $dumpFiles[0].FullName
}

# Function to generate descriptive volume name from dump file
function Get-DescriptiveVolumeName {
    param($dumpPath, $dbType, $postgresVersion)
    
    # Extract timestamp from dump filename
    # Example: "omero.2025-07-24_14-06-06-UTC.pg_dump" -> "2025-07-24-14-06-06"
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($dumpPath)
    if ($fileName -match '(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})') {
        $timestamp = $matches[1] -replace '_', '-'
        return "$dbType-$timestamp-pg$postgresVersion"
    }
    
    # Fallback to old naming if pattern doesn't match
    return "database-$dbType-restored"
}

# Function to restore one database
function Restore-Single {
    param($dbType, $dumpPath, $volumeName, $dbName, $user, $password, $postgresVersion)
    
    # Auto-configure based on database type
    if ($dbType -eq "biomero") {
        $finalVolumeName = if ($volumeName) { $volumeName } else { Get-DescriptiveVolumeName $dumpPath $dbType $postgresVersion }
        $finalDbName = if ($dbName) { $dbName } else { $envHash['BIOMERO_POSTGRES_DB'] }
        $finalUser = if ($user) { $user } else { $envHash['BIOMERO_POSTGRES_USER'] }
        $finalPassword = if ($password) { $password } else { $envHash['BIOMERO_POSTGRES_PASSWORD'] }
    } else {
        # Default to OMERO
        $finalVolumeName = if ($volumeName) { $volumeName } else { Get-DescriptiveVolumeName $dumpPath $dbType $postgresVersion }
        $finalDbName = if ($dbName) { $dbName } else { $envHash['POSTGRES_DB'] }
        $finalUser = if ($user) { $user } else { $envHash['POSTGRES_USER'] }
        $finalPassword = if ($password) { $password } else { $envHash['POSTGRES_PASSWORD'] }
    }

    # Find dump file if not specified (needed for auto-naming)
    if (-not $dumpPath) {
        $dumpPath = Find-LatestDump $backupDirectory $dbType
        if (-not $dumpPath) {
            Write-Error "Could not find dump file for $dbType"
            return $false
        }
        # Update volume name now that we have the dump path
        if (-not $volumeName) {
            $finalVolumeName = Get-DescriptiveVolumeName $dumpPath $dbType $postgresVersion
        }
    }

    # CHECK IF VOLUME ALREADY EXISTS - QUIT IF IT DOES
    $existingVolume = docker volume ls -q --filter "name=^${finalVolumeName}$" 2>$null
    if ($existingVolume) {
        Write-Error "Volume '$finalVolumeName' already exists! Please remove it first with: docker volume rm $finalVolumeName"
        return $false
    }

    # Verify dump file exists
    if (-not (Test-Path $dumpPath)) {
        Write-Error "Dump file not found: $dumpPath"
        return $false
    }
    
    Write-Host "Restoring $dbType database:"
    Write-Host "  From: $dumpPath"
    Write-Host "  To volume: $finalVolumeName"
    Write-Host "  Database: $finalDbName"
    Write-Host "  User: $finalUser"
    Write-Host "  Postgres: $postgresVersion"
    
    # Convert Windows path to absolute path for Docker
    try {
        $absoluteDumpPath = (Resolve-Path $dumpPath).Path
    } catch {
        Write-Error "Could not resolve dump path: $dumpPath"
        return $false
    }
    
    Write-Host "Creating volume: $finalVolumeName"
    docker volume create $finalVolumeName | Out-Null
    
    # Start postgres container in background
    Write-Host "Starting PostgreSQL container..."
    $containerId = docker run -d `
        -v "$absoluteDumpPath`:/dump.pg_dump" `
        -v "$finalVolumeName`:/var/lib/postgresql/data" `
        -e "POSTGRES_PASSWORD=$finalPassword" `
        "postgres:$postgresVersion" 2>$null

    # Clean up the container ID (remove any console error messages)
    $containerId = $containerId | Where-Object { $_ -notmatch "failed to get console mode" } | Select-Object -First 1

    if (-not $containerId -or $containerId.Length -lt 10) {
        Write-Error "Failed to start PostgreSQL container - invalid container ID: '$containerId'"
        return $false
    }
    
    try {
        Write-Host "Waiting for PostgreSQL to be ready..."
        Start-Sleep 15
        
        # Wait for postgres to be ready
        $maxAttempts = 30
        $attempts = 0
        do {
            $ready = docker exec $containerId pg_isready -U postgres 2>$null
            if ($LASTEXITCODE -eq 0) { break }
            Start-Sleep 2
            $attempts++
        } while ($attempts -lt $maxAttempts)
        
        if ($attempts -ge $maxAttempts) {
            Write-Error "PostgreSQL failed to start after $maxAttempts attempts"
            return $false
        }
        
        Write-Host "Creating user and database..."
        docker exec $containerId psql -U postgres -c "CREATE USER $finalUser WITH PASSWORD '$finalPassword';" | Out-Null
        docker exec $containerId createdb -U postgres -O $finalUser $finalDbName | Out-Null
        
        Write-Host "Restoring dump file..."
        docker exec $containerId pg_restore -U $finalUser -Fc -d $finalDbName /dump.pg_dump
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error "pg_restore failed with exit code: $LASTEXITCODE"
            Write-Error "This usually means the volume already contained data or there were constraint conflicts."
            return $false
        }
        
        Write-Host "Verifying restored data..."
        if ($dbType -eq "biomero") {
            # Check workflowtracker_events which should have records
            $jobCountOutput = docker exec $containerId psql -U $finalUser -d $finalDbName -t -c "SELECT COUNT(*) FROM workflowtracker_events;" 2>$null
            $tableName = "workflowtracker_events"
        } else {
            # OMERO uses job table
            $jobCountOutput = docker exec $containerId psql -U $finalUser -d $finalDbName -t -c "SELECT COUNT(*) FROM job;" 2>$null
            $tableName = "job"
        }

        # Extract just the number from the output
        $jobCountText = ($jobCountOutput | Out-String).Trim()

        if ($jobCountText -match '\b(\d+)\b') {
            $jobCount = $matches[1]
            Write-Host "$tableName records restored: $jobCount"
            
            if ([int]$jobCount -gt 0) {
                $dumpSize = (Get-Item $dumpPath).Length
                Write-Host "$dbType restore successful: $finalVolumeName ($([math]::Round($dumpSize/1MB, 2)) MB, $jobCount $tableName records)"
                return $true
            }
        }

        Write-Error "No data was restored! Could not verify $tableName count from: '$jobCountText'"
        return $false
        
    } finally {
        # Always clean up the container
        Write-Host "Cleaning up container..."
        docker stop $containerId | Out-Null
        docker rm $containerId | Out-Null
    }
}

# Handle "both" option or single database
if ($dbType -eq "both") {
    Write-Output "Restoring both databases to Postgres $postgresVersion"
    Write-Output ""
    
    # Handle single volumeName for both databases
    if ($volumeName) {
        $omeroVolume = "$volumeName-omero"
        $biomeroVolume = "$volumeName-biomero"
    } else {
        $omeroVolume = ""  # Let function auto-generate
        $biomeroVolume = "" # Let function auto-generate
    }
    
    $omeroSuccess = Restore-Single "omero" $dumpPath $omeroVolume $dbName $user $password $postgresVersion
    Write-Output ""
    $biomeroSuccess = Restore-Single "biomero" "" $biomeroVolume "" "" "" $postgresVersion
    
    Write-Output ""
    if ($omeroSuccess -and $biomeroSuccess) {
        Write-Output "*** Both restores completed successfully! ***"
        Write-Output ""
        Write-Output "Volumes created:"
        # Show the actual volume names that were created
        $actualOmeroVolume = if ($volumeName) { "$volumeName-omero" } else { Get-DescriptiveVolumeName (Find-LatestDump $backupDirectory "omero") "omero" $postgresVersion }
        $actualBiomeroVolume = if ($volumeName) { "$volumeName-biomero" } else { Get-DescriptiveVolumeName (Find-LatestDump $backupDirectory "biomero") "biomero" $postgresVersion }
        Write-Output "  $actualOmeroVolume"
        Write-Output "  $actualBiomeroVolume"
    } else {
        Write-Error "*** One or more restores FAILED! ***"
        Write-Error "OMERO success: $omeroSuccess"
        Write-Error "BIOMERO success: $biomeroSuccess"
        exit 1
    }
} else {
    # Single database restore
    Write-Output "Restoring single database ($dbType) to Postgres $postgresVersion"
    Write-Output ""
    
    $success = Restore-Single $dbType $dumpPath $volumeName $dbName $user $password $postgresVersion
    if (-not $success) {
        exit 1
    } else {
        Write-Output ""
        Write-Output "*** Restore completed successfully! ***"
        $restoredVolume = if ($volumeName) { $volumeName } else { if ($dbType -eq "biomero") { "database-biomero-restored" } else { "database-restored" } }
        Write-Output "Volume created: $restoredVolume"
    }
}