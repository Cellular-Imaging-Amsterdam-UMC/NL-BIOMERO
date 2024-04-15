
0.2.4 (June 2023)
-----------------

- Make app compatible with Django 4.0.x [#123](https://github.com/ome/omero-parade/pull/123)
- Update build to use Vite.js [#122](https://github.com/ome/omero-parade/pull/122)

0.2.3 (March 2022)
------------------

- Remove omero-web cap


0.2.2 (March 2022)
------------------

- Pin omero-web to 5.14.0 [#98](https://github.com/ome/omero-parade/pull/98)

0.2.1 (Feb 2020)
----------------

- prevent the Tag dialog from appearing behind the parade scatter plot [#74](https://github.com/ome/omero-parade/pull/74)
- add CSV support to OMERO.parade for filtering and table_columns / scatter plot [#75](https://github.com/ome/omero-parade/pull/75)

0.2.0 (Jan 2020)
----------------

- Drop support for Python 2
- Fix loading of Key-Value pairs [#69](https://github.com/ome/omero-parade/pull/69)

0.1.3 (Jul 2019)
-----------------

Bug fixing release.

 - update webpack-cli [#53](https://github.com/ome/omero-parade/pull/53)
 - support string columns [#55](https://github.com/ome/omero-parade/pull/55)
 - support renamed _bulk_file_annotations method [#57](https://github.com/ome/omero-parade/pull/57)
 - proper close HDF5 tables [#58](https://github.com/ome/omero-parade/pull/58)

0.1.2 (Sept 2018)
-----------------

Bug fixing release.

 - display selection box in plot view (Firefox)
 - reset filter

0.1.1 (Jun 2018)
----------------

Update the readme to remove the top link installation

0.1.0 (May 2018)
----------------

Initial Release

Data mining tool for Images stored in OMERO

This version includes:

  - display thumbnails for all Datasets within a Project
  - filter Dataset and Plate data 
  - filter by Rating, Tag, Comment, Map Annotation, OMERO.table and ROI count
  - add column data to the display
  - basic plotting view
  - customisable filtering and data providers
