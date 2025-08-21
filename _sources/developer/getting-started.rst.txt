Developer Getting Started
=========================

Quick Setup for Development
---------------------------

Clone the repository and set up your development environment:

.. code-block:: bash

   git clone --recurse-submodules https://github.com/Cellular-Imaging-Amsterdam-UMC/NL-BIOMERO.git
   cd NL-BIOMERO
   
   # Setup environment
   cp .env.example .env
   # Edit .env with your configuration
   
   # Start development stack
   docker-compose -f docker-compose-dev.yml up -d --build

Development Features
-------------------

The development compose file includes:

* Live editing for the front-end plugin
* Development-specific configurations
* Special container setup for easier debugging

For detailed setup instructions, see the main README:

.. include:: ../../README.md
   :parser: myst_parser.sphinx_