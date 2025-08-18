.. NL-BIOMERO documentation master file

Welcome to NL-BIOMERO's documentation!
======================================

**NL-BIOMERO** is a containerized deployment of OMERO with BIOMERO for bioimage analysis workflows, 
featuring automated data import, workflow management, and enhanced web interfaces.

This platform provides a complete solution for bioimage data management and analysis, combining:

* **OMERO** - Image data management platform
* **BIOMERO** - BioImage analysis workflows with Slurm integration
* **OMERO.biomero** - Modern web interfaces for data import and analysis
* **OMERO.forms** - Flexible form-based interfaces for metadata annotation
* **Metabase** - Analytics and visualization dashboards
* **Docker Compose** - Easy deployment and scaling scenarios

Getting Started
===============

Choose your deployment scenario:

* **New Installation**: Start with :doc:`sysadmin/deployment` for fresh deployments
* **Existing OMERO**: See :doc:`sysadmin/hybrid-deployment` for integration options  
* **Development**: Use :doc:`developer/contributing` for local development setup

.. toctree::
   :caption: System Administration
   :maxdepth: 3

   sysadmin/index

.. toctree::
   :caption: Developer Guide  
   :maxdepth: 3

   developer/index

.. toctree::
   :caption: User Guide
   :maxdepth: 3

   user/index

Quick Links
===========

* :doc:`sysadmin/deployment` - Deployment scenarios and setup
* :doc:`sysadmin/backup-restore` - Backup and restore procedures
* :doc:`user/getting-started` - First steps with NL-BIOMERO
* :doc:`developer/architecture` - Technical architecture overview

.. note::
   This documentation covers containerized deployment scenarios. For non-containerized 
   installations, refer to the individual component documentation.

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

