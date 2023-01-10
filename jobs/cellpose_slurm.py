#!/usr/bin/env python

import os

def mkdir_p(dir):
    '''make a directory (dir) if it doesn't exist'''
    if not os.path.exists(dir):
        os.mkdir(dir)
    

job_directory = "%s/.job" %os.getcwd()
scratch = os.environ['SCRATCH']
data_dir = os.path.join(scratch, '/project/LizardLips')

# Make top level directories
mkdir_p(job_directory)
mkdir_p(data_dir)

lizards=["LizardA","LizardB"]

for lizard in lizards:

    job_file = os.path.join(job_directory,"%s.job" %lizard)
    lizard_data = os.path.join(data_dir, lizard)

    # Create lizard directories
    mkdir_p(lizard_data)

    with open(job_file) as fh:
        fh.writelines("#!/bin/bash\n")
        fh.writelines("#SBATCH --job-name=%s.job\n" % lizard)
        fh.writelines("#SBATCH --output=.out/%s.out\n" % lizard)
        fh.writelines("#SBATCH --error=.out/%s.err\n" % lizard)
        fh.writelines("#SBATCH --time=2-00:00\n")
        fh.writelines("#SBATCH --mem=12000\n")
        fh.writelines("#SBATCH --qos=normal\n")
        fh.writelines("#SBATCH --mail-type=ALL\n")
        fh.writelines("#SBATCH --mail-user=$USER@stanford.edu\n")
        fh.writelines("Rscript $HOME/project/LizardLips/run.R %s potato shiabato\n" %lizard_data)

    os.system("sbatch %s" %job_file)