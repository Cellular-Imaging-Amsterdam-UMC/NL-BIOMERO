//   Copyright (C) 2016 University of Dundee & Open Microscopy Environment.
//   All rights reserved.

//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Affero General Public License as
//   published by the Free Software Foundation, either version 3 of the
//   License, or (at your option) any later version.

//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU Affero General Public License for more details.

//   You should have received a copy of the GNU Affero General Public License
//   along with this program.  If not, see <http://www.gnu.org/licenses/>.

//   Author: Aleksandra Tarkowska <A(dot)Tarkowska(at)dundee(dot)ac(dot)uk>,

//   Version: 1.0

//   Here we override center_plugin.thumbs.js.html


$(function() {

    var jstreeInst = $.jstree.reference('#dataTree');

    var old_update_thumbnails_panel = window.update_thumbnails_panel;
    window.update_thumbnails_panel = function(event, data) {
        // Get the current selection
        var selected = jstreeInst.get_selected(true);
        if (selected.length > 0 ) {
            return old_update_thumbnails_panel(event, data);
        } else {
            OME.clearThumbnailsPanel();
            return false;
        }

    };

});
