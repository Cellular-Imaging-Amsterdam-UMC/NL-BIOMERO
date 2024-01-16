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

**omeroweb\webclient\templates\webclient\base\includes\group_user_dropdown2.html**

```javascript
                        // When hover or click on a Group, show Users...
                        $( "#groupList" ).on( "mouseenter click", "li a", function(event) {
                            event.preventDefault();
                            var gid = $(this).attr("data-gid");
                            $usersList.hide();
                            $("#groupMembers-" + gid).show();
                            return false;
                        });

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
```



    
