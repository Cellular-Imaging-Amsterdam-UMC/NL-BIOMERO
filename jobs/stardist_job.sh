#!/bin/bash
#SBATCH   --partition=gpu                      # submit   to the gpu partition
#SBATCH   --gres=gpu:1                         # request 1 gpu node
#SBATCH   --job-name=Stardist_test             # name the job
#SBATCH   --output=Stardist_test-%N-%j.out     # write stdout/stderr   to named file
#SBATCH   --error=Stardist_test-%N-%j.err
#SBATCH   --time=0-00:30:00                    # Run for max of 0 days 00 hrs, 30 mins, 00 secs

#SBATCH   --nodes=1                            # Request N nodes
#SBATCH   --ntasks-per-node=8                  # Request n   cores per node
#SBATCH   --mem-per-cpu=2GB                    # Request nGB RAM per core

##Activate your python virtual environment
##using the correct path for the virtual environment
source /opt/omero/server/stardistenv/bin/activate  

python Example_EnvStardist_Segmentation.py

