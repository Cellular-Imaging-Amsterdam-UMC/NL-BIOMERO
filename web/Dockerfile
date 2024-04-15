FROM openmicroscopy/omero-web-standalone:5.24.0

USER root

# This section of the code will use the get_images_for_login_page to stage an edited verion of the login.html script
# The edited version of the login.html script will have the images in the Display_Images directory coded in
# Restart the container if you change images contained in the Display_Images directory
# Copy the script and images
COPY local_omeroweb_edits/get_images_for_login_page.py /script/
COPY local_omeroweb_edits/login.html /script/
COPY local_omeroweb_edits/Display_Images /images/

# Invalidate cache for development
# ADD "https://api.github.com/repos/Cellular-Imaging-Amsterdam-UMC/scripts_menu_widget_app/commits?per_page=1" latest_commit
# ADD "https://api.github.com/repos/rodrigolearns/omero-parade-spoon/commits?per_page=1" latest_commit

# Install Node.js and npm
RUN yum update -y && yum install -y nodejs npm
RUN npm install --global yarn
RUN /opt/omero/web/venv3/bin/pip install \
        'django-cors-headers' \
        omero-iviewer \
        omero-fpbioimage \
        omero-mapr \
        omero-webtagging-autotag \
        omero-webtagging-tagsearch \
        whitenoise 

# omero-figure \
# RUN /opt/omero/web/venv3/bin/pip install \
# 'git+https://github.com/rodrigolearns/omero-parade-spoon@master'

# Add a build argument for cache invalidation
ARG CACHEBUSTER=unknown

# Assuming the local repo is placed in the "web/local_omeroweb_edits/omero-parade-spoon" directory
COPY /omero-parade-spoon /opt/omero-parade-spoon
RUN /opt/omero/web/venv3/bin/pip install /opt/omero-parade-spoon


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

# # Edited for scripts_menu_widget
ADD scripts_menu_widget/base_container.html ./webclient/templates/webclient/base/base_container.html
ADD scripts_menu_widget/views.py ./webclient/views.py
ADD scripts_menu_widget/urls.py ./webclient/urls.py

# # Widget files
ADD scripts_menu_widget/iframe_content.html ./webclient/templates/webclient/base/includes/iframe_content.html
ADD scripts_menu_widget/iframe_script.js ./webclient/static/webclient/javascript/iframe_script.js
ADD scripts_menu_widget/iframe_style.css ./webclient/static/webclient/css/iframe_style.cs

USER omero-web
