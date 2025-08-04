FROM openmicroscopy/omero-web-standalone:5.29.1

USER root

# Create L-Drive directory and set permissions
RUN mkdir -p /L-Drive && \
    chown omero-web:omero-web /L-Drive && \
    chmod 755 /L-Drive

# Add volume mount point for L-Drive
VOLUME ["/L-Drive"]

### Pretty Login ###
COPY web/local_omeroweb_edits/pretty_login/get_images_for_login_page.py /script/
COPY web/local_omeroweb_edits/pretty_login/login.html /script/
COPY web/local_omeroweb_edits/pretty_login/institution_banner /images/
### ###

# OMERO applications
RUN /opt/omero/web/venv3/bin/pip install \
        'django-cors-headers' \
        omero-figure \
        omero-iviewer \
        omero-fpbioimage \
        omero-mapr \
        omero-parade \
        omero-webtagging-autotag \
        omero-webtagging-tagsearch \
        whitenoise

# Install system dependencies
RUN yum install -y python3-devel postgresql-devel gcc gettext

# Update PATH manually based on known locations
ENV PATH="/usr/pgsql-12/bin:/usr/pgsql-14/bin:${PATH}"

## Setup slurm-config for biomero, for the BIOMERO django API in OMERO.biomero
COPY biomeroworker/slurm-config.ini /etc/slurm-config.ini

### Install OMERO ADI library for import order creation ###
# Check for new commits to invalidate cache when repo changes
ADD "https://api.github.com/repos/Cellular-Imaging-Amsterdam-UMC/OMERO-Automated-Data-Import/commits?sha=main&per_page=1" /latest_commit
# Clone from main branch with Git metadata for version detection
RUN git clone --depth 1 -b main https://github.com/Cellular-Imaging-Amsterdam-UMC/OMERO-Automated-Data-Import.git /auto-importer
RUN /opt/omero/web/venv3/bin/python3.9 -m pip install /auto-importer

### Install OMERO.biomero first ###
ADD "https://api.github.com/repos/Cellular-Imaging-Amsterdam-UMC/OMERO.biomero/commits/main" /latest_commit_biomero
RUN git clone -b main https://github.com/Cellular-Imaging-Amsterdam-UMC/OMERO.biomero.git /opt/omero/web/OMERO.biomero

# Create and set permissions for static directory
RUN mkdir -p /opt/omero/web/OMERO.web/var/static && \
    chmod a+w /opt/omero/web/OMERO.web/var/static

# Upgrade pip and install OMERO.biomero
RUN /opt/omero/web/venv3/bin/python3.9 -m pip install --upgrade pip
RUN /opt/omero/web/venv3/bin/pip install wheel setuptools
RUN /opt/omero/web/venv3/bin/pip install -e /opt/omero/web/OMERO.biomero
RUN /opt/omero/web/venv3/bin/omero-biomero-setup

# Set permissions for OMERO.biomero directory so omero-web user can write files
RUN chown -R omero-web:omero-web /opt/omero/web/OMERO.biomero && \
    chmod -R 755 /opt/omero/web/OMERO.biomero && \
    chmod -R 775 /opt/omero/web/OMERO.biomero/omero_biomero

### Install OMERO.forms ###

# Install OMERO.forms from PyPI
RUN /opt/omero/web/venv3/bin/pip install omero-forms==2.1.0

# Set the working directory
WORKDIR /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb

# Run the script to update the login.html file from pretty_login
RUN python3.9 /script/get_images_for_login_page.py /images/ /script/login.html ./webclient/templates/webclient/login.html

# Login logos image and style page
ADD web/local_omeroweb_edits/pretty_login/login_page_images ./webclient/static/webclient/image/login_page_images/
ADD web/local_omeroweb_edits/pretty_login/ome.login.css ./webgateway/static/webgateway/css/ome.login.css

# Configuration file and startup scripts
ADD web/local_omeroweb_edits/01-default-webapps.omero /opt/omero/web/config/
ADD web/44-create_forms_user.py /startup/
ADD web/45-fix-forms-config.sh /startup/
RUN chmod +x /startup/45-fix-forms-config.sh && \
    chmod +x /startup/44-create_forms_user.py && \
    chown -R omero-web:omero-web /opt/omero/web/config && \
    chmod 644 /opt/omero/web/config/01-default-webapps.omero

### Better Buttons ###

# # Improved top menu button clarity
ADD web/local_omeroweb_edits/script-text-play.svg ./webgateway/static/webgateway/img/script-text-play.svg

### ###

USER omero-web

