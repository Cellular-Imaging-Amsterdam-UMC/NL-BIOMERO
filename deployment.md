# NL-BIOMERO Deployment & Upgrade Guide

This document outlines four main deployment scenarios for the NL-BIOMERO platform.
Containers are available prebuilt and deployment is possible on Linux, Windows (via Docker Desktop), or Podman (e.g. RHEL/SELinux). Kubernetes setups are also possible with correct disk mounts.

---

## Scenario 1: Fresh Deployment (no existing data)

- Deploy all containers using docker-compose (1 server) or across multiple VMs.
- `.env` and `docker-compose.yml` define all ports, mounts, and credentials.
    - You can change mounted Docker volumes to be on-disk mounts.
- No OMERO data required.
- Works on Windows (Docker Desktop), Linux (Docker or Podman).
- For Kubernetes, adjust disk mounts and configs accordingly; some data needs to be shared between services.

→ See `README.md` in root and `docker-compose.yml`.

---

## Scenario 2: Fresh Deployment with Existing Data

- Use this if restoring an existing OMERO backup.
- Requires OMERO backup (just follow the standard [OMERO.server backup and restore](https://omero.readthedocs.io/en/stable/sysadmins/server-backup-and-restore.html#backing-up-omero)):
  - PostgreSQL dump (`pg_dump ...`)
  - Config dump (`omero config get`), store in `/OMERO/backup`
  - `/OMERO` data backup
- Restore using scripts in `backup_and_restore/`:
  - `restore_db.sh`/`.ps1`
  - `restore_server.sh`/`.ps1`
  - The config dump is picked up by `00-restore-config.sh` on server startup
- Supports upgrade to newer PostgreSQL too (e.g. dump from 11, restore into 16)
- OMERO.server version must match w/ container, [upgrade](https://omero.readthedocs.io/en/stable/sysadmins/index.html#upgrading) locally first if it doesn't.

→ See `backup_and_restore/README.md` for exact steps of such restore scripts.
It also describes the opposite (backing up containers).

---

## Scenario 3: Hybrid Deployment with Existing OMERO Server

- Keep existing OMERO.server + PostgreSQL.
- Deploy (perhaps on a separate VM) only a subset of containers, e.g.:
  - `biomero`, `metabase`, `omeroweb`, `biomero-database`, `adi` (BIOMERO & ADI)
  - `biomero`, `metabase`, `omeroweb`, `biomero-database` (BIOMERO only)
  - `adi`, `metabase`, `omeroweb`, `biomero-database`  (ADI only)
- Connect these to the external OMERO server through the env/config variables.
- Requires some minimal config/scripts additions to your OMERO server. For now, see the Dockerfile of `server` and its config in the `docker-compose.yml` 

→ A separate integration guide will follow for this scenario.

---

## Scenario 4: Full Non-Docker Install (Not Recommended)

- Manual install of OMERO + BIOMERO + Metabase on disk (e.g. with Ansible).
- Not officially supported — too many OS/env dependencies.
- Harder to upgrade with new versions or reproduce issues.
- But: All Dockerfiles are open source and all install steps can be followed if needed.
- Note that Windows is not supported by OMERO itself. And our dockerfiles only show installations on Linux too.

→ Use only if containerized deployment is not possible.

---

## Notes

- All mounts and port mappings are defined in `docker-compose.yml`.
- `.env` controls ports, secrets, paths — adjust before deploy.
- Podman with SELinux is supported (e.g. on RHEL) with volume labels set.
- For restore/upgrade: follow OMERO docs: https://omero.readthedocs.io/en/stable/sysadmins/server-backup-and-restore.html

---

## Next Steps

- Want a quick install? → Start with Scenario 1.
- Migrating old data? → Use Scenario 2 and the restore scripts.
- Extending an existing OMERO setup? → Use Scenario 3.
- Avoiding containers? → Proceed with caution (Scenario 4).

Containers reduce complexity — you’re not stuck managing dependencies or OS quirks.

---
