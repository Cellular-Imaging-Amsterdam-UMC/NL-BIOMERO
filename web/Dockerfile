FROM openmicroscopy/omero-web-standalone:5.24.0

USER root

# This section of the code will use the get_images_for_login_page to stage an edited verion of the login.html script
# The edited version of the login.html script will have the images in the Display_Images directory coded in
# Restart the container if you change images contained in the Display_Images directory
# Copy the script and images
COPY local_omeroweb_edits/get_images_for_login_page.py /script/
COPY local_omeroweb_edits/login.html /script/
COPY local_omeroweb_edits/Display_Images /images/

# Invalidate cache for development builds
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
        git+https://github.com/Cellular-Imaging-Amsterdam-UMC/omero-amc-webtest.git \
        whitenoise

# Set the working directory
WORKDIR /opt/omero/web/venv3/lib/python3.9/site-packages/omeroweb

# Run the script to update the login.html file
RUN python3.9 /script/get_images_for_login_page.py /images/ /script/login.html ./webclient/templates/webclient/login.html

# Configuration file
ADD local_omeroweb_edits/01-default-webapps.omero /opt/omero/web/config

# New login logos image and style page
ADD local_omeroweb_edits/Display_Images ./webclient/static/webclient/image/login_page_images/
ADD local_omeroweb_edits/ome.login.css ./webgateway/static/webgateway/css/ome.login.css

# Double-Click for better file browsing and improved groupsusersbutton
ADD local_omeroweb_edits/group_user_dropdown2.html ./webclient/templates/webclient/base/includes/group_user_dropdown2.html
ADD local_omeroweb_edits/layout.css ./webclient/static/webclient/css/layout.css

# Improved top menu button clarity
ADD local_omeroweb_edits/ome.header.css ./webgateway/static/webgateway/css/ome.header.css
ADD local_omeroweb_edits/script-text-play.svg ./webgateway/static/webgateway/img/script-text-play.svg

USER omero-web

