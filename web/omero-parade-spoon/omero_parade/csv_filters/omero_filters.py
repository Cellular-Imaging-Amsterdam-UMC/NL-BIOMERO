#
# Copyright (c) 2020 University of Dundee.
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
import csv
from io import StringIO

from omero.model import FileAnnotationI
from omero_parade.views import NUMPY_GT_1_11_0
from omero_parade.utils import get_well_image_ids
from .data_providers import get_csv_annotations, OBJ_TYPES

logger = logging.getLogger(__name__)


def name_to_word(name):
    """
    Replace any non alpha-numeric character or . with underscore.

    This allows us to use the filter name in URL to load filter script
    """
    w = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.'
    return "".join([l if l in w else '_' for l in name])


def get_filters(request, conn):
    obj_type = None
    obj_id = None
    for o in OBJ_TYPES:
        if request.GET.get(o) is not None:
            obj_id = request.GET.get(o)
            obj_type = o
            break

    csv_anns = get_csv_annotations(conn, obj_type, obj_id)
    # Use name_to_word so that filter can be used in URL
    csv_names = [name_to_word(ann.file.name.val) for ann in csv_anns]
    return csv_names


def get_image_well_ids(conn, plate_id):
    """Return dict of {image_id: well_id} for plate."""

    img_to_well = {}
    well_to_img = get_well_image_ids(conn, plate_id)
    for well_id, img_id in well_to_img.items():
        img_to_well[img_id] = well_id
    return img_to_well


def get_script(request, script_name, conn):
    """Return a JS function to filter images by various params."""
    obj = None
    obj_type = None
    for t in OBJ_TYPES:
        if request.GET.get(t) is not None:
            obj_id = int(request.GET.get(t))
            obj = conn.getObject(t, obj_id)
            obj_type = t
            break

    if obj is None:
        return JsonResponse(
            {'Error': 'Specify object e.g. ?project=1'})

    # find csv file by name
    file_ann = None
    for ann in obj.listAnnotations():
        if (ann.OMERO_TYPE == FileAnnotationI):
            if name_to_word(ann.file.name.val) == script_name:
                file_ann = ann

    if file_ann is None:
        return JsonResponse({'Error': 'csv file %s not found' % script_name})

    # Prepare to find Well ID if needed
    well_ids = {}
    if obj_type == 'plate':
        well_ids = get_image_well_ids(conn, obj_id)

    # read file
    chs = [ch.decode() for ch in file_ann.getFile().getFileInChunks()]
    text = "".join(chs)
    csv_reader = csv.reader(StringIO(text), delimiter=',')

    # process each row, adding values to each column...
    column_names = None
    column_data = {}
    for row in csv_reader:
        # First row is column names:
        if column_names is None:
            column_names = [name.strip() for name in row]
            # Batch_ROI_Export uses 'image_id'. Also support 'image'
            if 'Image' not in column_names:
                if 'image_id' in column_names:
                    column_names[column_names.index('image_id')] = 'Image'
                elif 'image' in column_names:
                    column_names[column_names.index('image')] = 'Image'
            for name in column_names:
                column_data[name] = []
            continue

        # ignore empty rows
        if not any(row):
            continue

        for name, value in zip(column_names, row):
            column_data[name].append(value.strip())

    # If Plate, we want Well IDs
    if obj_type == 'plate' and 'Image' in column_names:
        if 'Well' not in column_names:
            iids = column_data['Image']
            column_data['Well'] = [well_ids.get(int(iid)) for iid in iids]

    minima = {}
    maxima = {}
    histograms = {}
    table_data = {}
    table_cols = []

    # process each column, try convert to numbers
    # currently the UI *ONLY* supports number columns - ignore others
    for name, values in column_data.items():

        try:
            # try to convert to number (if not empty string)
            values = [float(v) if len(v) > 0 else v for v in values]
        except ValueError:
            pass
        else:
            # If ALL empty, ignore
            if not any(values):
                continue
            table_data[name] = values
            table_cols.append(name)
            # only use numbers (not empty strings) for histogram...
            nums = [v for v in values if isinstance(v, float)]
            minima[name] = numpy.amin(nums).item()
            maxima[name] = numpy.amax(nums).item()
            bins = 10
            if NUMPY_GT_1_11_0:
                # numpy.histogram() only supports bin calculation
                # from 1.11.0 onwards
                bins = 'auto'
            histogram, bin_edges = numpy.histogram(nums, bins=bins)
            histograms[name] = histogram.tolist()

    # Return a JS function that will be passed an object
    # e.g. {'type': 'Image', 'id': 1}
    # and should return true or false
    f = """(function filter(data, params) {
        if (isNaN(params.count) || params.count == '') return true;
        var table_data = %s;
        var rowIndex;
        if (data.wellId) {
            rowIndex = table_data.Well.indexOf(data.wellId);
        } else if (table_data.Image) {
            rowIndex = table_data.Image.indexOf(data.id);
        } else {
            return false
        }
        if (rowIndex) {

        }
        var value = table_data[params.column_name][rowIndex];
        if (params.operator === '=') return value == params.count;
        if (params.operator === '<') return value < params.count;
        if (params.operator === '>') return value > params.count;
    })
    """ % json.dumps(table_data)

    filter_params = [{'name': 'column_name',
                      'type': 'text',
                      'values': table_cols,
                      'default': table_cols[0],
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
