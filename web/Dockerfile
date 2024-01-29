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


# Configureation file
ADD local_omeroweb_edits/01-default-webapps.omero /opt/omero/web/config

# Replaces the default logo with the custom logo and removes the server selection
ARG CONFIG_omero_web_login__logo
RUN if [ -z "$CONFIG_omero_web_login__logo" ]; then echo "CONFIG_omero_web_login__logo is not set"; exit 1; fi
ADD local_omeroweb_edits/Logos/${CONFIG_omero_web_login__logo} /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webclient/static/webclient/image/custom_login_logo.png
ADD local_omeroweb_edits/login.html /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webclient/templates/webclient/login.html


# Double-Click for better file browsing
ADD local_omeroweb_edits/group_user_dropdown2.html /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webclient/templates/webclient/base/includes/group_user_dropdown2.html
ADD local_omeroweb_edits/layout.css /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/layout.css

# Improved top menu button clarity
ADD local_omeroweb_edits/ome.header.css /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webgateway/static/webgateway/css/ome.header.css
ADD local_omeroweb_edits/script-text-play.svg /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb/webgateway/static/webgateway/img/script-text-play.svg


USER omero-web