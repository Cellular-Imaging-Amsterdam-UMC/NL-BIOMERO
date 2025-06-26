⚠️ **Note**: this README is not up to date

# NL-BIOMERO Web Container  
Welcome to the NL-BIOMERO Web Container, a specialized deployment of OMERO tailored for the [Cellular Imaging lab at Amsterdam University Medical Center](https://github.com/Cellular-Imaging-Amsterdam-UMC). This deployment includes several customizations to enhance the user experience and functionality of the OMERO web interface.

This deployment includes the following customizations, located in the [local_omeroweb_edits](web/local_omeroweb_edits) folder:  
<br>**omero-database-pages** - Adds additional pages to the OMERO web interface for better database interaction and visualization.  
<br>**omero-script-menu-widget** - Replaces the script-dropdown functionality with a beautiful and stylishly understated widget.  
<br>**better_buttons** - Enhances the user interface by providing more intuitive and accessible buttons for common actions.  
<br>**pretty_login** - Improves the login page aesthetics for a more welcoming and user-friendly experience.

## Database Pages  
OMERO Database Pages introduces additional pages accessible via buttons available in the middle_header to the OMERO web interface. The pages are dedicated to embedding iframe views of Metabase dashboards. The Imports and Workflow pages showcase the history and status of imports and workflows run by each user, respectively. Administrators have access to the Metabase interface, whereas non-admin users are restricted to their own imports and workflows. **IMPORTANT**: This add-on relies on the Metabase container and requires configuring the Metabase server. See the [Metabase documentation](../metabase/README.md) for more details.

## Script Menu Widget  
The legacy script browsing enabled by the script dropdown menu is limited and not user-friendly. Without already being familiar with all the available scripts, it is hard to discover new functionality as the descriptions are only available after opening the script. Even for experienced users, the need to click through a couple of tabs to reach scripts was a nuisance.  
- Legacy dropdown menu with tabs and subtabs that a user must follow.  
- No visible script description until the script button is clicked.  
- No search function available for users familiar with the scripts.  

    ![legacy_script_dropdown](/web/Documentation/Images/legacy_script_dropdown.PNG)

Empowering new users to discover scripts that best suit them is a priority of Cellular Imaging. On the other hand, the wish of experienced users is the ability to quickly reach their favorite scripts. Both browsability and searchability of scripts were desired functionalities that we set out to provide via this script menu widget. The script menu widget displays the descriptions of scripts in a card-grid format that contains the script in an easily browsable format. The card-grid has a two-tier folder structure of 'tabs' containing a list of 'directories', which in turn contain the 'script-cards'.

- Script menu widget is small by default upon clicking the 'Script Menu' button, and next to it, the large format.  
- Tabs [biomero, omero] available to separate scripts at a higher level.  
- Directories [analysis scripts, annotation scripts, etc.] separating related scripts.  
- Visible description of the scripts in the large format of the widget.  
- Search field for improved findability. If autocomplete is enabled in your browser, pressing enter and reloading the page will record the search.  
- Double-clicking on the gray header of the script menu widget will toggle between two common widget positions/sizes. Give it a try!  

    ![script_menu_widget_small](/web/Documentation/Images/script_menu_widget_small.PNG)  
    ![script_menu_widget_large](/web/Documentation/Images/script_menu_widget_large2.PNG)

## Better Buttons  
Enhances the OMERO web interface by providing more intuitive and accessible buttons for common actions and improves the fluidity of group and user selection. It achieves this by editing some button names via the `web/local_omeroweb_edits/01-default-webapps.omero` configuration file and by overriding default files of OMERO web during the build process:  
- `./webclient/templates/webclient/base/includes/group_user_dropdown2.html`  
- `./webclient/static/webclient/css/layout.css`  
- `./webclient/templates/webclient/data/containers.html`  
- `./webclient/templates/webclient/public/public.html`  
- `./webgateway/static/webgateway/css/ome.header.css`

**Improvement list with before and afters**  
- Renames the default titles of buttons (defined in `.omero` config file).  
- From the middle_header, removes unnecessary buttons like 'History' as its functionality is replaced by Database Pages.  
- From the middle_header, replaces 'Any Value' title with the more intuitive 'Annotation Search' title.  
- Reformatting the middle_header 'Scripts' and 'Activities' buttons. The legacy icons for these buttons were inappropriate; for some reason, the settings and recycling icons were used. Now, a more appropriate icon and styling have been applied to make it easier for users to find and recognize the buttons.  
- Added functionality that constricts the top corner OMERO title and icon to leave more room for middle_header buttons (not shown).  

    ![middle_header_before](/web/Documentation/Images/middle_header_before.PNG)  
    ![middle_header_after](/web/Documentation/Images/middle_header_after.PNG)

- From the left_panel_toolbar: Removes Shares tab (discontinued functionality), and Create Share button from left_panel_toolbar.  
- Improved group_user_selection by adding 'Group Select' button title for clarity, as the original button was not recognizable as a button by new users.  
- Added functionality that enables double-clicking on a group name in the dropdown_menu to go directly to 'All_Members' of said group.  

    ![group_user_selection_before](/web/Documentation/Images/left_pange_toolbar_before.PNG)  
    ![group_user_selection_after](/web/Documentation/Images/left_pange_toolbar_after.PNG)

## Pretty Login  
Focuses on improving the aesthetics of the login page, creating a more welcoming and user-friendly experience. This enhancement is part of our effort to make the interface more appealing and easier to navigate for all users. The deployment of this add-on overrides the following files:  
- `./webclient/templates/webclient/login.html` (updated via script)  
- `./webclient/static/webclient/image/login_page_images/` (directory populated with images)  
- `./webgateway/static/webgateway/css/ome.login.css`

**Improvement list with before and afters**  
- Removed the server choice, which is not useful for common users and redundant for admins.  
- Placed the 'OMERO.web' banner neatly inside the brighter window.  
- Added space for documentation that users may need to access even before logging in (e.g. 'how to login' page).  

    ![login_page_before](/web/Documentation/Images/login_page_before.PNG)  
    ![login_page_after](/web/Documentation/Images/login_page_after.PNG)


## Contributing  
We welcome contributions to improve NL-BIOMERO. Please fork the repository and submit a pull request with your changes.  
A `Docker_Development` file has been added. The file requires the developer to clone a repository for testing (in `web/local_omeroweb_edits`) and edit the `Docker_Development` file with the appropriate paths to both ADD and RUN commands.

## License  
BSD-2

## Contact  
For questions or support, please contact the Cellular Imaging lab at Amsterdam University Medical Center.

---

Thank you for using NL-BIOMERO!
