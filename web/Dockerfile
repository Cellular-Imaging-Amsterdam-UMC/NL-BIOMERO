FROM openmicroscopy/omero-web-standalone:5.24.0

USER root

# This section of the code will use the get_iamges_for_login_page to stage an edited verion of the login.html script
# The edited version of the login.html script will have the images in the Display_Images directory coded in
# Restart the container if you change images contained in the Display_Images directory
# Copy the script and images
COPY local_omeroweb_edits/get_images_for_login_page.py /script/
COPY local_omeroweb_edits/login.html /script/
COPY local_omeroweb_edits/Display_Images /images/



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

# Run the script to update the login.html file
RUN python3.9 /script/get_images_for_login_page.py /images/ /script/login.html ./webclient/templates/webclient/login.html

# Configuration file
ADD local_omeroweb_edits/01-default-webapps.omero /opt/omero/web/config

# Add the new login images to the login page image directory
ADD local_omeroweb_edits/Display_Images ./webclient/static/webclient/image/login_page_images/

# Copy the modified login.html
# COPY --from=builder /script/login.html ./webclient/templates/webclient/login.html

# Double-Click for better file browsing
ADD local_omeroweb_edits/group_user_dropdown2.html ./webclient/templates/webclient/base/includes/group_user_dropdown2.html
ADD local_omeroweb_edits/layout.css ./layout.css

# Improved top menu button clarity
ADD local_omeroweb_edits/ome.header.css ./webgateway/static/webgateway/css/ome.header.css
ADD local_omeroweb_edits/script-text-play.svg ./webgateway/static/webgateway/img/script-text-play.svg
USER omero-web

