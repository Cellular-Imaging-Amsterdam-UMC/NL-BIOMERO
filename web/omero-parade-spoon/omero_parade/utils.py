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
from omero.rtypes import rint


def get_dataset_image_ids(conn, dataset_id):
    """Get image IDs for images in Dataset"""

    conn.SERVICE_OPTS.setOmeroGroup('-1')
    query_service = conn.getQueryService()
    params = ParametersI()
    params.addId(dataset_id)
    query = "select img.id "\
            "from DatasetImageLink link "\
            "join link.child as img "\
            "where link.parent.id = :id"
    p = query_service.projection(query, params, conn.SERVICE_OPTS)
    img_ids = [i[0].val for i in p]
    return img_ids


def get_image_ids(conn, plate_id, field_id=0):
    """Get image IDs for images in Plate"""

    conn.SERVICE_OPTS.setOmeroGroup('-1')
    query_service = conn.getQueryService()
    params = ParametersI()
    params.addId(plate_id)
    params.add('wsidx', rint(field_id))
    query = "select img.id "\
            "from Well well "\
            "join well.wellSamples ws "\
            "join ws.image img "\
            "where well.plate.id = :id "\
            "and index(ws) = :wsidx"
    p = query_service.projection(query, params, conn.SERVICE_OPTS)
    img_ids = [i[0].val for i in p]
    return img_ids


def get_well_ids(conn, plate_id):
    """Get well IDs for Plate"""
    conn.SERVICE_OPTS.setOmeroGroup('-1')
    query_service = conn.getQueryService()
    params = ParametersI()
    params.addId(plate_id)
    query = "select well.id "\
            "from Well well "\
            "where well.plate.id = :id"
    p = query_service.projection(query, params, conn.SERVICE_OPTS)
    return [i[0].val for i in p]


def get_well_image_ids(conn, plate_id, field_id=0):
    """Get dict of {wellId: imageId} for Plate"""

    conn.SERVICE_OPTS.setOmeroGroup('-1')
    query_service = conn.getQueryService()
    params = ParametersI()
    params.addId(plate_id)
    params.add('wsidx', rint(field_id))
    query = "select well.id, img.id "\
            "from Well well "\
            "join well.wellSamples ws "\
            "join ws.image img "\
            "where well.plate.id = :id "\
            "and index(ws) = :wsidx"
    p = query_service.projection(query, params, conn.SERVICE_OPTS)
    img_ids = {}
    for i in p:
        well_id = i[0].val
        img_id = i[1].val
        img_ids[well_id] = img_id
    return img_ids


def get_project_image_ids(conn, project_id):
    """Get image IDs for images in Project"""
    conn.SERVICE_OPTS.setOmeroGroup('-1')
    query_service = conn.getQueryService()
    params = ParametersI()
    params.addId(project_id)
    query = "select link "\
            "from DatasetImageLink link "\
            "join fetch link.parent dataset "\
            "join fetch dataset.projectLinks plink "\
            "where plink.parent.id = :id "
    p = query_service.projection(query, params, conn.SERVICE_OPTS)
    img_ids = [i[0].val.child.id.val for i in p]
    return img_ids
