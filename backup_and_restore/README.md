# Database Backup & Restore Scripts

Scripts for backing up and restoring NL-BIOMERO PostgreSQL databases (OMERO and BIOMERO).

## Scripts

- **`backup_db.ps1`** - PowerShell (Windows)
- **`backup_db.sh`** - Bash (Linux/macOS)
- **`restore_db.ps1`** - PowerShell (Windows)

## Quick Start

### Backup
```powershell
# Backup both databases (default)
.\backup_and_restore\backup_db.ps1

# Single database
.\backup_and_restore\backup_db.ps1 -dbType omero
```

### Restore
```powershell
# Restore both from latest backups to Postgres 16 (default)
.\backup_and_restore\restore_db.ps1

# Restore to Postgres 13
.\backup_and_restore\restore_db.ps1 -postgresVersion 13

# Custom volume name
.\backup_and_restore\restore_db.ps1 -volumeName "test-restore"
```

## Key Features

- ✅ **Auto-detect latest dumps** - Finds most recent backup files
- ✅ **Both databases by default** - Backup/restore OMERO + BIOMERO together
- ✅ **Shared timestamps** - Matching backups belong together
- ✅ **Version upgrade** - Restore to newer Postgres versions
- ✅ **Smart volume naming** - Creates `database-restored`, `database-biomero-restored`
- ✅ **Error handling** - Validates operations and file sizes

## Common Examples

```powershell
# === BACKUP ===
# Default: both databases
.\backup_and_restore\backup_db.ps1

# Custom directory
.\backup_and_restore\backup_db.ps1 -outputDirectory "C:\MyBackups"

# Override container/credentials
.\backup_and_restore\backup_db.ps1 -containerName "my-db" -user "admin"

# === RESTORE ===
# Default: both databases, latest dumps, Postgres 16
.\backup_and_restore\restore_db.ps1

# Specific dump file
.\backup_and_restore\restore_db.ps1 -dumpPath ".\omero.2025-07-24_14-30-15-UTC.pg_dump" -dbType omero

# Custom setup
.\backup_and_restore\restore_db.ps1 -volumeName "my-test" -postgresVersion 13 -user "postgres" -password "secret"
```

## Output Files

**Backup files:** `{database}.{timestamp}.pg_dump`
```
omero.2025-07-24_14-30-15-UTC.pg_dump
biomero.2025-07-24_14-30-15-UTC.pg_dump
```

**Restore volumes:** `database-restored`, `database-biomero-restored`

## Environment Variables

Reads from `.env` file:
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` (OMERO)
- `BIOMERO_POSTGRES_DB`, `BIOMERO_POSTGRES_USER`, `BIOMERO_POSTGRES_PASSWORD` (BIOMERO)

## Help

All scripts have built-in help with full parameter lists:

```powershell
.\backup_and_restore\backup_db.ps1 -help
.\backup_and_restore\restore_db.ps1 -help
```

## Requirements

- Docker Desktop (Windows) or Docker (Linux)
- Running NL-BIOMERO containers (for backup)
- PowerShell 5.1+ (Windows)

## Troubleshooting

**Check containers:** `docker ps`  
**Check volumes:** `docker volume ls`  
**File too small:** Check container names and credentials  
**Permission errors:** Ensure Docker has file access
