Metabase Container
==================

The Metabase container provides analytics and visualization dashboards for OMERO and BIOMERO data.


Why Metabase?
---------------------------------

Metabase provides a powerful analytics solution that integrates seamlessly with our OMERO and BIOMERO infrastructure:

* **Unified Data Visibility**: Direct connections to both OMERO and BIOMERO databases provide comprehensive analytics across our entire data ecosystem
* **Embedded in Workflow**: Dashboards integrate directly into OMERO.web, keeping analytics accessible within users' existing workflows
* **Real-time Insights**: Visual exploration of data and automated import metrics without leaving the platform
* **Customizable Views**: Tailored visualizations specific to BIOMERO that adapt to user context
* **Parameter-driven**: Dashboards dynamically respond to user identity and selections, providing personalized analytics
* **Low-code Development**: Build and modify sophisticated visualizations through both SQL and visual query builders

But mainly: they provide much-needed tracking of BIOMERO workflow progress and import progress.

Dashboard Development
---------------------

Access
~~~~~~

* Direct UI: http://localhost:3000 (container port 3000)
* Behind reverse proxy: typically available at ``/dashboard``

Dashboards in use
~~~~~~~~~~~~~~~~~

* ``#2`` BIOMERO analytics
* ``#6`` OMERO Automated Data Importer

Both are published and embedded in OMERO.web (via OMERO.biomero) using iFrames.

Embedding in OMERO.web
~~~~~~~~~~~~~~~~~~~~~~

* Requires a secret key: ``Settings > Admin settings > Embedding > Static embedding``  
  Regenerate the static embedding key there if needed.
* iFrame embedding supports parameters (e.g., user id) that can prefill dashboard filters. These parameters are provided by the OMERO.biomero app based on the logged-in OMERO user.
* See and test options via ``Sharing > Static embedding`` on the dashboard.

Editing dashboards
~~~~~~~~~~~~~~~~~~

* Open a dashboard and click ``Edit`` to add or modify cards (graphs/tables).
* Queries can be written in SQL or built via Metabase “Questions”.
* Cards can:

  - Link to other pages or set on-click behavior
  - Be connected to top-level filters (selectors) so they respond to filter changes (e.g., user/group)
* All changes are reflected immediately in embedded iFrames.

Adding a new dashboard
~~~~~~~~~~~~~~~~~~~~~~

1. Create a new dashboard and add your cards (SQL or Questions).
2. Enable static embedding and note the embed URL/parameters.
3. Add a new iFrame integration in the relevant front-end plugin (see OMERO.biomero docs for examples).
4. Align dashboard parameters with what the embedding app sends (e.g., user id).

Browse attached databases
~~~~~~~~~~~~~~~~~~~~~~~~~

* In Metabase, you can browse the connected databases (OMERO and BIOMERO Postgres) directly from the UI. This is visible to anyone with access to your Metabase instance.

Managing database connections
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Go to ``Settings > Admin settings > Databases`` to:
  
  - Add/remove databases
  - Change host/port/username/authentication
  - Sync new schemas and re-scan field values
* Dashboards run real-time queries against these connections.

User account and password
~~~~~~~~~~~~~~~~~~~~~~~~~

* Change password via ``Settings > Account settings > Password``.
* You can also review your login history there for security audits.
* Resetting (admin) password, see https://www.metabase.com/docs/latest/people-and-groups/managing#resetting-the-admin-password  

.. warning::
   When deploying NL-BIOMERO in any environment, you must change the default Metabase admin password 
   immediately. The default credentials in NL-BIOMERO are publicly documented in the project 
   repository and should never be used in production environments.


Versioning and migration
~~~~~~~~~~~~~~~~~~~~~~~~

* Metabase stores dashboards, questions, settings, and connections in its application database file.
* In this deployment, the file path is configured via ``MB_DB_FILE`` (e.g., ``/metabase-data/metabase.db``). On disk (H2), this may appear as ``metabase.db.mv.db`` in the mounted volume.
* This file contains sensitive data (secrets, DB URLs, embedding keys, admin users). Options to propagate changes:
  
  - Manually replicate dashboard changes across environments
  - Distribute the Metabase DB file and then update secrets per environment (DB URLs, embedding keys, admin password)
* Consider committing the DB file to source control only if acceptable for your security model.


Related Documentation
---------------------

* :doc:`omeroweb` - Web interface integration
* :doc:`../architecture` - System architecture
* `Metabase Documentation <https://www.metabase.com/docs/>`_