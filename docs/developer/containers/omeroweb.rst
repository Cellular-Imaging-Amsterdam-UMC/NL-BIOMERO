OMERO Web Container
===================

The OMERO web container provides the web interface with extensive customizations and plugin integrations, specifically designed for development workflows.

Overview
--------

Based on ``openmicroscopy/omero-web-standalone``, this container includes:

* Custom web interface modifications
* Multiple OMERO plugins pre-installed
* Development-friendly configuration
* Integration with external services (Metabase, BIOMERO)

Development Workflow
--------------------

Development Mode
~~~~~~~~~~~~~~~

The development docker-compose (``docker-compose-dev.yml``) handles the web container specially:

* **Container stays alive** without starting OMERO.web automatically
* **Manual control** over web service restarts for live development
* **Volume mounts** for real-time code changes

**Why this approach?**
   For active plugin development, especially with the OMERO.biomero plugin, you need frequent restarts and live code changes.

OMERO.biomero Plugin Development
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The primary development target is the `OMERO.biomero plugin <https://github.com/Cellular-Imaging-Amsterdam-UMC/OMERO.biomero/tree/main>`_:

1. **Clone the plugin** in an adjacent folder to NL-BIOMERO:

.. code-block:: bash

   cd /path/to/workspace/
   git clone https://github.com/Cellular-Imaging-Amsterdam-UMC/OMERO.biomero.git
   # Your structure should be:
   # workspace/
   # ├── NL-BIOMERO/
   # └── OMERO.biomero/

2. **Follow the plugin README** for development setup
3. **Use the development container** for testing

**OMERO.biomero Features:**
   * **React.js user interface** for modern web interactions
   * **Django API** for service integration
   * **Service orchestration** for BIOMERO workflows
   * **Version 2.0 developments** with enhanced UI/UX

Key Installed Plugins
---------------------

Core OMERO Plugins
~~~~~~~~~~~~~~~~~~

.. code-block:: dockerfile

   RUN /opt/omero/web/venv3/bin/pip install \
           omero-figure \           # Figure creation and export
           omero-iviewer \          # Advanced image viewer
           omero-fpbioimage \       # FPBioimage integration
           omero-mapr \             # Metadata annotation and search
           omero-parade \           # Plate analysis and review
           omero-webtagging-autotag \ # Automatic tagging
           omero-webtagging-tagsearch # Tag-based searching

Supporting Libraries
~~~~~~~~~~~~~~~~~~~

**OMERO.forms Plugin**
   - Purpose: Dynamic form creation for data collection
   - Special handling: Automated user creation via startup scripts
   - Scripts: ``44-create_forms_user.py`` and ``45-fix-forms-config.sh``
   - Benefit: No manual setup required for forms functionality

**OMERO ADI (Automated Data Import)**
   - Source: `OMERO-Automated-Data-Import <https://github.com/Cellular-Imaging-Amsterdam-UMC/OMERO-Automated-Data-Import>`_
   - Purpose: Automated import order creation
   - Integration: Used by OMERO.biomero for import workflows

**BIOMERO Library**
   - Source: `biomero <https://github.com/NL-BioImaging/biomero>`_
   - Purpose: BIOMERO Django API integration (REST API for BIOMERO via python library)
   - Configuration: BIOMERO configuration editable via ``/etc/slurm-config.ini`` by the User Interface

Custom Interface Modifications
------------------------------

.. warning::
   These direct OMERO.web modifications may be replaced by plugin-based approaches in future versions.

Current modifications include:

**Pretty Login Page**
   - Enhanced visual design for login interface
   - Script: ``get_images_for_login_page.py``
   - Assets: Custom CSS and images

**Better Buttons**
   - Improved button clarity and UX
   - Modified default OMERO.web templates

**Database Pages Integration** *(Deprecated)*
    - *Replaced by OMERO.biomero plugin*
    - *Legacy features:*
      - Metabase dashboard embedding
      - Custom navigation elements

Dockerfile Key Sections
------------------------

**Plugin Installation**:

.. code-block:: dockerfile

   # Install OMERO.boost for BIOMERO integration
   RUN git clone -b main https://github.com/Cellular-Imaging-Amsterdam-UMC/omero-boost.git /opt/omero/web/omero-boost
   RUN /opt/omero/web/venv3/bin/pip install -e /opt/omero/web/omero-boost

**Automated OMERO.forms Setup**:

.. code-block:: dockerfile

   # Install OMERO.forms and setup automation
   RUN /opt/omero/web/venv3/bin/pip install omero-forms==2.1.0
   ADD web/44-create_forms_user.py /startup/
   ADD web/45-fix-forms-config.sh /startup/

**Interface Customizations**:

.. code-block:: dockerfile

   # Custom login page and styling
   RUN python3.9 /script/get_images_for_login_page.py /images/ /script/login.html ./webclient/templates/webclient/login.html
   ADD web/local_omeroweb_edits/pretty_login/login_page_images ./webclient/static/webclient/image/login_page_images/

Development Guidelines
----------------------

Starting Development
~~~~~~~~~~~~~~~~~~~~

1. **Use the development compose**:

.. code-block:: bash

   docker-compose -f docker-compose-dev.yml up -d

2. **The web container will be running but OMERO.web will not be started**

3. **For OMERO.biomero development**:

   - Clone the OMERO.biomero repository adjacent to NL-BIOMERO
   - Follow the plugin's README for development setup
   - Use the plugin's development tools to control OMERO.web

Making Changes
~~~~~~~~~~~~~

**For Plugin Development**:
   - Work in the respective plugin repository
   - Use volume mounts for live code changes; change to versioned pip installs on release.
   - Restart OMERO.web as needed for testing

**For Interface Modifications**:
   - Prefer plugin-based approaches over direct file modifications
   - Test changes in development mode before building production images
   - Consider migration path to plugin-based solutions

**For Configuration Changes**:
   - Modify ``01-default-webapps.omero`` for web app configurations
   - Use environment variables for dynamic settings
   - Test startup script changes in development containers

Testing
~~~~~~~

.. code-block:: bash

   # Build with changes
   docker-compose -f docker-compose-dev.yml build omeroweb
   
   # Test in development mode
   docker-compose -f docker-compose-dev.yml up -d
   
   # Check logs for issues
   docker-compose -f docker-compose-dev.yml logs omeroweb

Related Documentation
---------------------

* `OMERO.biomero Plugin <https://github.com/Cellular-Imaging-Amsterdam-UMC/OMERO.biomero/tree/main>`_ - Primary development target
* :doc:`omeroserver` - Server container development  
* :doc:`../architecture` - Overall system architecture
* `OMERO.web Developer Documentation <https://omero.readthedocs.io/en/stable/developers/Web/>`_