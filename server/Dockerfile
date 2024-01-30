FROM openmicroscopy/omero-server:5.6.10

# Upload scripts for omero-server user
# COPY --chown=omero-server:omero-server scripts/slurm/* /opt/omero/server/OMERO.server/lib/scripts/slurm/
USER root
RUN yum -y install git 
USER omero-server
# Invalidate cache for development builds
ADD "https://api.github.com/repos/NL-BioImaging/biomero-scripts/commits?per_page=1" latest_comm
RUN  cd /opt/omero/server/OMERO.server/lib/scripts/ && \
    git clone https://github.com/NL-BioImaging/biomero-scripts.git slurm

# Overwrite ICE configuration
# COPY ice.config /opt/omero/server/OMERO.server/etc/templates/
# Overwrite startup run
# COPY 99-run.sh /startup/99-run.sh

# entrypoint from omero-server dockerfile: 
# run all /startup/* scripts in alphabetic/numerical order.

