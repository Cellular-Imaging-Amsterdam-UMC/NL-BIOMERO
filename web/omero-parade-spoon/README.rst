.. image:: https://github.com/ome/omero-parade/workflows/OMERO/badge.svg
    :target: https://github.com/ome/omero-parade/actions

.. image:: https://badge.fury.io/py/omero-parade.svg
    :target: https://badge.fury.io/py/omero-parade

OMERO.parade
============

An OMERO.web app for filtering Data in OMERO.web centre panel.

For full details see `SUPPORT.md <https://github.com/ome/omero-parade/blob/master/SUPPORT.md>`_.


Requirements
------------

* OMERO.web 5.6.1 or newer.


Installing from PyPI
--------------------

This section assumes that an OMERO.web is already installed.

Install the app using `pip <https://pip.pypa.io/en/stable/>`_:

::

    $ pip install -U omero-parade

Add parade custom app to your installed web apps:

::

    $ bin/omero config append omero.web.apps '"omero_parade"'

Display parade in the centre of the webclient:

::

    $ bin/omero config append omero.web.ui.center_plugins \
        '["Parade", "omero_parade/init.js.html", "omero_parade"]'


Now restart OMERO.web as normal.


Build
-----

In order to build you need:

* npm version equal or greater than `npm 8.19.4`.

::

    $ npm install

To build and automatically rebuild when source files change, run:

::

    $ npm run watch

To build a compressed, minified version for production, run:

::

    $ npm run build


Custom Filtering
----------------

Users can customize the filtering options available by adding their own
python modules to the setting:

::

    omero.web.parade.filters

The current default setting lists the ``omero_parade`` app itself and two
other modules that are in the same directory and are therefore expected to
be on the PYTHONPATH when the app is installed.

::

    '["omero_parade", "omero_parade.annotation_filters", "omero_parade.table_filters"]'

Each of these modules contains an ``omero_filters.py`` which is expected to
implement 2 methods: ``get_filters`` and ``get_script``.

The ``get_filters`` method is used to compile the list of filters returned
by the URL ``/omero_parade/filters/``.

Some examples of ``get_filters``

::

    # Return a list of filter names.
    def get_filters(request, conn):
        return ["Rating", "Comment", "Tag"]

The request may include ``plate`` or ``dataset`` ID if we only want to
support the filter for certain data types. In this example we could even
check whether an OMERO.table exists on the plate.

::

    def get_filters(request, conn):
        if request.GET.get('plate', None) is not None:
            return ["Table"]
        return []

The ``get_script`` function for a named filter should return a ``JsonResponse``
that includes a list of parameters for the user input to the filter
and a JavaScript filter function.

The JavaScript function will be called for each image to filter and will
also be passed in a params object with the user input.

::

    # Return a JS function to filter images by various params.
    def get_script(request, script_name, conn):

        dataset_id = request.GET.get('dataset')
        // OR...
        plate_id = request.GET.get('plate')

        if script_name == "Rating":
            # Load rating data for images in Dataset or Wells in Plate...
            # ...
            # var ratings = {imageId: rating} for all images
            var js_object_attr = 'id';  # or 'wellId' if filtering Wells

            # Return a JS function that will be passed an object
            # e.g. {id: 1} for Image or {id: 1, wellId:2} for Image in Well.
            # and should return true or false
            f = """(function filter(data, params) {
                var ratings = %s;
                var match = ratings[data.%s] == params.rating;
                return (params.rating === '-' || match);
            })
            """ % (json.dumps(ratings), js_object_attr)

            filter_params = [{'name': 'rating',
                            'type': 'text',
                            'values': ['-', '1', '2', '3', '4', '5'],
                            'default': '-',
                            }]
            return JsonResponse(
                {
                    'f': f,
                    'params': filter_params,
                })


Custom Data Providers
---------------------

Custom data providers return numerical data for Images that can
be shown in a table for sorting, or plotted in a graph.
NB: Even if data applies to Wells, you need to map this to Image ID, since
that is the common denominator that is used to identify images in the
various list, grid or plot layouts.

Using the same setup as for filtering above, each module listed in the
``omero.web.parade.filters`` setting can also contain a ``data_providers.py``
file that implements two methods ``get_dataproviders`` and ``get_data``.

Examples for ``omero_parade/data_providers.py``

::

    def get_dataproviders(request, conn):
        return ["ROI_count"]


    def get_data(request, data_name, conn):
        """Return data for images in a Dataset or Plate."""
        dataset_id = request.GET.get('dataset')
        plate_id = request.GET.get('plate')
        field_id = request.GET.get('field')

        # ... get img_ids for container, then...

        if data_name == "ROI_count":
            # Want to get ROI count for images
            params = ParametersI()
            params.addIds(img_ids)
            query = "select roi.image.id, count(roi.id) from Roi roi "\
                    "where roi.image.id in (:ids) group by roi.image"
            p = query_service.projection(query, params, conn.SERVICE_OPTS)
            roi_counts = {}
            for i in p:
                roi_counts[i[0].val] = i[1].val
            return roi_counts

Release process
---------------

This repository uses `bump2version <https://pypi.org/project/bump2version/>`_ to manage version numbers.
To tag a release run::

    $ bumpversion release

This will remove the ``.dev0`` suffix from the current version, commit, and tag the release.

To switch back to a development version run::

    $ bumpversion --no-tag [major|minor|patch]

specifying ``major``, ``minor`` or ``patch`` depending on whether the development branch will be a `major, minor or patch release <https://semver.org/>`_. This will also add the ``.dev0`` suffix.

Remember to ``git push`` all commits and tags.

License
-------

This project, similar to many Open Microscopy Environment (OME) projects, is
licensed under the terms of the GNU General Public License (GPL) v2 or later.

Copyright
---------

2019-2023, The Open Microscopy Environment
