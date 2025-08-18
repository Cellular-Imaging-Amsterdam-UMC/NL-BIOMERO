# Containerized OMERO with BIOMERO

These scripts spin up the entire OMERO environment required for <a href="https://github.com/NL-BioImaging/biomero" target="_blank" rel="noopener noreferrer">BIOMERO</a>, and other improvements by the Core Facility Cellular Imaging.

It uses Docker Compose to setup an OMERO grid on one computer with a server, web, processor and a BIOMERO processor.
If you also want to spin up a local HPC cluster with Docker Compose, to connect BIOMERO to, we host an example <a href="https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO-Local-Slurm" target="_blank" rel="noopener noreferrer">here</a>.

This is an adaptation of OME's <a href="https://github.com/ome/docker-example-omero-grid" target="_blank" rel="noopener noreferrer">OMERO.server grid and OMERO.web (docker-compose)</a> / <a href="http://www.openmicroscopy.org/site/support/omero5/sysadmins/grid.html#nodes-on-multiple-hosts" target="_blank" rel="noopener noreferrer">OMERO.server components on multiple nodes using OMERO.grid</a>.

OMERO.server is listening on the standard OMERO ports `4063` and `4064`.
OMERO.web is listening on port `4080` (http://localhost:4080/).

---

## 🚀 Platform-Specific Deployment

### Windows (Docker Desktop)
Follow the **Quickstart** section below for Windows deployment with Docker Desktop.

### Ubuntu/Linux
For Ubuntu/Linux deployments (with SSL support), see our dedicated guide:
📖 **[Ubuntu/Linux Deployment Guide](README.linux.md)**

---

## Quickstart (Windows)

**Note**: This quickstart is based on Windows Docker Desktop and uses `host.docker.internal` to communicate between local clusters. Linux users should refer to the [Ubuntu/Linux guide](README.linux.md).

### 1. Clone and Setup
Clone this repository locally:

```bash
git clone --recurse-submodules https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO.git
cd NL-BIOMERO
```

### 2. Configure Environment
First, customize your environment file `.env`:

```bash
# Edit .env with your secure passwords and configuration
# Edit biomeroworker/slurm-config.ini if you need different BIOMERO settings
```

### 3. Setup Slurm Connection (Optional)
For local testing with a containerized Slurm cluster:

```bash
# Setup local Slurm cluster
cd ..
git clone https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO-Local-Slurm
cd NL-BIOMERO-Local-Slurm
cp ~/.ssh/id_rsa.pub .
docker-compose up -d --build
cd ../NL-BIOMERO
```

### 4. Configure SSH Access
Test Slurm connectivity:

```bash
# from your host machine:
ssh -i ~/.ssh/id_rsa -p 2222 -o StrictHostKeyChecking=no slurm@localhost
# or from inside your biomeroworker container:
ssh -i ~/.ssh/id_rsa -p 2222 -o StrictHostKeyChecking=no slurm@host.docker.internal
exit
```

If successful, create an SSH alias:

```bash
cp ssh.config.example ~/.ssh/config
```


### 5. Deploy NL-BIOMERO
Launch the full stack:

```bash
# For development (with local builds)
docker-compose up -d --build

# For production (using pre-built images)
docker-compose -f docker-compose-from-dockerhub.yml up -d
```

Monitor the deployment:

```bash
docker-compose logs -f
```
Exit w/ CTRL + C

Verify the alias works:

```bash
# go inside your biomeroworker container:
docker-compose exec biomeroworker bash
# from inside your biomeroworker container:
ssh localslurm
exit
exit
```

### 6. Access the Interfaces
- **OMERO.web**: http://localhost:4080
  - **Login**: `root` / `omero` (change default password)
- **Metabase**: http://localhost:3000  
  - **Login**: `admin@biomero.com` / `b1omero` (change default password)


---

## 📊 Data Import

To get started with data:

1. **Web Import**: Use our built-in web importer at http://localhost:4080/omero_boost/canvas/
2. **OMERO.insight**: Download the <a href="https://downloads.openmicroscopy.org/help/pdfs/getting-started-5.pdf" target="_blank" rel="noopener noreferrer">desktop client</a>
   - Connect to `localhost:4063`
   - Login as `root` / `omero`

---

## 🧬 BIOMERO - BioImage Analysis

Checkout the <a href="https://nl-bioimaging.github.io/biomero/" target="_blank" rel="noopener noreferrer">BIOMERO documentation</a> for detailed usage instructions.

### Quick Workflow Example:

1. **Initialize Environment**:
   - Run script: `slurm/init/SLURM Init environment...`
   - ☕ Grab coffee (10+ min download time for a few workflow containers)

2. **Run Analysis**:
   - Select your image/dataset
   - Run script: `slurm/workflows/SLURM Run Workflow...`
   - Configure import: Change `Import into NEW Dataset` → `hello_world`
   - Select workflow: e.g., `cellpose`
   - Set parameters: nucleus channel, GPU settings, etc.

OR

2. **"CANVAS" UI**:
   - Use our new interface at http://localhost:4080/omero_boost/canvas/?tab=biomero
   - Select your workflow: e.g., `Cellpose`
   - Add Dataset, select the image(s) you want to segment
   - Fill in the workflow parameters in tab 2, e.g. nuclei channel 3
   - Select desired output target, e.g. Select Dataset `hello_world` again; and Run!
   - Track your workflow status at the `Status` tab


3. **View Results**:
   - Refresh OMERO `Explore` tab (in the Data tab; http://localhost:4080/webclient/)
   - Find your `hello_world` dataset with generated masks

---

## 🛠️ Container Management

### Basic Operations
```bash
# Stop the cluster
docker-compose down

# Remove with volumes (⚠️ deletes data)
docker-compose down --volumes

# Rebuild single container
docker-compose up -d --build --force-recreate <container-name>

# Access container shell
docker-compose exec <container-name> bash
```

### Useful Container Names
- `omeroserver` - OMERO server
- `omeroweb` - Web interface  
- `biomeroworker` - BIOMERO processor
- `metabase` - Analytics dashboard

---

## 🔧 Configuration

### Slurm Connection Requirements
See <a href="https://nl-bioimaging.github.io/biomero/" target="_blank" rel="noopener noreferrer">BIOMERO documentation</a> for comprehensive setup details.

**Essential Components**:
- **SSH Configuration**: Headless SSH to Slurm server
  - Server IP/hostname
  - SSH port (usually `22`)
  - Username and SSH keys
  - Alias configuration in `~/.ssh/config`
- **Slurm Configuration**: Edit `biomeroworker/slurm-config.ini`
  - SSH alias (e.g., `localslurm`)
  - Storage paths: `slurm_data_path`, `slurm_images_path`, `slurm_script_path`

### Linux Considerations
- SSH permissions: `chmod -R 777 ~/.ssh` before deployment
- Use `postgres:16-alpine` for better compatibility
- See [Ubuntu/Linux guide](README.linux.md) for detailed instructions

---

## 🎨 Frontend Customizations
This deployment includes several UI enhancements:

- **🎨 OMERO CANVAS***: Modern UI for ADI web importer and BIOMERO workflows
- **📝 OMERO.forms**: Create custom metadata forms for users to fill in
- **🔘 Better Buttons**: Improved some button design and accessibility
- **🎭 Pretty Login**: Minor enhanced login page aesthetics


\* (codename!)



### Custom Institution Branding
Add your institution's logo to the login page:

1. Place logo files in: `web/local_omeroweb_edits/pretty_login/login_page_images/`
2. And just mount the file over the current image, e.g. 

```yml
volumes:
      - "./web/slurm-config.ini:/opt/omero/web/OMERO.web/var/slurm-config.ini:rw"
      - "./web/local_omeroweb_edits/pretty_login/login_page_images/bioimaging.png:/opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webclient/static/webclient/image/login_page_images/AmsterdamUMC-logo.png:ro"
      - "./web/L-Drive:/data:rw"

``` 

More details in [web/README.md](web/README.md).

---

## 📚 Additional Resources

- 📖 **[Ubuntu/Linux Deployment](README.linux.md)** - Production deployment guide
- 🧬 **<a href="https://nl-bioimaging.github.io/biomero/" target="_blank" rel="noopener noreferrer">BIOMERO Documentation</a>** - Analysis workflows
- 🏗️ **<a href="https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO-Local-Slurm" target="_blank" rel="noopener noreferrer">Local Slurm Cluster</a>** - Testing environment
- 🔬 **<a href="https://omero.readthedocs.io/" target="_blank" rel="noopener noreferrer">OMERO Documentation</a>** - Core platform docs

---

## 🤝 Support

- **Issues**: <a href="https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO/issues" target="_blank" rel="noopener noreferrer">GitHub Issues</a>
- **Discussions**: <a href="https://forum.image.sc/" target="_blank" rel="noopener noreferrer">image.sc</a> (tag #biomero)
- **Contact**: cellularimaging /at/ amsterdamumc.nl

Happy imaging! 🔬✨
