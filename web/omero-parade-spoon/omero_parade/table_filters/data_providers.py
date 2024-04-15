#
# Copyright (c) 2018 University of Dundee.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#

import logging

from omero.model import OriginalFileI
from omero_parade.utils import get_well_image_ids
try:
    from omeroweb.webgateway.views import _bulk_file_annotations
except ImportError:
    # in case we don't have OMERO 5.5.1
    from omeroweb.webgateway.views import _annotations as \
        _bulk_file_annotations

logger = logging.getLogger(__name__)


def get_table(conn, objtype, objid):
    data = _bulk_file_annotations(None, objtype, objid, conn=conn).get(
        'data', [])
    if len(data) < 1:
        return None
    # Just use the first Table we find
    # TODO: handle multiple tables!?
    data = data[0]
    logger.debug('Data: %r' % data)

    shared_resources = conn.getSharedResources()
    return shared_resources.openTable(OriginalFileI(data['file']),
                                      conn.SERVICE_OPTS)


def get_names(conn, objtype, objid):
    table = get_table(conn, objtype, objid)
    if table is None:
        return []
    try:
        column_names = [col.name for col in table.getHeaders()]
    finally:
        table.close()
    return ["Table_%s" % c for c in column_names]


def get_dataproviders(request, conn):
    # Can provide data from any table column
    project_id = request.GET.get('project')
    dataset_id = request.GET.get('dataset')
    plate_id = request.GET.get('plate')
    logger.debug(
        'Project:%s Dataset:%s Plate:%s' % (project_id, dataset_id, plate_id))

    if project_id is not None:
        return get_names(conn, 'Project', project_id)

    if dataset_id is not None:
        return get_names(conn, 'Dataset', dataset_id)

    if plate_id is not None:
        # Mimic the behaviour of right-hand panel table queries and prefer
        # the table data that is linked further away.
        names = get_names(conn, 'Screen.plateLinks.child', plate_id)
        if len(names) > 0:
            return names
        return get_names(conn, 'Plate', plate_id)

    return []


def get_data(request, data_name, conn):
    """Return table data for images."""
    project_id = request.GET.get('project')
    dataset_id = request.GET.get('dataset')
    plate_id = request.GET.get('plate')
    field_id = request.GET.get('field')
    logger.debug('Project:%s Dataset: %s Plate:%s Field:%s' % (
        project_id, dataset_id, plate_id, field_id
    ))

    if plate_id is not None and field_id is not None:
        # dict of well_id: img_id
        well_to_img_id = get_well_image_ids(conn, plate_id, field_id)
    elif project_id is None and dataset_id is None:
        return dict()

    if data_name.startswith("Table_"):
        column_name = data_name.replace("Table_", "")

        table = None
        if project_id is not None:
            index_column_name = 'Image'
            table = get_table(conn, 'Project', project_id)

        if dataset_id is not None:
            index_column_name = 'Image'
            table = get_table(conn, 'Dataset', dataset_id)

        if plate_id is not None:
            index_column_name = 'Well'
            table = get_table(conn, 'Screen.plateLinks.child', plate_id)
            if table is None:
                table = get_table(conn, 'Plate', plate_id)

        if table is None:
            return dict()

        try:
            headers = table.getHeaders()
            column_names = [column.name for column in headers]
            logger.debug('Column names: %r' % column_names)
            index_column_index = column_names.index(index_column_name)
            named_column_index = column_names.index(column_name)

            # Load appropriate index column and named column
            number_of_rows = table.getNumberOfRows()
            logger.debug('Number of rows: %d' % number_of_rows)
            column_data = table.read([
                index_column_index, named_column_index
            ], 0, number_of_rows).columns

            table_data = {}
            index_ids = column_data[0].values
            values = column_data[1].values

            for obj_id, value in zip(index_ids, values):
                if project_id is not None or dataset_id is not None:
                    table_data[obj_id] = value
                if plate_id is not None:
                    try:
                        table_data[well_to_img_id[obj_id]] = value
                    except KeyError:
                        # The table may have data from different plates.
                        # We only have a dictionary of well_id: img_id for
                        # the current plate.
                        pass
        finally:
            table.close()

        return table_data
