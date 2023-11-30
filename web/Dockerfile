ARG PARENT_IMAGE=openmicroscopy/omero-web-standalone:5.22.1
FROM ${PARENT_IMAGE}

USER root

#  ADD OUR HACKS
ADD local_omeroweb /opt/omero/web/venv3/lib/python3.6/site-packages/omeroweb
ADD local_omeroweb_config /opt/omero/web/config
RUN yum install -y git

ADD "https://api.github.com/repos/Cellular-Imaging-Amsterdam-UMC/omero-amc-webtest/commits?per_page=1" latest_commit
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
        whitenoise\
        git+https://github.com/Cellular-Imaging-Amsterdam-UMC/omero-amc-webtest.git
        # # omero-fpbioimage 

ADD 01-default-webapps.omero /opt/omero/web/config/


USER omero-web