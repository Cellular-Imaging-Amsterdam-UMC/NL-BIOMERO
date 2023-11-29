#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import omero.scripts as scripts
from omero.rtypes import rstring
from omero.gateway import BlitzGateway

#Gets the data files to make the file selector
def record_files_in_directory(directory):
    """Recursively record all files in a directory and its subdirectories."""
    recorded_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            relative_path = os.path.relpath(file_path, directory)
            relative_path = os.path.join(directory, relative_path)
            recorded_files.append({
                "path": relative_path,
                "filename": file
            })
    return recorded_files  

def run_script():
    client = scripts.client(
        'get_folder_structure.py',
        """Description of your script.""",

        scripts.String("directory", optional=False),
        
        authors=["Your Name"],
        institutions=["Your Institution"],
        contact="your.email@example.com",
    )
    try:
        directory = client.getInput("directory").getValue()  # Get the 'directory' input parameter
        # Create a connection
        conn = BlitzGateway(client_obj=client)
        # Call record_files_in_directory
        recorded_files = record_files_in_directory(directory)
        # Set the outputs
        # client.setOutput("Recorded Files", rstring("\n".join(recorded_files)))
        client.setOutput("Recorded Files", rstring("\n".join(map(str, recorded_files))))
        client.setOutput("directory", rstring(directory))
        
    finally:
        client.closeSession()  # Close the session

if __name__ == "__main__":
    run_script()