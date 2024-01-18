# Upgrade your dockerized OMERO web
omero-serevr v. 5.6.10 ~~~~~~ omero-web v. 5.24.0

Torec Luik & Rodrigo Rosas-Bertolini

## Non-hosted login logo
OMERO web expects the login page logo of the institution to be hosted (in other words, it wants a URl)

We use a PNG and so can you. To do so, place the file in the following location.

    # Path to custom login page logo

## Double-Click for better file browsing 
Upgrading file browsing by enabling double click to navigate groups. Double clicking on a group now takes you to the group with the 'All Members' selected, meaning that you will see the data of all users by default and only if you choose so you can delve into the data of individual users. Additionally, "Group Select" title added to the group button for clarity.

**omeroweb\webclient\templates\webclient\base\includes\group_user_dropdown2.html**

```javascript
                        // NEW: Log a message when a Group list item is double-clicked
                        $("#groupList").on("dblclick", "li a", function(event) {
                            event.preventDefault();
                            // Get the group id from the clicked element
                            var gid = $(this).attr("data-gid");
                            // Set the user to 'all users'
                            var url = "{% url 'change_active_group' %}?active_group=" + gid + "&url={% url 'userdata' %}?experimenter=-1";
                            window.location.href = url;
                        });
                        // End of NEW
                    });
                }
            }
            return false;
        });

        // Any clicks that bubble up to body hide list...
        $('body').on('click', function(event) {
            $listViewPort.hide();
        });

    });
</script>

<ul id="group_user_chooser">
	
	
    <li class="dropdown_menu">
       
	    <!-- Group / User drop-down -->
        
        <div id="groupsUsersButton" title="Switch Group/User">
            <div class="group-select-text">Group Select </div>
            <div class="group-image">
                <img 
                {% if active_group.getDetails.getPermissions.isGroupWrite %} src="{% static 'webclient/image/group_green16.png' %}"
                {% else %}
                    {% if active_group.getDetails.getPermissions.isGroupAnnotate %} src="{% static "webclient/image/group_orange16.png" %}"
                    {% else %}
                        {% if active_group.details.permissions.isGroupRead %} src="{% static "webclient/image/group_red16.png" %}"
                        {% else %}
                            src="{% static "webclient/image/personal16.png" %}"
                        {% endif %}
                    {% endif %}
                {% endif %} />
            </div>
            <span>{{ active_group.name }}</span><span>{{ active_user.getFullName }}</span>
        </div>

        <div id="listViewPort" class="dropdown"></div>
    </li>
</ul>
{% endif %}
</script>
```

**local_omeroweb\webclient\static\webclient\css\layout.css**
```css
/* NEW css for groupsUsersButton */
        #groupsUsersButton {
            display: inline-flex;
            flex-direction: row; 
            align-items: center;
            overflow:hidden;
            padding:.3em 1.8em .3em .7em;
            -webkit-border-radius:5px; /* Saf3+, Chrome */
            -moz-border-radius:5px; /* FF1+ */
            border-radius:5px; /* Opera 10.5, IE 9 */ 
            font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight:500;
            color:white;
            background: url(../image/group_dropdown_arrow.png) 97% center no-repeat;
            cursor:pointer;
            position:relative;
            text-shadow: 0 1px 0 rgba(0,0,0,.4);
            margin-top:4px;
            }
        
            #groupsUsersButton img {
                margin-right:6px;
            }
        
            #groupsUsersButton span {
                font-size:1.15em;
                line-height:1.6em;
                padding-right:8px;
                color:white;
                font-weight:900;
            }

            #groupsUsersButton span:last-child {
                color:rgba(255,255,255,.7);
                font-weight:700;
                font-family: 'HelveticaNeue', Helvetica, Arial, sans-serif;
            }

    /* New styles */
    .group-select-text {
        font-size: 1.15em;
        line-height: 1.6em;
        color: white;
        font-weight: 900;
        padding-right: 8px;
    }

    .group-image img {
        margin-right: 6px;
    }
/* End NEW */     
```

## Improved top menu button clarity
Removed Mapr tab as it is not commonly used and instead clutters the middle header. History button title changed to Upload History.
Redesigned script button for clarity and aesthetic preference.

**local_omeroweb_config\01-default-webapps.omero**

 config set -- omero.web.ui.top_links '[["Data", "webindex", {"title": "Browse Data via Projects, Tags etc"}],["Upload History", "history", {"title": "Upload History"}], ["Figure", "figure_index", {"title": "Open Figure in new tab", "target": "_blank"}], ["Help", "https://help.openmicroscopy.org/", {"title":"Open OMERO user guide in a new tab", "target":"new"}]]'




    
