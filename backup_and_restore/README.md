# NL-BIOMERO Backup & Restore Scripts

**One-command backup and restore for NL-BIOMERO PostgreSQL databases, OMERO server data/config, and Metabase dashboards.**

> Important: The scripts and approaches described here are examples for inspiration, not prescriptive recommendations. Always review, test, and adapt to your specific environment, security policies, and operational requirements.

## Key Features

- **Synchronized backups:** All components use a single timestamp for consistency.
- **Flexible targets:** Backup/restore to Docker volumes or local folders.
- **Cross-platform:** Bash (Linux/macOS, Docker/Podman) and PowerShell (Windows).
- **Zero configuration:** Reads from `.env`, auto-detects containers.
- **Production ready:** Error handling, validation, cleanup.
- **Config hierarchy:** OMERO config can be restored/overridden in multiple ways.
- **Metabase/OMERO folder backup:** Can backup OMERO or Metabase directly from a host folder (no container needed).

---

## Quick Start

### Master Backup (Recommended)

Backs up OMERO DB, BIOMERO DB, OMERO server (data/config), and Metabase with a single timestamp.

**Linux/macOS:**
```bash
./backup_and_restore/backup/backup_master.sh
```

**Windows:**
```powershell
.\backup_and_restore\backup\backup_master.ps1
```

**Creates:**
- `omero.{timestamp}.pg_dump`
- `biomero.{timestamp}.pg_dump`
- `omero-server.{timestamp}.tar.gz` (unless `--skip-server-data`)
- `metabase.{timestamp}.tar.gz`

All files are placed in a timestamped subfolder under `./backup_and_restore/backups/`.

---

### Common Options

- `--skip-database` / `-skipDatabase`: Skip both OMERO and BIOMERO DB backup.
- `--skip-server` / `-skipServer`: Skip OMERO server backup.
- `--skip-metabase` / `-skipMetabase`: Skip Metabase backup.
- `--skip-server-data` / `-skipServerData`: Only backup OMERO config (no data tar).
- `--skip-server-config` / `-skipServerConfig`: Only backup OMERO data (no config export).
- `--output-directory <dir>` / `-outputDirectory <dir>`: Custom backup location.
- `--omero-folder <path>` / `-omeroFolder <path>`: Backup OMERO data directly from a host folder (no container needed).
- `--metabase-folder <path>` / `-metabaseFolder <path>`: Backup Metabase directly from a host folder.

---

### Typical Backup Workflow

```bash
# 1. Stop user-facing containers (optional for consistency)
docker-compose stop omeroweb metabase biomero-importer

# 2. Run master backup
./backup_and_restore/backup/backup_master.sh

# 3. Restart services
docker-compose up -d
```

---

### Typical Restore Workflow

```bash
# 1. Stop all services
docker-compose down

# 2. Restore databases
./backup_and_restore/restore/restore_db.sh

# 3. Restore OMERO server data/config
./backup_and_restore/restore/restore_server.sh

# 4. Restore Metabase dashboards
./backup_and_restore/restore/restore_metabase.sh

# 5. Update docker-compose.yml to use restored volumes/folders
# 6. Start all services
docker-compose up -d
```

---

## Individual Script Usage

### Database Backup

```bash
./backup_and_restore/backup/backup_db.sh
```
- Backs up OMERO and BIOMERO DBs from containers.
- Output: `omero.{timestamp}.pg_dump`, `biomero.{timestamp}.pg_dump`

### Server Backup

```bash
./backup_and_restore/backup/backup_server.sh
```
- Backs up OMERO server data/config from container or host folder.
- Output: `omero-server.{timestamp}.tar.gz`
- Use `--omero-folder <path>` to backup from a host folder (no container needed).

### Metabase Backup

```bash
./backup_and_restore/backup/backup_metabase.sh
```
- Backs up Metabase folder (H2 DB, configs, plugins).
- Output: `metabase.{timestamp}.tar.gz`
- Use `--metabase-folder <path>` to specify a custom folder.

---

## Restore Scripts

- `restore/restore_db.sh` / `restore/restore_db.ps1`: Restore OMERO/BIOMERO DBs to containers or local folders.
- `restore/restore_server.sh` / `restore/restore_server.ps1`: Restore OMERO server data/config to volume or folder.
- `restore/restore_metabase.sh` / `restore/restore_metabase.ps1`: Restore Metabase dashboards/configs to folder.

---

## OMERO Configuration Hierarchy

1. **Backup config**: `/OMERO/backup/omero.config` (restored automatically)
2. **Custom config files**: `/opt/omero/server/config/*.omero` (mount in docker-compose)
3. **Environment variables**: `CONFIG_omero_*` (override everything)

---

## Example: Backup OMERO from Host Folder

```bash
./backup_and_restore/backup/backup_server.sh --omero-folder "/srv/omero"
```

## Example: Backup Metabase from Host Folder

```bash
./backup_and_restore/backup/backup_metabase.sh --metabase-folder "/srv/metabase"
```

---

## Requirements

- **Linux/macOS:** Docker or Podman, Bash 4+
- **Windows:** Docker Desktop, PowerShell 5.1+
- **For backup:** Running NL-BIOMERO containers (unless using folder mode)
- **For restore:** Internet access to pull images

---

## Troubleshooting

- **Container not found:** Check `docker ps` or `podman ps`
- **Permission denied:** Ensure backup location is writable
- **Small backup file:** Check container names and credentials
- **Restore failed:** Check logs with `docker logs <container>`
- **Config not loading:** Check `/OMERO/backup/omero.config` exists in restored volume/folder

---

## Help

All scripts support `--help` or `-help` for usage and options.

---

**For more details, see comments in each script or contact the NL-BIOMERO team.**