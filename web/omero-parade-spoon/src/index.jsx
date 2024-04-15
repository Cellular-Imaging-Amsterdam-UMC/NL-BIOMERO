//
// Copyright (C) 2018 University of Dundee & Open Microscopy Environment.
// All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SearchApp from './search/SearchApp';
import _config from './config'

function omero_parade(jstree, config) {
    Object.assign(_config, config);
    const iframe = document.getElementById('myCustomIFrame');
    if (iframe) {
        // Listen for the iframe to load
        iframe.onload = function() {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            // Directly target the existing mount point inside the iframe
            const mountPoint = iframeDocument.getElementById('omero_parade_mount_point');
            // Check if the mount point exists
            if (mountPoint) {
                // Render the App component inside the existing mount point
                ReactDOM.render(<App jstree={jstree} />, mountPoint);
            } else {
                console.error('Mount point not found in iframe');
            }
        };
    } else {
        console.error('Iframe not found');
    }
}

function full_page_app(element_id, config) {
    Object.assign(_config, config);
    ReactDOM.render(
        <App />, // Changed from SearchApp to App
        document.getElementById(element_id)
    );
}

export default { omero_parade, full_page_app }
