FROM openmicroscopy/omero-server:5.6.10


COPY worker-processor/ice.config worker-processor/worker.cfg /opt/omero/server/OMERO.server/etc/templates/

USER root

## Default Python environment
ENV VIRTUAL_ENV=/opt/omero/server/venv3
ENV PATH=/opt/ice-3.6.5-0.3.0/bin:$VIRTUAL_ENV/bin/:$PATH
RUN yum -y install git 

## Replace the default configuration files
COPY worker-processor/ice.config worker-processor/worker.cfg /opt/omero/server/OMERO.server/etc/templates/

## Install SSH client
RUN yum install -y openssh-clients
COPY worker-processor/10-mount-ssh.sh /startup/10-mount-ssh.sh
RUN chmod +x /startup/10-mount-ssh.sh

## Setup OME ZARR & TIFF modules for data export
RUN python3 -m pip install omero-cli-zarr==0.5.3
RUN yum install -y blosc-devel

# Sadly can't do this in Dockerfile:
# ENV JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:/bin/java::")
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-11.0.20.0.8-1.el7_9.x86_64
RUN export JAVA_HOME

# RUN wget https://github.com/glencoesoftware/raw2ometiff/releases/download/v0.5.0/raw2ometiff-0.5.0.zip \
#     ; unzip -d /opt raw2ometiff-0.5.0.zip \
#     && rm raw2ometiff-0.5.0.zip
# ENV PATH="$PATH:/opt/raw2ometiff-0.5.0/bin"
# ENV PATH=/opt/ice-3.6.5-0.3.0/bin:$VIRTUAL_ENV/bin/:$PATH

RUN wget https://github.com/glencoesoftware/bioformats2raw/releases/download/v0.7.0/bioformats2raw-0.7.0.zip \
    ; unzip -d /opt bioformats2raw-0.7.0.zip \
    && rm bioformats2raw-0.7.0.zip
ENV PATH="$PATH:/opt/bioformats2raw-0.7.0/bin"

## Add BIOMERO Omero Slurm Client
# For development: 
# Invalidate cache for development builds
# ADD "https://api.github.com/repos/NL-BioImaging/biomero/commits?per_page=1" latest_commit
# and install from git intead of pypi 
# && python3 -m pip install 'git+https://github.com/NL-BioImaging/biomero' \
RUN python3 -m venv $VIRTUAL_ENV \
    && python3 -m pip install --upgrade pip \ 
    && python3 -m pip install biomero==1.2.0 \
    && python3 -m pip install ezomero==1.1.1 tifffile==2020.9.3

## Setup slurm-config for biomero
COPY worker-processor/slurm-config.ini /etc/slurm-config.ini

## OMERO: Replace the default startup scripts
RUN rm /startup/60-database.sh
COPY worker-processor/99-run.sh /startup/99-run.sh
RUN chmod +x /startup/99-run.sh
USER omero-server
