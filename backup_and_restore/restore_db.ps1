param(
    [string]$envFile = ".\.env",
    [string]$dumpPath = "",
    [string]$volumeName = "",
    [string]$localFolder = "",
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
  Restore NL-BIOMERO PostgreSQL database dumps to new Docker volumes or local folders.

PARAMETERS:
  -envFile <path>           Path to .env file (default: .\.env)
  -dumpPath <path>          Specific dump file path (overrides auto-detection)
  -volumeName <name>        Create Docker volume with this name (auto-generated if not specified)
  -localFolder <path>       Create local folder instead of Docker volume (mutually exclusive with volumeName)
  -dbName <name>           Override database name (from .env)
  -user <username>         Override database user (from .env)
  -password <password>     Override database password (from .env)
  -dbType <type>          Database to restore: omero|biomero|both (default: both)
  -postgresVersion <ver>  Postgres version (default: 16, e.g., 11, 12, 13, 14, 15, 16)
  -backupDirectory <dir>  Directory to search for latest dumps (default: .\backup_and_restore\backups)
  -help                   Show this help message

EXAMPLES:
  # Restore to Docker volumes (default)
  .\backup_and_restore\restore_db.ps1

  # Restore to local folders
  .\backup_and_restore\restore_db.ps1 -localFolder "C:\postgres-data"

  # Restore specific dump to local folder
  .\backup_and_restore\restore_db.ps1 -dumpPath ".\backup.pg_dump" -dbType omero -localFolder ".\restored-db"

OUTPUT:
  Docker volumes: {dbtype}-{timestamp}-pg{version}
  Local folders: {path}\{dbtype}-{timestamp}-pg{version}

USAGE IN DOCKER-COMPOSE:
  # For Docker volumes
  database:
    volumes:
      - omero-2025-07-24-14-06-06-pg16:/var/lib/postgresql/data

  # For local folders  
  database:
    volumes:
      - ./restored-db/omero-2025-07-24-14-06-06-pg16:/var/lib/postgresql/data

For more information, see: backup_and_restore/README.md
"@
    exit 0
}

# Validate mutually exclusive parameters
if ($volumeName -and $localFolder) {
    Write-Error "Error: -volumeName and -localFolder are mutually exclusive. Choose one."
    exit 1
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
    param($dbType, $dumpPath, $volumeName, $localFolder, $dbName, $user, $password, $postgresVersion)
    
    # Auto-configure based on database type
    if ($dbType -eq "biomero") {
        $finalDbName = if ($dbName) { $dbName } else { $envHash['BIOMERO_POSTGRES_DB'] }
        $finalUser = if ($user) { $user } else { $envHash['BIOMERO_POSTGRES_USER'] }
        $finalPassword = if ($password) { $password } else { $envHash['BIOMERO_POSTGRES_PASSWORD'] }
    } else {
        # Default to OMERO
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
    }

    # Generate target name/path
    if ($localFolder) {
        # LOCAL FOLDER MODE
        $descriptiveName = Get-DescriptiveVolumeName $dumpPath $dbType $postgresVersion
        $finalTargetPath = Join-Path $localFolder $descriptiveName
        $targetType = "local folder"
        
        # Check if folder already exists
        if (Test-Path $finalTargetPath) {
            Write-Error "Local folder '$finalTargetPath' already exists! Please remove it first or choose a different path."
            return $false
        }
        
        # Create parent directory
        $parentDir = Split-Path $finalTargetPath -Parent
        if (-not (Test-Path $parentDir)) {
            New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
        }
        
        # Create the target directory
        New-Item -ItemType Directory -Path $finalTargetPath -Force | Out-Null
        
        # Convert to absolute path for Docker
        $finalTargetPath = (Resolve-Path $finalTargetPath).Path
        $mountString = "${finalTargetPath}:/var/lib/postgresql/data"
        
    } else {
        # DOCKER VOLUME MODE
        if ($volumeName) {
            $finalVolumeName = $volumeName
        } else {
            $finalVolumeName = Get-DescriptiveVolumeName $dumpPath $dbType $postgresVersion
        }
        $targetType = "Docker volume"
        
        # Check if volume already exists
        $existingVolume = docker volume ls -q --filter "name=^${finalVolumeName}$" 2>$null
        if ($existingVolume) {
            Write-Error "Volume '$finalVolumeName' already exists! Please remove it first with: docker volume rm $finalVolumeName"
            return $false
        }
        
        # Create volume
        Write-Host "Creating volume: $finalVolumeName"
        docker volume create $finalVolumeName | Out-Null
        $mountString = "${finalVolumeName}:/var/lib/postgresql/data"
        $finalTargetPath = $finalVolumeName  # For display purposes
    }

    # Verify dump file exists
    if (-not (Test-Path $dumpPath)) {
        Write-Error "Dump file not found: $dumpPath"
        return $false
    }
    
    Write-Host "Restoring $dbType database:"
    Write-Host "  From: $dumpPath"
    Write-Host "  To $targetType`: $finalTargetPath"
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
    
    # Start postgres container in background
    Write-Host "Starting PostgreSQL container..."
    $containerId = docker run -d `
        -v "$absoluteDumpPath`:/dump.pg_dump" `
        -v "$mountString" `
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
            $jobCountOutput = docker exec $containerId psql -U $finalUser -d $finalDbName -t -c "SELECT COUNT(*) FROM workflowtracker_events;" 2>$null
            $tableName = "workflowtracker_events"
        } else {
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
                Write-Host "[SUCCESS] $dbType restore successful: $finalTargetPath ($([math]::Round($dumpSize/1MB, 2)) MB, $jobCount $tableName records)"
                
                # Return the final target for use in summary
                return @{
                    success = $true
                    target = $finalTargetPath
                    type = $targetType
                    mount = if ($localFolder) { $mountString } else { $finalVolumeName }
                }
            }
        }

        Write-Error "No data was restored! Could not verify $tableName count from: '$jobCountText'"
        return @{ success = $false }
        
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
    
    # Handle single target for both databases
    if ($volumeName) {
        $omeroTarget = "$volumeName-omero"
        $biomeroTarget = "$volumeName-biomero"
        $targetParam = "volumeName"
    } elseif ($localFolder) {
        $omeroTarget = $localFolder
        $biomeroTarget = $localFolder  
        $targetParam = "localFolder"
    } else {
        $omeroTarget = ""
        $biomeroTarget = ""
        $targetParam = "volumeName"  # Default
    }
    
    if ($targetParam -eq "volumeName") {
        $omeroResult = Restore-Single "omero" $dumpPath $omeroTarget "" $dbName $user $password $postgresVersion
        $biomeroResult = Restore-Single "biomero" "" $biomeroTarget "" "" "" "" $postgresVersion
    } else {
        $omeroResult = Restore-Single "omero" $dumpPath "" $omeroTarget $dbName $user $password $postgresVersion  
        $biomeroResult = Restore-Single "biomero" "" "" $biomeroTarget "" "" "" $postgresVersion
    }
    
    Write-Output ""
    if ($omeroResult.success -and $biomeroResult.success) {
        Write-Output "*** Both restores completed successfully! ***"
        Write-Output ""
        Write-Output "Targets created:"
        Write-Output "  OMERO: $($omeroResult.target) ($($omeroResult.type))"
        Write-Output "  BIOMERO: $($biomeroResult.target) ($($biomeroResult.type))"
        
        if ($localFolder) {
            Write-Output ""
            Write-Output "To use in docker-compose.yml:"
            Write-Output "  database:"
            Write-Output "    volumes:"
            Write-Output "      - $($omeroResult.mount)"
            Write-Output "  biomero-database:"  
            Write-Output "    volumes:"
            Write-Output "      - $($biomeroResult.mount)"
        }
    } else {
        Write-Error "*** One or more restores FAILED! ***"
        exit 1
    }
} else {
    # Single database restore
    Write-Output "Restoring single database ($dbType) to Postgres $postgresVersion"
    Write-Output ""
    
    if ($localFolder) {
        $result = Restore-Single $dbType $dumpPath "" $localFolder $dbName $user $password $postgresVersion
    } else {
        $result = Restore-Single $dbType $dumpPath $volumeName "" $dbName $user $password $postgresVersion
    }
    
    if (-not $result.success) {
        exit 1
    } else {
        Write-Output ""
        Write-Output "*** Restore completed successfully! ***"
        Write-Output "Target created: $($result.target) ($($result.type))"
        
        if ($localFolder) {
            Write-Output ""
            Write-Output "To use in docker-compose.yml:"
            Write-Output "  database:"
            Write-Output "    volumes:"
            Write-Output "      - $($result.mount)"
        }
    }
}