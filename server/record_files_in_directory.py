#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import glob
import json
import omero.scripts as scripts
from omero.rtypes import rstring
from omero.gateway import BlitzGateway

# The base directory is the folder in the LAN where all core* folders are stored
base_directory = '/data'
groups_dir_prefir = 'core*'

# Gets the data files to make the file selector
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
        """Code never lies, annotations sometimes do.""",
        authors=["Rodrigo Rosas-Bertolini"],
        institutions=["Amsterdam University Medical Center"],
        contact="r.rosas@amsterdamumc.nl",
    )
    message = ""
    try:
        group_directories = glob.glob(os.path.join(base_directory, groups_dir_prefir))  

        if not group_directories:
            message = "No directories starting with 'core*' found in base directory."
            client.setOutput("Message", rstring(message))
            return

        all_recorded_files = []
        for directory in group_directories:
            recorded_files = record_files_in_directory(directory)
            all_recorded_files.extend(recorded_files)

        if not all_recorded_files:
            message = "No files found in 'core*' directories."
            client.setOutput("Message", rstring(message))
            return

        json_output_files = json.dumps(all_recorded_files)
        json_output_directories = json.dumps(group_directories)

        client.setOutput("Recorded Files", rstring(json_output_files))
        client.setOutput("Group Directories", rstring(json_output_directories))
        message = "Script executed successfully."

    except Exception as e:
        message = f"Script execution error: {str(e)}"

    finally:
        client.setOutput("Message", rstring(message))
        client.closeSession()

if __name__ == "__main__":
    run_script()
