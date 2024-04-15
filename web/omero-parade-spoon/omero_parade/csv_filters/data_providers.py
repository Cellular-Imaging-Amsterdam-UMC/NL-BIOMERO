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

import logging
import csv
from io import StringIO

from omero.model import FileAnnotationI
from omero_parade import parade_settings

logger = logging.getLogger(__name__)

OBJ_TYPES = ["project", "dataset", "screen", "plate"]
MAX_CSV_SIZE = parade_settings.MAX_CSV_SIZE


def get_csv_annotations(conn, obj_type, obj_id):

    csv_files = []
    obj = conn.getObject(obj_type, obj_id)
    if obj is None:
        return []

    for ann in obj.listAnnotations():
        if (ann.OMERO_TYPE == FileAnnotationI and
                ann.file.size.val < MAX_CSV_SIZE and
                ann.file.name.val.endswith('.csv')):
            csv_files.append(ann)

    return csv_files


def get_csv_column_names(file_ann):
    chs = [ch.decode() for ch in file_ann.getFile().getFileInChunks()]
    text = "".join(chs)
    csv_reader = csv.reader(StringIO(text), delimiter=',')

    # return first row
    return next(csv_reader)


def get_names(conn, obj_type, obj_id):
    csv_files = get_csv_annotations(conn, obj_type, obj_id)

    names = []
    for f in csv_files:
        fname = f.file.name.val
        for col in get_csv_column_names(f):
            names.append("%s %s" % (fname, col))
    return names


def get_dataproviders(request, conn):
    for dtype in OBJ_TYPES:
        if request.GET.get(dtype) is not None:
            obj_id = request.GET.get(dtype)
            return get_names(conn, dtype, obj_id)


def get_data(request, data_name, conn):
    """Return table data for images."""
    # Find matching csv file...
    csv_file = None
    for dtype in OBJ_TYPES:
        if request.GET.get(dtype) is not None:
            obj_id = request.GET.get(dtype)
            for file_ann in get_csv_annotations(conn, dtype, obj_id):
                if data_name.startswith(file_ann.getFile().name):
                    csv_file = file_ann.getFile()
                    break

    if csv_file is None:
        return {}

    # Open file and read the column we need:
    chs = [ch.decode() for ch in csv_file.getFileInChunks()]
    text = "".join(chs)
    csv_reader = csv.reader(StringIO(text), delimiter=',')

    first_row = [c.strip() for c in next(csv_reader)]

    # Find column. data_name is 'file_name col_name'
    col_name = data_name.replace(file_ann.getFile().name, "").strip()
    if col_name not in first_row:
        return {'Error': 'Column %s not found' % col_name}

    data_col_idx = first_row.index(col_name)
    # TODO handle SPW, Well
    # handle 'Image' column named 'image' or 'image_id'
    img_names = ['Image', 'image', 'image_id']
    img_col_idx = -1
    for name in img_names:
        if name in first_row:
            img_col_idx = first_row.index(name)
            break

    table_data = {}
    for row in csv_reader:
        img_id = row[img_col_idx].strip()
        value = row[data_col_idx].strip()
        try:
            value = float(value)
        except ValueError:
            pass
        table_data[img_id] = value

    return table_data
