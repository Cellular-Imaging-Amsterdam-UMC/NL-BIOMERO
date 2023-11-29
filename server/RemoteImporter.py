#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
RemoteImport.py

This script is modified to import only the files listed in a given JSON object.
The JSON object includes the paths to the files, the dataset ID, and the active group ID.

Usage:
- The script reads the JSON object from a form with specific fields.
- It then imports the files listed in the 'data_path' field into the dataset specified by 'dataset_id'.

------------------------------------------------------------------------
Copyright (C) 2022
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 3 of the License, or
  (at your option) any later version (GPL-3.0-or-later).
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License along
  with this program; if not, write to the Free Software Foundation, Inc.,
  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
-------------------------------------------------------------------------
@author Susanne Kunis
<a href="mailto:sinukesus@gmail.com">sinukesus@gmail.com</a>
@version 1.2.0

"""
import omero.scripts as scripts
from omero.gateway import BlitzGateway
import os
import sys
import omero
import omero.cli
from omero.rtypes import rstring,unwrap,rlong,robject

import shlex
import subprocess
import time
import tempfile
from pathlib import Path
import threading
import datetime
import glob
import shutil
from concurrent.futures import ProcessPoolExecutor


############### CONFIGURATIONS ######################################
# Set the number of directories to scan down for files during the import:
DEPTH= 10
# storage location for data for inplace import
#DATA_PATH= "/OMERO/OMERO_inplace" # <-- for 378
DATA_PATH= "/OMERO"
# enable/disable inplace_import
INPLACE_IMPORT = False
# enable/disable transfer of data to directory specified under DATA_PATH
COPY_SOURCES = True
# main directory of mount points #TODO: How do I mount this to the podman container so it actually opens the real Ldrive?
#MOUNT_PATH = "/OMERO/L-Drive/" # <-- for 378
#MOUNT_PATH = "/data/"
# mount point names/ workstations
#WORKSTATION_NAMES=["coreKrawczyk","coreReits"] #TODO: make getting this list dyanamic based on dirs starting with core in the appropiate Ldrive path.

#####################################################################
IDLETIME = 5


def get_formated_date():
    dt = datetime.datetime.now()
    year_m=dt.strftime("%Y-%m")
    day=dt.strftime("%d")
    time=dt.strftime("%H-%M-%S.%f")[:-3]

    return year_m,day,time


# creates directories: <username>_<userID>/yyyy-MM/dd/HH-mm-ss.SSS/
def create_new_repo_path(conn):
    p1= "%s_%s"%(conn.getUser().getName(),conn.getUser().getId())
    p2,p3,p4=get_formated_date()
    repo_path=os.path.join(DATA_PATH, os.path.join(os.path.join(os.path.join(p1, p2), p3), p4))
    print(repo_path)
    os.makedirs(repo_path, exist_ok=True)
    return repo_path

def createArgumentList(ipath,id,skip,depth):
    import_args =["import"]
    import_args.extend(['-c']) # continue if errors
    # TODO: skip for screendata and rename the created screen folder in omero like the given projectfolder's name?
    if INPLACE_IMPORT:
        import_args.extend(['--transfer=ln_s'])

    import_args.extend(['-d',str(id)])
    import_args.extend(['--parallel-fileset','2'])
    import_args.extend(['--parallel-upload','2'])
    import_args.extend(['--no-upgrade-check'])
    import_args.extend(['--depth',str(depth)])
    if skip and not COPY_SOURCES:
        import_args.extend(["--exclude=clientpath"])

    import_args.extend([Path(ipath).resolve().as_posix().replace("\ "," ")])

    return import_args


def parseLogFile(stderr):

    parseStr0 = "IMPORT_DONE Imported file:"
    parseStr1 = "ClientPath match for filename:"
    images_skipped=[]
    image_imported=[]
    index =0

    with open(stderr.name) as inFile:
        for line in inFile:
            if parseStr0 in line:
                p=(line[line.find(parseStr0)+len(parseStr0):len(line)]).strip()
                image_imported.append(p)
            if parseStr1 in line:
                p=(line[line.find(parseStr1)+len(parseStr1):len(line)]).strip()
                images_skipped.append(p)
            index=index+1

    return images_skipped,image_imported


# this function assume that minimum one image file was imported
# ATTENTION: doesn't work for unknown image file formats
# return
# 1. list of files for newly import (kind of this files was still imported)
# 2. list of other files (non image file format or not yet imported kind of file suffixes)
def validateImport(images_skipped,images_imported,ipath):

    # not_imported = image and non image file formats
    not_imported,suffixes = filterNotImported(images_skipped,images_imported,ipath)

    print("Not Imported: ",len(not_imported))
    print("Suffixes of nt imported: ",suffixes)

    newly_importList=[]
    other_fList=[]
    for f in not_imported:
        suffix = Path(f).suffix
        if suffix in suffixes:
            newly_importList.append("/"+f)
        else:
            other_fList.append(f)

    print ("Newly import files: ",len(newly_importList))
    print ("Other files: ",len(other_fList))

    return newly_importList,other_fList


# return
# 1. list of files that are not in the list of image_imported as well as in the skipped list,
#       but available in the imported source directory
# 2. list of imported or skipped file suffixes
def filterNotImported(images_skipped,image_imported,path):
    not_imported = []
    suffixes=[]

    filePaths=glob.iglob("%s/*.*"%path,recursive=False)

    for f in filePaths:
        if f.strip() not in image_imported:
            #print("\t [%s] is not in imported "%(f))
            if f.strip() not in images_skipped:
                #print("\t [%s] is not in skipped "%(f))
                not_imported.append(f)
            else:
                suffixes.append(Path(f).suffix)
        else:
            suffixes.append(Path(f).suffix)

    return not_imported,suffixes


def getFiles(pattern,dir,depth):
    result=[]

    if depth > 1:
        files=list(Path(dir).rglob(pattern))
    else:
        files=list(Path(dir).glob(pattern))
    for file in files:
        result.append(file.resolve().as_posix())

    if len(result)==0:
        return None

    return result


def attachFiles(conn, dataset_id,values,srcPath,namespace,depth):
    try:
        if len(values)==0:
            print ("\t WARN: No extension filter specified! No files will be attached.")
            return
        extFilters = values.split(",")
        destObj = None
        destObj = conn.getObject("Dataset", dataset_id)


        if destObj is None:
            print("ERROR attach files: can not attach files to object: None")
            return

        for extensionPattern in extFilters:
            extensionPattern.replace(" ", "")
            if len(extensionPattern) > 0:
                if not "." in extensionPattern:
                    extensionPattern = "." + extensionPattern
                if not "*" in extensionPattern:
                    extensionPattern = "*" + extensionPattern
                print("\t* attachments filter by pattern %s"%(extensionPattern))

                res=getFiles(extensionPattern,srcPath,depth)
                print("Found: ",list(res))
                if res is not None:
                    for attachFile in res:
                        print("\tATTACH File %s to %s "%(attachFile,str(destObj)))
                        if attachFile is not None:
                            file_ann = conn.createFileAnnfromLocalFile(attachFile, mimetype="text/plain",
                                                                       ns=namespace,
                                                                       desc=None)
                            #print "*** ATTACHING FileAnnotation to Dataset: ", "File ID:", file_ann.getId(), \
                            #      ",", file_ann.getFile().getName(), "Size:", file_ann.getFile().getSize()
                            destObj.linkAnnotation(file_ann)  # link to src file
                else:
                    print("\t=> no file found for pattern %s"% (extensionPattern))

    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print('ERROR: attach file: %s\n %s %s'%(str(e),exc_type, exc_tb.tb_lineno))


def cliImport(client,ipath,dataset_id,skip,depth,namespace,dataset=None,conn=None):
    # create import call string
    args = createArgumentList(ipath,dataset_id,skip,depth)
    print(args)
    images_skipped = None
    images_imported = None

    try:
        with tempfile.NamedTemporaryFile(suffix=".stdout") as stdout:
            with tempfile.NamedTemporaryFile(suffix=".stderr") as stderr:
                cli = omero.cli.CLI()
                cli.loadplugins()
                #cli.set_client(client)
                cli.set_client(client.createClient(secure=True))
                args.extend(["--file", stdout.name])
                args.extend(["--errs", stderr.name])

                cli.invoke(args)
                images_skipped,images_imported=parseLogFile(stderr)
                print ("Images imported: ",len(images_imported))
                print ("Images skipped: ",len(images_skipped))

                if dataset:
                    #append log file
                    #link reportFile to object
                    ann = conn.createFileAnnfromLocalFile(
                        stderr.name, mimetype="text/csv",ns=namespace+"_log" )
                    dataset.linkAnnotation(ann)

                return images_skipped,images_imported,stderr
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print ('ERROR at cli import: %s\n %s %s'%(str(e),exc_type, exc_tb.tb_lineno))
        return None,None,None
    finally:
        return images_skipped,images_imported,None


def retryImport(client, destinationID, filesForNewlyImport, images_skipped, numOfImportedFiles, skip,namespace):
    # retry failed imports
    not_imported_imgList = []
    messageRetry = ""
    retry=False
    if filesForNewlyImport is not None and len(filesForNewlyImport) > 0:
        retry = True
        messageRetry = "-----Retry Import For: " + str(len(filesForNewlyImport)) + " ------"
        print("---- Retry import-----")
        for f in filesForNewlyImport:
            print("Retry import for: ", f)
            messageRetry = messageRetry + "\n" + f
            r_images_skipped, r_images_imported,log = cliImport(client, f,destinationID,skip,1,namespace)

            # now the file should be imported or skipped
            if r_images_imported is not None and len(r_images_imported) > 0:
                numOfImportedFiles = numOfImportedFiles + 1
            elif r_images_skipped is not None and len(r_images_skipped) > 0:
                images_skipped.append(f)
            else: #failed
                not_imported_imgList.append(f)
    return messageRetry, not_imported_imgList,images_skipped,numOfImportedFiles, retry


def importContent(conn, dataset_id, jobs, depth):
    message = None
    try:
        namespace = ""  # Set namespace to an empty string
        client = conn.c

        all_skipped_img = []
        all_notImported_img = []

        for ipath in jobs:
            if ipath is not None:

                print("#--------------------------------------------------------------------\n")
                dataset_id = jobs[ipath]
                destDataset = conn.getObject('Dataset', dataset_id)

                if destDataset is not None:
                    skip = False

                    # call import
                    ipath = ipath.replace(" ", "\\ ")
                    print("\n Import files from : %s \n" % ipath)
                    images_skipped, images_imported, log = cliImport(client, ipath, dataset_id, skip, depth, namespace, destDataset, conn)

                    # validate import
                    filesForNewlyImport, other_fList = validateImport(images_skipped, images_imported, ipath)

                    messageRetry, not_imported_imgList, images_skipped, numOfImportedFiles, retry = \
                        retryImport(client, dataset_id, filesForNewlyImport, images_skipped, len(images_imported), skip, namespace)

                    message = "Imports Finished! "

                    all_notImported_img.extend(not_imported_imgList)
                    all_skipped_img.extend(images_skipped)

    # todo attach files in separates try catch
    except Exception as e:  # work on python 3.x
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print('ERROR: Failed to import: %s\n %s %s' % (str(e), exc_type, exc_tb.tb_lineno))
        return "ERROR"
    finally:

        if all_notImported_img is not None and len(all_notImported_img) > 0:
            print(messageRetry)
            print("NOT IMPORTED FILES:")
            print('\n'.join(map(str, all_notImported_img)))
            errmessage = "ATTENTION: there are failed imports (%d), please check the activity report" \
                         "or the dataset comment report" % (len(all_notImported_img))
            message = errmessage

        if not message:
            return "No imports!"
        return message


# jobs={path_0:tID_0,...,path_N:tID_N}
def getJobsAndTargets(conn, data_paths, dataset_id, destObj):
    '''Returns dictionary of src file paths and target object id'''
    jobs = {file_path: dataset_id for file_path in data_paths}
    return jobs, DEPTH

# copy files from source to destination
def copy_files(src_paths, dest_dir):
    # process all file paths
    for src_path in src_paths:
        # copy source file to dest file
        dest_path = shutil.copy(src_path, dest_dir)
        # report progress
        print(f'.copied {src_path} to {dest_path}', flush=True)


def transfer_data(conn, data_paths):
    # create the destination directory if needed
    dest = create_new_repo_path(conn)

    multithreaded = False
    if multithreaded:
        # determine chunksize
        n_workers = 4
        chunksize = round(len(data_paths) / n_workers)
        if chunksize == 0:
            chunksize = 1
        # create the process pool
        with ProcessPoolExecutor(n_workers) as exe:
            # split the copy operations into chunks
            for i in range(0, len(data_paths), chunksize):
                # select a chunk of filenames
                filenames = data_paths[i:(i + chunksize)]
                # submit the batch copy task
                for filename in filenames:
                    _ = exe.submit(shutil.copy, filename, dest)
        print('Done')
    else:
        # copy files one by one in a single thread
        for file_path in data_paths:
            shutil.copy(file_path, dest)

    return dest


def remoteImport(conn,dataset_id,data_paths):
    destObj = conn.getObject("Dataset", dataset_id)

    if destObj is None:
        return None, "ERROR: No correct target specified for import data!"

    startTime = time.time()

    client = conn.c
    #see https://lists.openmicroscopy.org.uk/pipermail/ome-users/2014-September/004783.html
    router = client.getProperty("Ice.Default.Router")
    router = client.getCommunicator().stringToProxy(router)
    for endpoint in router.ice_getEndpoints():
        client.ic.getProperties().setProperty("omero.host",endpoint.getInfo().host)
        break
    else:
        raise Exception("no host configuration found")

    s = client.getSession()
    re = s.createRenderingEngine()

    time.sleep(IDLETIME * 2)

    if COPY_SOURCES:
        # copy files to server
        dest=transfer_data(conn,data_paths)

    jobs,depth = getJobsAndTargets(conn,data_paths,dataset_id,destObj)

    if jobs is None:
        return destObj,"No files found!"

    print("\n Import sources and destinations:")
    for key in jobs:
        print(key, '->', jobs[key])

    message = importContent(conn, dataset_id, jobs, depth)

    endTime = time.time()
    print("Duration Import: ", str(endTime - startTime))

    return destObj, message

#####################################################################

def run_script():
    client = scripts.client(
        'RemoteImporter.py',
        """Description of your script.""",

        scripts.String("csrfmiddlewaretoken", optional=False),
        scripts.String("data_paths", optional=False),
        scripts.String("dataset_id", optional=False),
        scripts.String("active_group_id", optional=False),


        authors=["RRB"],
        institutions=["AMC"],
        contact="what is your insta shawty?",
    )

    try:
        csrfmiddlewaretoken = client.getInput("csrfmiddlewaretoken").getValue()
        data_paths = client.getInput("data_paths").getValue()
        dataset_id = client.getInput("dataset_id").getValue()
        active_group_id = client.getInput("active_group_id").getValue()  # Get the 'form' input parameter
        

        # Create a connection
        conn = BlitzGateway(client_obj=client)

        # Convert data_paths from string to list
        data_paths = data_paths.split(',')

        # Call remoteImport
        destObj, message = remoteImport(conn,dataset_id,data_paths)

        # Set the outputs
        client.setOutput("Import Message", rstring(str(message)))
        client.setOutput("csrfmiddlewaretoken Output", rstring(str(csrfmiddlewaretoken)))
        client.setOutput("data_paths Output", rstring(str(data_paths)))
        client.setOutput("dataset_id Output", rstring(str(dataset_id)))
        client.setOutput("active_group_id Output", rstring(str(active_group_id)))

    finally:
        client.closeSession()  # Close the session

if __name__ == "__main__":
    run_script()