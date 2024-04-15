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

import numpy

from django.http import JsonResponse
import logging
import json

from omero.grid import DoubleColumn, LongColumn
from omero_parade.views import NUMPY_GT_1_11_0

from .data_providers import get_table

logger = logging.getLogger(__name__)


def get_filters(request, conn):
    return ["Table"]


def get_script(request, script_name, conn):
    """Return a JS function to filter images by various params."""
    project_id = request.GET.get('project')
    plate_id = request.GET.get('plate')

    if project_id is None and plate_id is None:
        return JsonResponse(
            {'Error': 'Neither Project ID nor Plate ID specified'})

    if script_name == "Table":
        table = None

        if project_id is not None:
            table = get_table(conn, 'Project', project_id)

        if plate_id is not None:
            table = get_table(conn, 'Screen.plateLinks.child', plate_id)
            if table is None:
                table = get_table(conn, 'Plate', plate_id)

        if not table:
            return JsonResponse({'ERROR': 'Failed to open table'})

        headers = table.getHeaders()
        rows = table.getNumberOfRows()

        column_names = [col.name for col in headers]
        col_data = table.read(range(len(headers)), 0, rows).columns

        table_data = {}
        minima = {}
        maxima = {}
        histograms = {}
        for name, col in zip(column_names, col_data):
            values = numpy.array(col.values)
            # key is column Name, values are list of col_data
            table_data[name] = values.tolist()

            if not isinstance(col, (DoubleColumn, LongColumn)):
                continue

            minima[name] = numpy.amin(values).item()
            maxima[name] = numpy.amax(values).item()
            bins = 10
            if NUMPY_GT_1_11_0:
                # numpy.histogram() only supports bin calculation
                # from 1.11.0 onwards
                bins = 'auto'
            histogram, bin_edges = numpy.histogram(values, bins=bins)
            histograms[name] = histogram.tolist()

        # Return a JS function that will be passed an object
        # e.g. {'type': 'Image', 'id': 1}
        # and should return true or false
        f = """(function filter(data, params) {
            if (isNaN(params.count) || params.count == '') return true;
            var table_data = %s;
            if (data.wellId) {
                var rowIndex = table_data.Well.indexOf(data.wellId);
            } else {
                var rowIndex = table_data.Image.indexOf(data.id);
            }
            var value = table_data[params.column_name][rowIndex];
            if (params.operator === '=') return value == params.count;
            if (params.operator === '<') return value < params.count;
            if (params.operator === '>') return value > params.count;
        })
        """ % json.dumps(table_data)

        filter_params = [{'name': 'column_name',
                          'type': 'text',
                          'values': column_names,
                          'default': column_names[0],
                          'minima': minima,
                          'maxima': maxima,
                          'histograms': histograms},
                         {'name': 'operator',
                          'type': 'text',
                          'values': ['>', '=', '<'],
                          'default': '>'},
                         {'name': 'count',
                          'type': 'number',
                          'default': ''}]
        return JsonResponse(
            {
                'f': f,
                'params': filter_params,
            })
