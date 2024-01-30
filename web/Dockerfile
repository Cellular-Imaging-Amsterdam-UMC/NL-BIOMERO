ARG PARENT_IMAGE=openmicroscopy/omero-web-standalone:5.24.0
FROM ${PARENT_IMAGE}

USER root

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

# Set the working directory
WORKDIR /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb

# Configuration file
ADD local_omeroweb_edits/01-default-webapps.omero /opt/omero/web/config

# Add the new login images to the login page image directory
# All images here must be named by {number}.png reflecting the desiered display order
ADD local_omeroweb_edits/Display_Images ./webclient/static/webclient/image/login_page_images/

ADD local_omeroweb_edits/login.html ./webclient/templates/webclient/login.html

# Double-Click for better file browsing
ADD local_omeroweb_edits/group_user_dropdown2.html ./webclient/templates/webclient/base/includes/group_user_dropdown2.html
ADD local_omeroweb_edits/layout.css ./layout.css

# Improved top menu button clarity
ADD local_omeroweb_edits/ome.header.css ./webgateway/static/webgateway/css/ome.header.css
ADD local_omeroweb_edits/script-text-play.svg ./webgateway/static/webgateway/img/script-text-play.svg

USER omero-web