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
        # # omero-fpbioimage 

# ADD 01-default-webapps.omero /opt/omero/web/config/
# ADD custom_login.html /opt/omero/web/config/

# ADD local_omeroweb /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb
# ADD local_omeroweb_config /opt/omero/web/config

# Configureation file
        # TODO: Config file is used in different features... Is there a neatest way?
ADD local_omeroweb_edits/01-default-webapps.omero /opt/omero/web/config

# Custom login page logo
        # TODO: Edit out hard code its embarassing
ADD local_omeroweb_edits/login.html /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webclient/templates/webclient/login.html

# No server selector in login page
ADD local_omeroweb_edits/Amsterdam-UMC.png /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webclient/static/webclient/image/Amsterdam-UMC.png

# Double-Click for better file browsing
ADD local_omeroweb_edits/group_user_dropdown2.html /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webclient/templates/webclient/base/includes/group_user_dropdown2.html
ADD local_omeroweb_edits/layout.css /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/layout.css

# Improved top menu button clarity
ADD local_omeroweb_edits/ome.header.css /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webgateway/static/webgateway/css/ome.header.css
ADD local_omeroweb_edits/script-text-play.svg /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webgateway/static/webgateway/img/script-text-play.svg


USER omero-web