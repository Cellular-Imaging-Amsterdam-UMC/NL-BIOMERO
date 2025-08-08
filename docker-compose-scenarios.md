# NL-BIOMERO Deployment Scenarios and Docker Compose Files

This document outlines the different deployment scenarios for NL-BIOMERO and maps them to corresponding docker-compose configurations.

## Overview

NL-BIOMERO supports multiple deployment scenarios from development to production. This guide will help you choose the right configuration for your needs.

---

## Scenario 0: Development & Demo

### Scenario 0.1: Local Development Setup
**Purpose**: For developers working on NL-BIOMERO components
**Docker Compose File**: `docker-compose-dev.yml`
**Key Features**:
- Builds images from local source code
- Includes development-specific settings
- Keeps omeroweb running with `tail -f /dev/null` to allow direct development inside the container

**Usage**:
```bash
docker-compose -f docker-compose-dev.yml up -d
```

### Scenario 0.2: Default (Local Build)
**Purpose**: Testing with locally built images
**Docker Compose File**: `docker-compose.yml`
**Key Features**:
- Builds all components from local source code
- Includes standard configuration
- Suitable for testing before releasing to production

**Usage**:
```bash
docker-compose up -d
```

---

## Scenario 1: Fresh Deployment (no existing data)

### Scenario 1.1: Standard Production Deployment
**Purpose**: Production deployment with prebuilt images
**Docker Compose File**: `docker-compose-from-dockerhub.yml`
**Key Features**:
- Uses prebuilt images from Docker Hub
- Standard configuration with production defaults
- No existing OMERO data required

**Usage**:
```bash
docker-compose -f docker-compose-from-dockerhub.yml up -d
```

### Scenario 1.2: Production with SSL (Ubuntu)
**Purpose**: Secure production deployment with SSL
**Docker Compose File**: `docker-compose-for-ubuntu-with-SSL.yml`
**Key Features**:
- Includes Nginx for SSL termination
- Configured for Ubuntu environments
- Provides secure HTTPS access to web interfaces

**Usage**:
```bash
docker-compose -f docker-compose-for-ubuntu-with-SSL.yml up -d
```

---

## Scenario 2: Fresh Deployment with Existing Data

### Scenario 2.1: Restore from OMERO Backup
**Purpose**: Deploy with existing OMERO/BIOMERO data
**Docker Compose File**: `docker-compose-with-restored-data.yml`
**Key Features**:
- Configured to use external volumes for restored data
- Compatible with backup/restore scripts
- Maintains data integrity from previous installations

**Usage**:
```bash
# 1. Restore data using backup_and_restore scripts
./backup_and_restore/restore/restore_db.sh
./backup_and_restore/restore/restore_server.sh
./backup_and_restore/restore/restore_metabase.sh

# 2. Deploy with restored data volumes
docker-compose -f docker-compose-with-restored-data.yml up -d
```

---

## Scenario 3: Hybrid Deployment with Existing OMERO Server

### Scenario 3.1: BIOMERO Only (External OMERO)
**Purpose**: Connect to existing external OMERO server
**Docker Compose File**: `docker-compose-biomero-only.yml`
**Key Features**:
- Deploys only BIOMERO components
- Configured to connect to external OMERO server
- Minimal footprint when OMERO is already deployed

**Usage**:
```bash
# Copy the example environment file for external OMERO configuration
cp external-omero.env.example .env

# Edit .env to set external OMERO server details
nano .env

# Deploy BIOMERO components
docker-compose -f docker-compose-biomero-only.yml up -d
```

### Scenario 3.2: ADI Only (External OMERO)
**Purpose**: Deploy only Automated Data Import with existing OMERO
**Docker Compose File**: `docker-compose-adi-only.yml`
**Key Features**:
- Deploys only ADI component
- Configured to connect to external OMERO server
- Focused on automated data import functionality

**Usage**:
```bash
# Copy the example environment file for external OMERO configuration
cp external-omero.env.example .env

# Edit .env to set external OMERO server details
nano .env

# Deploy ADI components
docker-compose -f docker-compose-adi-only.yml up -d
```

---

## Additional Configurations

### Component Selection with Profiles
All standard docker-compose files support selective component deployment using profiles:

```bash
# Deploy only with ADI enabled
docker-compose --profile adi_enabled up -d

# Deploy without ADI
docker-compose up -d
```

### Environment Customization
All deployments can be customized by editing the `.env` file before deployment:

```bash
# Edit environment variables
nano .env

# Then deploy
docker-compose up -d
```

---

## Creating a Custom Deployment

1. Start with the docker-compose file closest to your needs
2. Customize volumes, ports, and environment variables
3. Use docker-compose override files for minor changes

Example override file (`docker-compose.override.yml`):
```yaml
services:
  omeroweb:
    ports:
      - "8080:4080"  # Use different port
  
  omeroserver:
    environment:
      CONFIG_omero_web_public_enabled: "true"  # Enable additional feature
```

---

For more detailed information about each scenario, see the deployment scenarios in `deployment.md`.
