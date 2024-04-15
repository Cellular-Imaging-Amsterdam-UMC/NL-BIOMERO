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

from omero.sys import ParametersI
from omero_parade.utils import get_image_ids, get_project_image_ids


def get_dataproviders(request, conn):
    rv = ["ROI_count", "sizeT"]
    #  Check if Plate images have ROI stats as map annotation...
    plate_id = request.GET.get('plate')
    ns = "roi.pixel.intensities.summary"
    if plate_id and get_image_map_annotations(conn, plate_id, 0, ns):
        rv.append("ROI_stats_max_size")
    return rv


def get_data(request, data_name, conn):
    """Return data for images in a Project, Dataset or Plate."""
    project_id = request.GET.get('project')
    dataset_id = request.GET.get('dataset')
    plate_id = request.GET.get('plate')
    field_id = request.GET.get('field')
    if project_id:
        img_ids = get_project_image_ids(conn, project_id)
    elif dataset_id:
        objects = conn.getObjects('Image', opts={'dataset': dataset_id})
        img_ids = [i.id for i in objects]
    elif plate_id and field_id:
        img_ids = get_image_ids(conn, plate_id, field_id)
    else:
        img_ids = request.GET.getlist('image')
    query_service = conn.getQueryService()

    if data_name == "ROI_stats_max_size":
        if plate_id:
            ns = "roi.pixel.intensities.summary"
            return get_image_map_annotations(conn, plate_id, 0, ns,
                                             "Max Points")

    if data_name == "ROI_count":
        # Want to get ROI count for images
        params = ParametersI()
        # Include "-1" so that if we have no Image IDs that the query does
        # not fail.  It will not match anything.
        params.addIds([-1] + img_ids)
        query = "select roi.image.id, count(roi.id) from Roi roi "\
                "where roi.image.id in (:ids) group by roi.image"
        p = query_service.projection(query, params, conn.SERVICE_OPTS)
        roi_counts = {}
        for i in img_ids:
            # Add placeholder 0 for all images
            roi_counts[i] = 0
        for i in p:
            roi_counts[i[0].val] = i[1].val
        return roi_counts

    if data_name == "sizeT":
        # Want to get sizeT for images
        params = ParametersI()
        # Include "-1" so that if we have no Image IDs that the query does
        # not fail.  It will not match anything.
        params.addIds([-1] + img_ids)
        query = "select pixels.image.id, pixels.sizeT from Pixels pixels "\
                "where pixels.image.id in (:ids)"
        p = query_service.projection(query, params, conn.SERVICE_OPTS)
        size_t = {}
        for i in p:
            size_t[i[0].val] = i[1].val
        return size_t


def get_image_map_annotations(conn, plate_id, field_id, ns, key=None):
    """Get image IDs for images in Plate"""
    conn.SERVICE_OPTS.setOmeroGroup('-1')
    query_service = conn.getQueryService()
    iids = get_image_ids(conn, plate_id, field_id)
    params = ParametersI()
    params.addIds(iids)
    query = """select oal from ImageAnnotationLink as oal
            join fetch oal.details.owner
            left outer join fetch oal.child as ch
            left outer join fetch oal.parent as pa
            where pa.id in (:ids)
            and ch.ns='%s'""" % ns
    links = query_service.findAllByQuery(query, params, conn.SERVICE_OPTS)
    if key is None:
        return links
    map_values = {}
    for l in links:
        for kv in l.child.getMapValue():
            if key == kv.name:
                map_values[l.parent.id.val] = int(kv.value)
    return map_values
