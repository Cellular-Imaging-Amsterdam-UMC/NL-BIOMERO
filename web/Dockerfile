ARG PARENT_IMAGE=openmicroscopy/omero-web-standalone:5.22.1
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
        ezomero\
        whitenoise
        # # omero-fpbioimage 

ADD 01-default-webapps.omero /opt/omero/web/config/
# ADD custom_login.html /opt/omero/web/config/

#  ADD OUR HACKS
# ADD local_omeroweb /opt/omero/web/venv3/lib/python3.6/site-packages/omeroweb
# ADD local_omeroweb_config /opt/omero/web/config

USER omero-web