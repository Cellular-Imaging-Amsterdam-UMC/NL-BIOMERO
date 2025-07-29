# Database & Server Backup & Restore Scripts

**One-command backup and restore for NL-BIOMERO PostgreSQL databases and OMERO server configuration with PostgreSQL version upgrades.**

For information on OMERO.server backup and restore, please take a look at [OME recommendations](https://omero.readthedocs.io/en/stable/sysadmins/server-backup-and-restore.html) on this topic first. The scripts in our repo will help to combine such backup & restore strategies with the containerized environment promoted in NL-BIOMERO. 

They can also be used to bridge from existing deployments to containerized deployments (and vice versa), by backing up in one and restoring into the other.

## 🚀 Core Value & Default Behavior

### **Database Backup** (from running containers)
```powershell
# Windows - Backs up BOTH databases from running containers
.\backup_and_restore\backup_db.ps1

# Linux/macOS - Auto-detects Docker/Podman
./backup_and_restore/backup_db.sh
```
**Creates:** `omero.2025-07-24_14-30-15-UTC.pg_dump` + `biomero.2025-07-24_14-30-15-UTC.pg_dump`

### **Server Backup** (OMERO data store + configuration)
```powershell
# Windows - Backs up complete OMERO server (data + config)
.\backup_and_restore\backup_server.ps1

# Linux/macOS - Auto-detects Docker/Podman
./backup_and_restore/backup_server.sh
```
**Creates:** `omero-server.2025-07-24_14-30-15-UTC.tar.gz` (includes data + config)

### **Database Restore** (to fresh containers)
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
- ✅ **Complete system backup** - Databases + OMERO server + configuration
- ✅ **PostgreSQL version upgrades** - Seamless 11→16 migrations
- ✅ **Smart naming** - Timestamped volumes/folders you can identify
- ✅ **Flexible targets** - Docker volumes OR local filesystem
- ✅ **Cross-platform** - Windows PowerShell + Linux/macOS Bash
- ✅ **Container engine agnostic** - Docker and Podman support (Linux)
- ✅ **Production ready** - Error handling, validation, cleanup
- ✅ **Configuration hierarchy** - Multiple ways to restore OMERO config

---

## Scripts Available

### Database Scripts
- **`backup_db.ps1`** - PowerShell (Windows) - Docker only
- **`backup_db.sh`** - Bash (Linux/macOS) - Docker/Podman auto-detect
- **`restore_db.ps1`** - PowerShell (Windows) - Docker only
- **`restore_db.sh`** - Bash (Linux/macOS) - Docker/Podman auto-detect

### Server Scripts
- **`backup_server.ps1`** - PowerShell (Windows) - Docker only
- **`backup_server.sh`** - Bash (Linux/macOS) - Docker/Podman auto-detect
- **`restore_server.ps1`** - PowerShell (Windows) - Docker only
- **`restore_server.sh`** - Bash (Linux/macOS) - Docker/Podman auto-detect

---

## OMERO Configuration Restoration 🔧

OMERO configuration is restored using a **hierarchy system** where later options override earlier ones:

### 1. **Backup Configuration** (Automatic) - **Priority: Lowest**
```bash
# Automatically loaded by 00-restore-config.sh during container startup
/OMERO/backup/omero.config
```
- ✅ **Restored automatically** from server backups
- ✅ **Zero configuration** required
- ✅ **Version-controlled** with your data

### 2. **Custom Config Files** - **Priority: Medium**
```bash
# Loaded by 50-config.py during container startup
/opt/omero/server/config/*.omero
```
**Mount custom config files:**
```yaml
# docker-compose.yml
services:
  omeroserver:
    volumes:
      - "./config/custom-ldap.omero:/opt/omero/server/config/02-custom-ldap.omero:ro"
      - "./config/production.omero:/opt/omero/server/config/03-production.omero:ro"
```

### 3. **Environment Variables** - **Priority: Highest**
```yaml
# docker-compose.yml - CONFIG_ variables override everything
services:
  omeroserver:
    environment:
      CONFIG_omero_db_host: database
      CONFIG_omero_db_user: ${POSTGRES_USER}
      CONFIG_omero_db_pass: ${POSTGRES_PASSWORD}
      CONFIG_omero_db_name: ${POSTGRES_DB}
      CONFIG_omero_scripts_timeout: 604800000
      CONFIG_omero_ldap_config: true
      CONFIG_omero_ldap_urls: "ldap://10.10.88.57:389"
```

**Environment Variable Format:**
```bash
# OMERO property: omero.ldap.config
# Env variable:   CONFIG_omero_ldap_config

# OMERO property: omero.db.host  
# Env variable:   CONFIG_omero_db_host

# OMERO property: omero.web.public.enabled
# Env variable:   CONFIG_omero_web_public__enabled  # Note: double underscore for dots in property names
```

### Configuration Examples

#### Development Override
```yaml
# Override database connection for development
services:
  omeroserver:
    environment:
      CONFIG_omero_db_host: dev-database
      CONFIG_omero_logging_level: 20  # More verbose logging
```

#### Production Secrets
```yaml
# .env file
LDAP_PASSWORD=MySecretPassword
OMERO_ADMIN_EMAIL=admin@company.com

# docker-compose.yml
services:
  omeroserver:
    environment:
      CONFIG_omero_ldap_password: ${LDAP_PASSWORD}
      CONFIG_omero_mail_smtp_host: mail.company.com
      CONFIG_omero_mail_from: ${OMERO_ADMIN_EMAIL}
```

#### Custom LDAP via Config File
```omero
# ./config/ldap.omero
config set -- omero.ldap.config true
config set -- omero.ldap.urls ldap://company-dc.local:389
config set -- omero.ldap.base 'OU=Users,DC=company,DC=local'
config set -- omero.ldap.username 'CN=omero_ldap,OU=Service Accounts,DC=company,DC=local'
```

```yaml
# Mount the config file
services:
  omeroserver:
    volumes:
      - "./config/ldap.omero:/opt/omero/server/config/02-ldap.omero:ro"
```

---

## Common Use Cases

### 1. **Regular Backup** (Production)
```powershell
# Backup databases and server daily
.\backup_and_restore\backup_db.ps1 -outputDirectory "\\backup-server\daily"
.\backup_and_restore\backup_server.ps1 -outputDirectory "\\backup-server\daily"
```

### 2. **Complete System Restore**
```powershell
# 1. Restore databases
.\backup_and_restore\restore_db.ps1 -postgresVersion 16

# 2. Restore OMERO server
.\backup_and_restore\restore_server.ps1

# 3. Update docker-compose.yml volume names
# 4. Start containers - configuration loads automatically
```

### 3. **Development Environment**
```powershell
# Quick restore for testing with custom config
.\backup_and_restore\restore_db.ps1 -volumeName "dev-test"
.\backup_and_restore\restore_server.ps1 -volumeName "dev-omero"

# Override with development settings via ENV vars
```

### 4. **PostgreSQL Upgrade** (11 → 16)
```powershell
# 1. Backup current system (PostgreSQL 11)
.\backup_and_restore\backup_db.ps1
.\backup_and_restore\backup_server.ps1

# 2. Restore to PostgreSQL 16
.\backup_and_restore\restore_db.ps1 -postgresVersion 16
.\backup_and_restore\restore_server.ps1

# 3. Update docker-compose.yml postgres: "16" and volume names
```

### 5. **Production Migration**
```powershell
# Restore with production overrides
.\backup_and_restore\restore_server.ps1 -volumeName "production-omero"

# Set production config via environment variables
# CONFIG_omero_db_host, CONFIG_omero_ldap_*, etc.
```

---

## Server Backup & Restore Examples

### Server Backup Commands
```powershell
# Full server backup (data + fresh config export)
.\backup_and_restore\backup_server.ps1

# Export fresh config only (before making changes)  
.\backup_and_restore\backup_server.ps1 -configOnly

# Backup data without updating config
.\backup_and_restore\backup_server.ps1 -dataOnly

# Custom output directory
.\backup_and_restore\backup_server.ps1 -outputDirectory "\\backup-server\omero\$(Get-Date -Format 'yyyy-MM-dd')"
```

### Server Restore Commands
```powershell
# Restore latest backup to Docker volume
.\backup_and_restore\restore_server.ps1

# Restore specific backup
.\backup_and_restore\restore_server.ps1 -backupPath ".\backups\omero-server.2025-07-24_14-30-00-UTC.tar.gz"

# Restore to local filesystem
.\backup_and_restore\restore_server.ps1 -targetPath "C:\omero-restored"

# Custom volume name
.\backup_and_restore\restore_server.ps1 -volumeName "production-omero-restored"

# Restore with custom configuration override
.\backup_and_restore\restore_server.ps1 -backupPath ".\backups\omero-server.2025-07-24_14-30-00-UTC.tar.gz" -configFile ".\config\production.omero.config"

# Development environment with custom config
.\backup_and_restore\restore_server.ps1 -configFile ".\config\dev.omero.config" -volumeName "dev-omero"

# Restore old backup with updated LDAP settings
.\backup_and_restore\restore_server.ps1 -backupPath "old-system.tar.gz" -configFile ".\config\new-ldap.omero.config"
```

---

## Container Engine Support

**Linux/macOS:** Auto-detects and prefers Podman, falls back to Docker

**Windows:** Docker Desktop required

```bash
# Force specific engine on Linux
./backup_and_restore/backup_db.sh --containerEngine podman
./backup_and_restore/backup_server.sh --containerEngine docker
```

---

## Output Examples

### Backup Files
```
backup_and_restore/backups/
├── omero.2025-07-24_14-30-15-UTC.pg_dump         (10.5 MB)
├── biomero.2025-07-24_14-30-15-UTC.pg_dump       (0.04 MB)
└── omero-server.2025-07-24_14-30-15-UTC.tar.gz   (2.1 GB)
```

### Restore Targets

**Docker volumes** (default):
```
omero-2025-07-24-14-30-15-pg16      # Database
biomero-2025-07-24-14-30-15-pg16    # Database  
omero-server-2025-07-24-14-30-15    # OMERO data
```

**Local folders** (with `-localFolder`/`-targetPath`):
```
C:\restored-data\
├── omero-2025-07-24-14-30-15-pg16\      # Database
├── biomero-2025-07-24-14-30-15-pg16\    # Database
└── omero-server-2025-07-24-14-30-15\    # OMERO data
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

# OMERO Configuration Overrides (optional)
LDAP_PASSWORD=MySecretPassword
OMERO_ADMIN_EMAIL=admin@company.com
```

**Default container names:**
- OMERO Database: `nl-biomero-database-1`
- BIOMERO Database: `nl-biomero-database-biomero-1`
- OMERO Server: `nl-biomero-omeroserver-1`

---

## Integration with docker-compose.yml

### After Database Restore
```yaml
# Update volume names to use restored databases
volumes:
  database:
    external: true
    name: omero-2025-07-24-14-06-06-pg16  # Restored database
  database-biomero:
    external: true
    name: biomero-2025-07-24-14-06-06-pg16  # Restored database
```

### After Server Restore
```yaml
# Update OMERO server volume
volumes:
  omero:
    external: true
    name: omero-server-2025-07-24-14-30-15  # Restored server data
```

### Configuration Hierarchy in Practice
```yaml
services:
  omeroserver:
    volumes:
      # 1. Backup config loaded automatically from volume
      - "omero:/OMERO"  # Contains /OMERO/backup/omero.config
      
      # 2. Custom config files (override backup config)
      - "./config/ldap.omero:/opt/omero/server/config/02-ldap.omero:ro"
      - "./config/production.omero:/opt/omero/server/config/03-production.omero:ro"
    
    environment:
      # 3. Environment variables (override everything)
      CONFIG_omero_db_host: database
      CONFIG_omero_db_user: ${POSTGRES_USER}
      CONFIG_omero_db_pass: ${POSTGRES_PASSWORD}
      CONFIG_omero_ldap_password: ${LDAP_PASSWORD}  # From .env file
      CONFIG_omero_logging_level: 10
```

## Configuration Override for Server Restore 🔧

The server restore scripts support **configuration override** for flexible deployment scenarios:

### Custom Configuration Files

Create OMERO configuration files in standard format:

```ini
# filepath: ./config/production.omero.config
# Production OMERO Configuration
omero.db.host=prod-database.company.com
omero.db.name=omero_prod
omero.db.user=omero_prod
omero.db.pass=SecureProductionPassword123
omero.ldap.config=true
omero.ldap.urls=ldaps://prod-ldap.company.com:636
omero.ldap.base=OU=Users,OU=Production,DC=company,DC=com
omero.ldap.username=CN=omero_ldap_prod,OU=Service Accounts,DC=company,DC=com
omero.ldap.password=ProductionLdapPassword
omero.mail.smtp.host=mail.company.com
omero.mail.from=omero-prod@company.com
omero.scripts.timeout=3600000
```

```ini
# filepath: ./config/dev.omero.config
# Development OMERO Configuration  
omero.db.host=localhost
omero.db.name=omero_dev
omero.db.user=omero
omero.db.pass=omero
omero.ldap.config=false
omero.logging.level=DEBUG
omero.scripts.timeout=60000
omero.web.debug=true
```

```ini
# filepath: ./config/new-ldap.omero.config
# Updated LDAP configuration for server migration
omero.ldap.config=true
omero.ldap.urls=ldap://new-ldap-server.company.com:389
omero.ldap.base=OU=Users,OU=NewStructure,DC=company,DC=local
omero.ldap.username=CN=omero_service,OU=ServiceAccounts,DC=company,DC=local
omero.ldap.password=NewSecurePassword123
omero.ldap.user_filter=(sAMAccountName=*)
omero.ldap.user_mapping=omeName=sAMAccountName,firstName=givenName,lastName=sn,email=mail
omero.ldap.group_filter=(objectClass=group)
omero.ldap.group_mapping=name=cn
```

### Configuration Override Use Cases

#### 1. **Production Migration**
```powershell
# Restore production data with updated production config
.\backup_and_restore\restore_server.ps1 -backupPath "prod-backup.tar.gz" -configFile ".\config\production.omero.config"
```

#### 2. **Development Environment**
```powershell
# Create dev environment from production backup
.\backup_and_restore\restore_server.ps1 -backupPath "prod-backup.tar.gz" -configFile ".\config\dev.omero.config" -volumeName "dev-omero"
```

#### 3. **Server Infrastructure Changes**
```powershell
# Restore after LDAP server migration
.\backup_and_restore\restore_server.ps1 -backupPath "old-system.tar.gz" -configFile ".\config\new-ldap.omero.config"
```

#### 4. **Testing Configurations**
```powershell
# Test new LDAP settings with existing data
.\backup_and_restore\restore_server.ps1 -configFile ".\config\test-ldap.omero.config" -volumeName "test-omero"
```

### Configuration Priority Order

When using `-configFile`/`--configFile`, the **custom configuration completely replaces** the backup config:

1. ❌ **Backup config** - Ignored when custom config provided
2. ✅ **Custom config file** - Loaded from `/OMERO/backup/omero.config`
3. ✅ **Mounted .omero files** - Still loaded from `/opt/omero/server/config/*.omero`
4. ✅ **Environment variables** - Still override everything (`CONFIG_*`)

### Configuration File Format

The config files use the **standard OMERO config dump format** (same as `omero config get` output):

```bash
# Get current config to use as template
docker exec nl-biomero-omeroserver-1 /opt/omero/server/venv3/bin/omero config get > current-config.omero.config

# Edit and use as custom config
.\backup_and_restore\restore_server.ps1 -configFile "current-config.omero.config"
```

### Configuration Validation

The restore scripts perform basic validation:
- ✅ **File exists** - Checks if config file is accessible
- ✅ **Format check** - Looks for `omero.` properties or comments
- ✅ **Interactive confirmation** - Asks to continue if format looks suspicious
- ✅ **Installation verification** - Confirms config was written to `/OMERO/backup/omero.config`

### Combining with Environment Variables

You can still use environment variables to override specific settings:

```yaml
# docker-compose.yml - Override database settings while keeping LDAP from custom config
services:
  omeroserver:
    environment:
      # These override the custom config file
      CONFIG_omero_db_host: new-database-server
      CONFIG_omero_db_name: ${POSTGRES_DB}
      CONFIG_omero_db_user: ${POSTGRES_USER}
      CONFIG_omero_db_pass: ${POSTGRES_PASSWORD}
    volumes:
      - "omero:/OMERO"  # Contains custom config in /OMERO/backup/omero.config
```

This gives you **maximum flexibility** for different deployment scenarios while maintaining the automatic configuration loading! 🤖✅

---

## Quick Help

```powershell
# Windows - Built-in help
.\backup_and_restore\backup_db.ps1 -help
.\backup_and_restore\restore_db.ps1 -help
.\backup_and_restore\backup_server.ps1 -help
.\backup_and_restore\restore_server.ps1 -help

# Linux/macOS - Built-in help
./backup_and_restore/backup_db.sh --help
./backup_and_restore/restore_db.sh --help
./backup_and_restore/backup_server.sh --help
./backup_and_restore/restore_server.sh --help
```

---

## Requirements

- **Windows:** Docker Desktop + PowerShell 5.1+
- **Linux/macOS:** Docker or Podman + Bash 4.0+
- **For backup:** Running NL-BIOMERO containers
- **For restore:** Internet access to pull PostgreSQL images

---

## Troubleshooting

**Container not found:** Check `docker ps` or `podman ps` for running containers  
**Permission denied:** Ensure container engine has access to dump/target paths  
**Small backup file:** Verify container names and database credentials in `.env`  
**Volume exists:** Remove existing volume with `docker volume rm <name>`  
**Restore failed:** Check PostgreSQL logs with `docker logs <container-id>`  
**Config not loading:** Check `/OMERO/backup/omero.config` exists in restored volume  

**Check volumes:** `docker volume ls` or `podman volume ls`  
**Check local folders:** Ensure parent directory exists and has write permissions  
**Debug config:** `docker exec <omero-container> /opt/omero/server/venv3/bin/omero config get`