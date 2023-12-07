#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
import omero.scripts as scripts
from omero.rtypes import rstring

# The base directory is the folder in the LAN where all core* folders are stored
base_directory = '/data'
groups_dir_prefir = 'core'

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

        authors=["Rodrigo Rosas-Bertolini"],
        institutions=["Amsterdam University Medical Center"],
        contact="r.rosas@amsterdamumc.com",
    )
    try:
        # Check if base_directory exists
        if not os.path.exists(base_directory):
            return client.setOutput("Message", rstring(f"Base directory '{base_directory}' not found"))

        group_directories = [d for d in os.listdir(base_directory) if os.path.isdir(os.path.join(base_directory, d)) and d.startswith(groups_dir_prefir)]

        # Check if any 'core*' folders are found
        if not group_directories:
            return client.setOutput("Message", rstring("No core group folders found"))

        files_by_directory = {}
        for directory in group_directories:
            full_path = os.path.join(base_directory, directory)
            files_by_directory[directory] = record_files_in_directory(full_path)


        output = {
            "Recorded Files": files_by_directory,
            "Group Directories": group_directories
        }
        output_str = json.dumps(output)
        client.setOutput("Output", rstring(output_str))

    finally:
        client.closeSession()

if __name__ == "__main__":
    run_script()