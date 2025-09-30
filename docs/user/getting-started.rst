Getting Started
===============

First Steps with NL-BIOMERO
---------------------------

Access the Platform
~~~~~~~~~~~~~~~~~~~

After deployment, access these interfaces:

* **OMERO.web**: http://localhost:4080
  - Login: ``root`` / ``omero`` (change default password)
* **Metabase**: http://localhost:3000  
  - Login: ``admin@biomero.com`` / ``b1omero`` (change default password)

Default Login
~~~~~~~~~~~~~

Use the default credentials to get started:

- **Username**: ``root``
- **Password**: ``omero``

.. warning::
   **Security Setup Required**: Change default passwords and configure security settings immediately after first deployment.
   
   For OMERO: Change the default password after first login.
   
   For Metabase: Follow the complete security setup procedure in :doc:`../developer/containers/metabase` 
   which includes changing passwords, updating database connections, and regenerating security keys.

Next Steps
~~~~~~~~~~

1. **Import Data** - See :doc:`data-import` for uploading images
2. **Run Analysis** - See :doc:`biomero-workflows` for bioimage analysis
3. **View Results** - Use the web interface to explore results
4. **Analytics** - Use Metabase for advanced visualization

Platform Overview
-----------------

.. include:: ../../README.md
   :parser: myst_parser.sphinx_
   :start-after: ## 📊 Data Import
   :end-before: ## 🛠️ Container Management