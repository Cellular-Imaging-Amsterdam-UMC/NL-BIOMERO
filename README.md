# Containerized OMERO with BIOMERO

These scripts spin up the entire OMERO environment required for [BIOMERO](https://github.com/NL-BioImaging/biomero), and other improvements by the Core Facility Cellular Imaging.

It uses Docker Compose to setup an OMERO grid on one computer with a server, web, processor and a BIOMERO processor.
If you also want to spin up a local HPC cluster with Docker Compose, to connect BIOMERO to, we host an example [here](https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO-Local-Slurm).

This is an adaptation of OME's [OMERO.server grid and OMERO.web (docker-compose)](https://github.com/ome/docker-example-omero-grid) / [OMERO.server components on multiple nodes using OMERO.grid](http://www.openmicroscopy.org/site/support/omero5/sysadmins/grid.html#nodes-on-multiple-hosts).

OMERO.server is listening on the standard OMERO ports `4063` and `4064`.
OMERO.web is listening on port `4080` (http://localhost:4080/).


## Quickstart
Clone this repository locally (from the commandline)

    git clone https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO.git

Change into the new directory

    cd NL-BIOMERO

Setup the connection with Slurm:

First, setup a configuration file, e.g. take the local slurm:

    cp worker-processor/slurm-config.localslurm.ini worker-processor/slurm-config.ini

Next, actually setup a local Slurm that matches this config.

Follow the README on [here](https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO-Local-Slurm)

Or in short: 

    cd ..
    git clone https://github.com/TorecLuik/slurm-docker-cluster
    cd slurm-docker-cluster
    cp ~/.ssh/id_rsa.pub .
    docker-compose up -d --build

Then let's go back to our omero setup:

    cd NL-BIOMERO



Build and start the containers:

    docker-compose up -d --build

If you want, follow along with the logs on your commandline:

    docker-compose logs -f
    
You can exit the logs with CTRL+C (your OMERO will keep running, because we ran them with `-d` = `detached`)

Log in on web (`localhost:4080`) as user `root` password `omero`. This might take a bit to get ready as the servers start up.

Enjoy!

## Data

To actually enjoy, you'll need some data. 

For now you need [OMERO.insight app](https://downloads.openmicroscopy.org/help/pdfs/getting-started-5.pdf), but we are working on a web-importer.

Connect to `localhost`, login as `root`/`omero` again and upload some nice images.

## BIOMERO - BioImage analysis in OMERO

Checkout the [BIOMERO documentation](https://nl-bioimaging.github.io/biomero/) for details on how to use the library and example scripts.

In short:
1. Run script `slurm/init/SLURM Init environment...`
2. Get a coffee or something. This will take at least 10 min to download all the workflow images. Maybe write a nice review on `image.sc` of this software.
3. Select your image / dataset and run script `slurm/workflows/SLURM Run Workflow...`
    - Select at least one of the `Select how to import your results`, e.g. change `Import into NEW Dataset` text to `hello world`
    - Select a fun workflow, e.g. `cellpose`.
        - Change the `nuc channel` to the channel to segment
        - Uncheck the `use gpu` unless you setup a nice Slurm w/ GPU
    - Refresh your OMERO `Explore` tab to see your `hello world` dataset with a mask image when the workflow is done.





## Docker specifics 

To stop the cluster:

    docker-compose down

N.B. Data is stored on Docker volumes, which are not automatically deleted when you down the setup. Convenient.

To remove volumes as well:

    docker-compose down --volumes

To rebuild a single container (while running your cluster):

    docker-compose up -d --build <name>

To attach to a running container:

    docker-compose exec <name> /bin/bash

Where `<name>` is e.g. `omeroworker-processor`

Exit back to your commandline by typing `exit`.



## Slurm specifics

Checkout the [BIOMERO documentation](https://nl-bioimaging.github.io/biomero/) for more details on how to setup your Slurm connection with OMERO. 

In short, you always need:
- (headless) SSH setup to Slurm server from your host computer. See for example `ssh.config.example`.
    - Slurm IP
    - Slurm SSH port (probably `22`)
    - Slurm username
    - SSH keys (public key exchanged with Slurm server)
    - SSH alias config file stored as `~/.ssh/config`
- Configuration of `slurm-config.ini`. 
    - Alias used in your config, e.g. `localslurm` 
    - Setup storage paths on Slurm server, e.g. `slurm_data_path`, `slurm_images_path` and `slurm_script_path`.
