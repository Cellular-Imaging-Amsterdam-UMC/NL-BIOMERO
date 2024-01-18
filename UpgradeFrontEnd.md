# Upgrade your dockerized OMERO web
omero-serevr v. 5.6.10 ~~~~~~ omero-web v. 5.24.0

Torec Luik & Rodrigo Rosas-Bertolini

## Non-hosted logo in login page
OMERO web expects the login page logo of the institution to be hosted (in other words, it wants a URl)

We use a PNG and so can you. To do so, place the file in the following location. Then edit the styles to your liking. Stay classy by choose a logo with no background.

**local_omeroweb\webclient\static\webclient\image\Amsterdam-UMC.png**


**local_omeroweb\webclient\templates\webclient\login.html**

```html
<div style="margin: 15% auto 0; height: 350px"></div>
<div class="login-logos">
    <div class="custom_logo">
        <div class="custom_logo">
            <img src="{% static "webclient/image/Amsterdam-UMC.png" %}" style="max-width: 600px; height: auto;" />
        </div>
    <img src="{% static "webclient/image/logo_login_web.png" %}" />
</div>
```

## No server selector in login page
We removed the server selector to remove clutter for users. Instead, we use different domains for different servere.

**local_omeroweb\webclient\templates\webclient\login.html**
```html
<div id="login">
    {% block login %}
    <form class="standard_form inlined" action="{% url 'weblogin' %}{% if url %}?{{url}}{% endif %}" method="post">{% csrf_token %}
            {% if error %}
				<span class="error">{% trans "Error:" %} {{ error | urlize }}</span>
			{% endif %}
			
            <!--NEW: removed server option-->
			<input type="hidden" name="{{ form.server.name }}" value="1" />

			<div>
				{% trans form.username.label_tag %}
				<!--{% if form.username.field.required %}*{% endif %} -->
				{{ form.username }}
				<!-- Form Error -->
				{% if form.username.errors %}
                  {% for error in form.username.errors %}
                      <span class="form_error">{{ error|escape }}</span>
                  {% endfor %}
				{% endif %}
			</div>

```



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


**local_omeroweb\webgateway\static\webgateway\css\ome.header.css**
```css
	.header_toolbar > li:first-child{
		border-left:none;
	}
	
	.header_toolbar > li:last-child{
		border-right:none;		
	}

	/* NEW: Clearer Scripts and Activity button */
		#scriptButton::before {
			content: attr(title);
			background: url(../img/script-text-play.svg) no-repeat left center;
			background-size: contain; /* or 'cover' depending on your needs */
			padding-left: 27px; /* Adjust as needed */
			padding-top: 0.5em;
			padding-bottom: 0.5em;
			padding-right: 0.5em;
			filter: drop-shadow(0 1px 0px rgba(0,0,0,.4));
		}


		#scriptButton::before {
			display: flex;
			align-items: center;
			justify-content: flex-end; /* Align text to the right */
			color: hsl(210,20%,90%); /* Lighter color */
			font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; /* Font family from #middle_header_left a, #show_user_dropdown, #public_login_button */
			font-weight: 500; /* Font weight from #middle_header_left a, #show_user_dropdown, #public_login_button */
			text-shadow: 0 1px 0px rgba(0,0,0,.4); /* Text shadow from #middle_header_left a, #show_user_dropdown, #public_login_button */
			font-size: 1.2em; /* Font size from #middle_header_left a, #show_user_dropdown, #public_login_button */
			height: calc(100% - 1em); /* Adjust for padding */
		}

		#launch_activities::before, #dataUploadButton::before {
		    display: flex;
		    align-items: center;
		    justify-content: flex-start; /* Align text to the left */
		    color: hsl(210,20%,90%); /* Lighter color */
		    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; /* Font family from #middle_header_left a, #show_user_dropdown, #public_login_button */
		    font-weight: 500; /* Font weight from #middle_header_left a, #show_user_dropdown, #public_login_button */
		    text-shadow: 0 1px 0px rgba(0,0,0,.4); /* Text shadow from #middle_header_left a, #show_user_dropdown, #public_login_button */
		    font-size: 1.2em; /* Font size from #middle_header_left a, #show_user_dropdown, #public_login_button */
		    padding: 0.5em; /* Add padding */
		    height: calc(100% - 1em); /* Adjust for padding */
		}

		#scriptButton:hover::before, #launch_activities:hover::before, #dataUploadButton:hover::before {
			color: white; /* Color when hovered */
		}
		
		#launch_activities::before{
		    content: "Activities Log";
		}

       #dataUploadButton::before{
           content: "Upload Data";
       }
		/* NEW: Ends */
		
		#script_notifications li:first-child {
			 -webkit-border-top-left-radius:3px; /* Saf3+, Chrome */
				  -moz-border-radius-topleft:3px; /* FF1+ */
				      border-top-left-radius:3px; /* Opera 10.5, IE 9 */ 
					   -webkit-border-bottom-left-radius:3px;
					       -moz-border-radius-bottomleft:3px;
					           border-bottom-left-radius:3px;  
		}
		
		#script_notifications li:last-child {
			 -webkit-border-top-right-radius:3px; /* Saf3+, Chrome */
				  -moz-border-radius-topright:3px; /* FF1+ */
				      border-top-right-radius:3px; /* Opera 10.5, IE 9 */ 
					   -webkit-border-bottom-right-radius:3px;
					       -moz-border-radius-bottomright:3px;
					           border-bottom-right-radius:3px;  
		}
```
**local_omeroweb\webgateway\static\webgateway\img\script-text-play.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="hsl(210, 20%, 90%)" d="M13.8 22H5C3.3 22 2 20.7 2 19V18H13.1C13 18.3 13 18.7 13 19C13 20.1 13.3 21.1 13.8 22M13.8 16H5V5C5 3.3 6.3 2 8 2H19C20.7 2 22 3.3 22 5V6H20V5C20 4.4 19.6 4 19 4S18 4.4 18 5V13.1C16.2 13.4 14.7 14.5 13.8 16M8 8H15V6H8V8M8 12H14V10H8V12M17 16V22L22 19L17 16Z" />
</svg>
```


    
