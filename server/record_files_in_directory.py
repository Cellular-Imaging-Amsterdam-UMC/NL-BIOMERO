#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import glob
import json
import omero.scripts as scripts
from omero.rtypes import rstring

# The base directory is the folder in the LAN where all core* folders are stored
base_directory = '/data'
groups_dir_prefir = 'core'

#Gets the data files to make the file selector
def record_files_in_directory(directory):
    """Uses glob to record files in a directory and its subdirectories."""
    pattern = os.path.join(directory, '**[!.zarr]','*')  # Pattern to match all files in all subdirectories
    recorded_files = []
    for file_path in glob.iglob(pattern, recursive=True):
        if os.path.isfile(file_path):
            relative_path = os.path.relpath(file_path, directory)
            relative_path = os.path.join(directory, relative_path)
            recorded_files.append({
                "path": relative_path,
                "filename": os.path.basename(file_path)
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
            error_message = f"Base directory '{base_directory}' not found"
            client.setOutput("Output", rstring(json.dumps({"error": error_message})))
            return

        group_directories = [d for d in os.listdir(base_directory) if os.path.isdir(os.path.join(base_directory, d)) and d.startswith(groups_dir_prefir)]

        # Check if any 'core*' folders are found
        if not group_directories:
            error_message = "No core group folders found"
            client.setOutput("Output", rstring(json.dumps({"error": error_message})))
            return

        files_by_directory = {}
        for directory in group_directories:
            full_path = os.path.join(base_directory, directory)
            files_by_directory[directory] = record_files_in_directory(full_path)

        # Check if no files are found in all core group directories
        if not any(files_by_directory.values()):
            error_message = "No files found in core group directories"
            client.setOutput("Output", rstring(json.dumps({"error": error_message})))
            return

        output = {
            "Recorded Files": files_by_directory,
            "Group Directories": group_directories
        }
        output_str = json.dumps(output)
        client.setOutput("Output", rstring(output_str))

    except Exception as e:
        client.setOutput("Output", rstring(json.dumps({"error": str(e)})))

    finally:
        client.closeSession()

if __name__ == "__main__":
    run_script()
