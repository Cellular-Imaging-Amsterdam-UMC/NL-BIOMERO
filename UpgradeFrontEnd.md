# Upgrade your dockerized OMERO web
omero-serevr v. 5.6.10

omero-web v. 5.24.0

Torec Luik & Rodrigo Rosas-Bertolini

## Non-hosted login logo
OMERO web expects the login page logo of the institution to be hosted (in other words, it wants a URl)

We use a PNG and so can you. To do so, place the file in the following location.

    # Path to custom login page logo

## File browsing 
Upgrading file browsing by enabling double click to navigate groups. Double clicking on a group now takes you to the group with the 'All Members' selected, meaning that you will see the data of all users by default and only if you choose so you can delve into the data of individual users.

    # Edited file
    local_omeroweb\webclient\templates\webclient\base\includes\group_user_dropdown2.html
    