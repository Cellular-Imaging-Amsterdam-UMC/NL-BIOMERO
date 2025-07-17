FROM openmicroscopy/omero-server:5.6.16

ARG BIOMERO_VERSION

# Upload scripts for omero-server user
# COPY --chown=omero-server:omero-server scripts/slurm/* /opt/omero/server/OMERO.server/lib/scripts/slurm/
USER root
RUN yum -y install git 
USER omero-server

# Configuration file
ADD server/01-ldap-config.omero /opt/omero/server/config/

# Development versions:
# ADD "https://api.github.com/repos/NL-BioImaging/biomero-scripts/commits/master" latest_comm
# RUN cd /opt/omero/server/OMERO.server/lib/scripts/ && \
#     git clone --depth 1 --branch master --single-branch https://github.com/NL-BioImaging/biomero-scripts.git biomero

# Clone specific release version
RUN cd /opt/omero/server/OMERO.server/lib/scripts/ && \
    git clone --depth 1 --branch ${BIOMERO_VERSION} --single-branch https://github.com/NL-BioImaging/biomero-scripts.git biomero

# Install the Figure-to-PDF script for OMERO.figure plugin
RUN curl -o /opt/omero/server/OMERO.server/lib/scripts/omero/figure_scripts/Figure_To_Pdf.py \
    https://raw.githubusercontent.com/ome/omero-figure/refs/heads/master/omero_figure/scripts/omero/figure_scripts/Figure_To_Pdf.py

# Install Labels2Rois script
RUN curl -o /opt/omero/server/OMERO.server/lib/scripts/omero/util_scripts/Labels2Rois.py \
    https://raw.githubusercontent.com/Cellular-Imaging-Amsterdam-UMC/label2rois/main/Labels2Rois.py

# Overwrite ICE configuration
# COPY ice.config /opt/omero/server/OMERO.server/etc/templates/
# Overwrite startup run
# COPY 99-run.sh /startup/99-run.sh

# entrypoint from omero-server dockerfile: 
# run all /startup/* scripts in alphabetic/numerical order.

COPY server/omero-zarr-pixel-buffer-0.5.0.jar /opt/omero/server/OMERO.server/lib/server/omero-zarr-pixel-buffer.jar
