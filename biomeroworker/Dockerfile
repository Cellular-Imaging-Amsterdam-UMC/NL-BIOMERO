FROM openmicroscopy/omero-server:5.6.13

ARG BIOMERO_VERSION

USER root

## Default Python environment
ENV VIRTUAL_ENV=/opt/omero/server/venv3
ENV PATH=/opt/ice-3.6.5-0.3.0/bin:$VIRTUAL_ENV/bin/:$PATH
RUN yum -y install git 

## Replace the default configuration files
COPY biomeroworker/ice.config biomeroworker/worker.cfg /opt/omero/server/OMERO.server/etc/templates/

## Install SSH client
RUN yum install -y openssh-clients
COPY biomeroworker/10-mount-ssh.sh /startup/10-mount-ssh.sh
RUN chmod +x /startup/10-mount-ssh.sh

## Setup OME ZARR & TIFF modules for data export
RUN python3 -m pip install omero-cli-zarr==0.5.3
RUN yum install -y blosc-devel

# Sadly can't do this in Dockerfile:
# ENV JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:/bin/java::")
ENV JAVA_HOME=/usr/lib/jvm/jre-11-openjdk-11.0.24.0.8-2.el9.x86_64
RUN export JAVA_HOME

RUN wget https://github.com/glencoesoftware/bioformats2raw/releases/download/v0.7.0/bioformats2raw-0.7.0.zip \
    ; unzip -d /opt bioformats2raw-0.7.0.zip \
    && rm bioformats2raw-0.7.0.zip
ENV PATH="$PATH:/opt/bioformats2raw-0.7.0/bin"

## Add BIOMERO Omero Slurm Client
# For development: 
# Invalidate cache for development builds
# ADD "https://api.github.com/repos/NL-BioImaging/biomero/commits?per_page=1" latest_commit
# and install from git intead of pypi 
RUN yum -y install ack
# Install psycopg2 system prerequisites for postgres interaction
RUN yum install -y python3-devel postgresql-devel gcc
# Update PATH manually based on known locations
ENV PATH="/usr/pgsql-12/bin:/usr/pgsql-14/bin:${PATH}"
RUN python3 -m venv $VIRTUAL_ENV \
    && python3 -m pip install --upgrade pip \
    # && python3 -m pip install biomero==${BIOMERO_VERSION} \
    && python3 -m pip install 'git+https://github.com/NL-BioImaging/biomero.git@database' \
    && python3 -m pip install ezomero==1.1.1 tifffile==2020.9.3 omero-metadata==0.12.0

## Adjust processor code with AMC Processor
# This version forwards HTTP(S) PROXY environment variables to the subprocesses (scripts)
# See latest OME version @ https://raw.githubusercontent.com/ome/omero-py/master/src/omero/processor.py
# Might need to merge important changes from time to time to keep this version compatible.
COPY biomeroworker/processor.py /opt/omero/server/venv3/lib/python3.9/site-packages/omero/

## Setup slurm-config for biomero
COPY biomeroworker/slurm-config.ini /etc/slurm-config.ini

## OMERO: Replace the default startup scripts
RUN rm /startup/60-database.sh
COPY biomeroworker/99-run.sh /startup/99-run.sh
RUN chmod +x /startup/99-run.sh
USER omero-server
