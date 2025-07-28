# Database Backup & Restore Scripts

**One-command backup and restore for NL-BIOMERO PostgreSQL databases with PostgreSQL version upgrades.**

## 🚀 Core Value & Default Behavior

### **Backup** (from running containers)
```powershell
# Windows - Backs up BOTH databases from running containers
.\backup_and_restore\backup_db.ps1

# Linux/macOS - Auto-detects Docker/Podman
./backup_and_restore/backup_db.sh
```
**Creates:** `omero.2025-07-24_14-30-15-UTC.pg_dump` + `biomero.2025-07-24_14-30-15-UTC.pg_dump`

### **Restore** (to fresh containers)
```powershell
# Windows - Restores BOTH databases to PostgreSQL 16 (latest)
.\backup_and_restore\restore_db.ps1

# Linux/macOS - Auto-detects Docker/Podman
./backup_and_restore/restore_db.sh
```
**Creates:** Descriptive Docker volumes ready for `docker-compose.yml`

### **PostgreSQL Version Upgrades** 🔥
```powershell
# Upgrade from PostgreSQL 11 → 16
.\backup_and_restore\restore_db.ps1 -postgresVersion 16

# Any version supported: 11, 12, 13, 14, 15, 16
```

### **Local Filesystem Restore** (New!)
```powershell
# Restore to local folders instead of Docker volumes
.\backup_and_restore\restore_db.ps1 -localFolder "C:\my-databases"

# Easy to backup, move, archive as regular files
```

---

## 🎯 Key Features

- ✅ **Zero configuration** - Reads from `.env`, auto-detects containers
- ✅ **One command for both databases** - OMERO + BIOMERO together
- ✅ **PostgreSQL version upgrades** - Seamless 11→16 migrations
- ✅ **Smart naming** - Timestamped volumes/folders you can identify
- ✅ **Flexible targets** - Docker volumes OR local filesystem
- ✅ **Cross-platform** - Windows PowerShell + Linux/macOS Bash
- ✅ **Container engine agnostic** - Docker and Podman support (Linux)
- ✅ **Production ready** - Error handling, validation, cleanup

---

## Scripts Available

- **`backup_db.ps1`** - PowerShell (Windows) - Docker only
- **`backup_db.sh`** - Bash (Linux/macOS) - Docker/Podman auto-detect
- **`restore_db.ps1`** - PowerShell (Windows) - Docker only
- **`restore_db.sh`** - Bash (Linux/macOS) - Docker/Podman auto-detect

---

## Common Use Cases

### 1. **Regular Backup** (Production)
```powershell
# Backup running databases daily
.\backup_and_restore\backup_db.ps1 -outputDirectory "\\backup-server\daily"
```

### 2. **Development Restore**
```powershell
# Quick restore for testing
.\backup_and_restore\restore_db.ps1 -volumeName "dev-test"
```

### 3. **PostgreSQL Upgrade** (11 → 16)
```powershell
# 1. Backup current database (PostgreSQL 11)
.\backup_and_restore\backup_db.ps1

# 2. Restore to PostgreSQL 16
.\backup_and_restore\restore_db.ps1 -postgresVersion 16

# 3. Update docker-compose.yml to use new volume names and update postgres container to v16
```

### 4. **Migrate to Local Filesystem**
```powershell
# Restore to local folders for easy file management
.\backup_and_restore\restore_db.ps1 -localFolder "C:\postgres-data"
```

### 5. **Disaster Recovery**
```powershell
# Restore specific backup
.\backup_and_restore\restore_db.ps1 -dumpPath "\\archive\omero.2025-01-15_10-00-00-UTC.pg_dump" -dbType omero
```

---

## Container Engine Support

**Linux/macOS:** Auto-detects and prefers Podman, falls back to Docker

**Windows:** Docker Desktop required

```bash
# Force specific engine on Linux
./backup_and_restore/backup_db.sh --containerEngine podman
./backup_and_restore/restore_db.sh --containerEngine docker
```

---

## Output Examples

### Backup Files
```
backup_and_restore/backups/
├── omero.2025-07-24_14-30-15-UTC.pg_dump     (10.5 MB)
└── biomero.2025-07-24_14-30-15-UTC.pg_dump   (0.04 MB)
```

### Restore Targets

**Docker volumes** (default):
```
omero-2025-07-24-14-30-15-pg16
biomero-2025-07-24-14-30-15-pg16
```

**Local folders** (with `-localFolder`):
```
C:\postgres-data\
├── omero-2025-07-24-14-30-15-pg16\
└── biomero-2025-07-24-14-30-15-pg16\
```

---

## Environment Configuration

The scripts automatically read from `.env` file:

```env
# OMERO Database
POSTGRES_DB=omero
POSTGRES_USER=omero
POSTGRES_PASSWORD=omero

# BIOMERO Database  
BIOMERO_POSTGRES_DB=biomero
BIOMERO_POSTGRES_USER=biomero
BIOMERO_POSTGRES_PASSWORD=biomero
```

**Default container names:**
- OMERO: `nl-biomero-database-1`
- BIOMERO: `nl-biomero-database-biomero-1`

---

## Quick Help

```powershell
# Windows - Built-in help
.\backup_and_restore\backup_db.ps1 -help
.\backup_and_restore\restore_db.ps1 -help

# Linux/macOS - Built-in help
./backup_and_restore/backup_db.sh --help
./backup_and_restore/restore_db.sh --help
```

---

## Requirements

- **Windows:** Docker Desktop + PowerShell 5.1+
- **Linux/macOS:** Docker or Podman + Bash 4.0+
- **For backup:** Running NL-BIOMERO containers
- **For restore:** Internet access to pull PostgreSQL images

---

## Complete Parameter Reference

### Backup Scripts

#### PowerShell (`backup_db.ps1`)
```powershell
# All parameters with examples
.\backup_and_restore\backup_db.ps1 `
    -envFile ".\.env" `                          # Config file location
    -containerName "custom-database-1" `        # Override OMERO container name
    -dbName "custom_omero" `                     # Override database name
    -user "admin" `                              # Override database user
    -outputDirectory "C:\Backups\Daily" `       # Custom backup location
    -dbType "omero"                              # omero|biomero|both (default: both)

# Individual database backups
.\backup_and_restore\backup_db.ps1 -dbType omero
.\backup_and_restore\backup_db.ps1 -dbType biomero

# Custom container configuration
.\backup_and_restore\backup_db.ps1 -containerName "my-omero-db" -user "postgres"

# Production backup with custom directory
.\backup_and_restore\backup_db.ps1 -outputDirectory "\\backup-server\nl-biomero\$(Get-Date -Format 'yyyy-MM-dd')"
```

#### Bash (`backup_db.sh`)
```bash
# All parameters with examples
./backup_and_restore/backup_db.sh \
    --envFile "./.env" \                         # Config file location
    --containerName "custom-database-1" \       # Override OMERO container name
    --dbName "custom_omero" \                    # Override database name
    --user "admin" \                             # Override database user
    --outputDirectory "/backup/daily" \         # Custom backup location
    --dbType "omero" \                           # omero|biomero|both (default: both)
    --containerEngine "podman"                  # docker|podman (auto-detected)

# Force container engine
./backup_and_restore/backup_db.sh --containerEngine docker
./backup_and_restore/backup_db.sh --containerEngine podman

# Production backup
./backup_and_restore/backup_db.sh --outputDirectory "/mnt/backup-server/$(date +%Y-%m-%d)"
```

### Restore Scripts

#### PowerShell (`restore_db.ps1`)
```powershell
# All parameters with examples
.\backup_and_restore\restore_db.ps1 `
    -envFile ".\.env" `                          # Config file location
    -dumpPath ".\custom-backup.pg_dump" `       # Specific dump file (overrides auto-detection)
    -volumeName "my-restored-db" `               # Custom Docker volume name
    -localFolder "C:\PostgresData" `            # Restore to local filesystem (mutually exclusive with volumeName)
    -dbName "custom_omero" `                     # Override database name
    -user "admin" `                              # Override database user
    -password "secret123" `                      # Override database password
    -dbType "omero" `                            # omero|biomero|both (default: both)
    -postgresVersion "13" `                      # PostgreSQL version: 11,12,13,14,15,16 (default: 16)
    -backupDirectory "C:\CustomBackups"         # Directory to search for dumps

# PostgreSQL version upgrades
.\backup_and_restore\restore_db.ps1 -postgresVersion 11  # Restore to PostgreSQL 11
.\backup_and_restore\restore_db.ps1 -postgresVersion 13  # Restore to PostgreSQL 13
.\backup_and_restore\restore_db.ps1 -postgresVersion 16  # Restore to PostgreSQL 16 (default)

# Docker volume targets (default)
.\backup_and_restore\restore_db.ps1 -volumeName "test-db"                    # Custom volume name
.\backup_and_restore\restore_db.ps1                                          # Auto-generated: omero-2025-07-24-14-30-15-pg16

# Local filesystem targets  
.\backup_and_restore\restore_db.ps1 -localFolder "C:\MyDatabases"           # Creates subdirectories
.\backup_and_restore\restore_db.ps1 -localFolder "\\server\databases"      # Network location

# Specific dump files
.\backup_and_restore\restore_db.ps1 -dumpPath ".\omero.2025-01-15_10-00-00-UTC.pg_dump" -dbType omero
.\backup_and_restore\restore_db.ps1 -dumpPath "\\archive\old-backup.pg_dump" -dbType biomero -postgresVersion 11

# Custom database configuration
.\backup_and_restore\restore_db.ps1 -user "postgres" -password "admin123" -dbName "production_omero"

# Production restore from archive
.\backup_and_restore\restore_db.ps1 `
    -dumpPath "\\backup-server\2025-01-15\omero.2025-01-15_10-00-00-UTC.pg_dump" `
    -dbType omero `
    -volumeName "production-restore-$(Get-Date -Format 'MMdd')" `
    -postgresVersion 16
```

#### Bash (`restore_db.sh`)
```bash
# All parameters with examples
./backup_and_restore/restore_db.sh \
    --envFile "./.env" \                         # Config file location
    --dumpPath "./custom-backup.pg_dump" \      # Specific dump file
    --volumeName "my-restored-db" \              # Custom Docker volume name
    --localFolder "/var/lib/postgres-data" \    # Restore to local filesystem
    --dbName "custom_omero" \                    # Override database name
    --user "admin" \                             # Override database user
    --password "secret123" \                     # Override database password
    --dbType "omero" \                           # omero|biomero|both (default: both)
    --postgresVersion "13" \                     # PostgreSQL version (default: 16)
    --backupDirectory "/backup/archive" \       # Directory to search for dumps
    --containerEngine "podman"                  # docker|podman (auto-detected)

# PostgreSQL version upgrades
./backup_and_restore/restore_db.sh --postgresVersion 11
./backup_and_restore/restore_db.sh --postgresVersion 16

# Container engine selection
./backup_and_restore/restore_db.sh --containerEngine docker
./backup_and_restore/restore_db.sh --containerEngine podman

# Local filesystem restore
./backup_and_restore/restore_db.sh --localFolder "/mnt/databases"
./backup_and_restore/restore_db.sh --localFolder "./restored-data"

# Production scenarios
./backup_and_restore/restore_db.sh \
    --dumpPath "/backup/archive/omero.2025-01-15_10-00-00-UTC.pg_dump" \
    --dbType omero \
    --volumeName "production-restore-$(date +%m%d)" \
    --postgresVersion 16 \
    --containerEngine podman
```

### Parameter Combinations

```powershell
# INVALID - Mutually exclusive
.\backup_and_restore\restore_db.ps1 -volumeName "test" -localFolder "C:\data"  # ❌ Error

# VALID - Volume with custom name
.\backup_and_restore\restore_db.ps1 -volumeName "my-test-db" -dbType omero    # ✅ Creates Docker volume

# VALID - Local folder with auto-naming
.\backup_and_restore\restore_db.ps1 -localFolder "C:\databases"              # ✅ Creates C:\databases\omero-2025-07-24-14-30-15-pg16\

# VALID - Both databases to same base location
.\backup_and_restore\restore_db.ps1 -localFolder "C:\databases"              # ✅ Creates separate subdirectories
```

---

## Integration with docker-compose.yml

### Docker Volumes (Default)
```yaml
# After restore, update your docker-compose.yml named volumes
# Define the named volume(s) to persist data to the host computer
volumes:
  database:
    external: true
    # name: nl-biomero_database
    name: omero-2025-07-24-14-06-06-pg16 # Restored database
  database-biomero:
    external: true
    name: biomero-2025-07-24-14-06-06-pg16 # Restored database
```

### Local Folders (with -localFolder)
```yaml
# Mount local folders directly at the services level
services:
  database:
    volumes:
      - ./restored-data/omero-2025-07-24-14-30-15-pg16:/var/lib/postgresql/data
  
  database-biomero:
    volumes:
      - ./restored-data/biomero-2025-07-24-14-30-15-pg16:/var/lib/postgresql/data
```

---

## Troubleshooting

**Container not found:** Check `docker ps` or `podman ps` for running containers  
**Permission denied:** Ensure container engine has access to dump/target paths  
**Small backup file:** Verify container names and database credentials in `.env`  
**Volume exists:** Remove existing volume with `docker volume rm <name>`  
**Restore failed:** Check PostgreSQL logs with `docker logs <container-id>`

**Check volumes:** `docker volume ls` or `podman volume ls`  
**Check local folders:** Ensure parent directory exists and has write permissions