import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// Export a function for rendering omero_parade as a centre panel plugin
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

// Full page app
function full_page_app(element_id, config) {
  Object.assign(_config, config);
  ReactDOM.render(
      <SearchApp />,
      document.getElementById(element_id)
  );
}

export default { omero_parade, full_page_app }