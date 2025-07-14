# Omero script adapted from https://github.com/BioNGFF/omero-import-utils/blob/main/metadata/register.py

#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
# Copyright (C) 2025 University of Dundee & Open Microscopy Environment.
# All rights reserved.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along
# with this program; if not, write to the Free Software Foundation, Inc.,
# 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import omero
import omero.scripts as scripts
from omero.gateway import BlitzGateway
from omero.rtypes import rstring, rlong, robject, unwrap
import omero.util.script_utils as script_utils
from omero.model import PixelsI
from urllib.parse import urlsplit
import os
import json
try:
    from smart_open import open as sm_open
except ImportError:
    sm_open = None

from numpy import dtype, iinfo

from omero.model.enums import PixelsTypeint8, PixelsTypeuint8, PixelsTypeint16
from omero.model.enums import PixelsTypeuint16, PixelsTypeint32
from omero.model.enums import PixelsTypeuint32, PixelsTypefloat
from omero.model.enums import PixelsTypecomplex, PixelsTypedouble

from omero.model import ExternalInfoI
from omero.rtypes import rbool, rdouble, rint, rlong, rstring


EXTENSION_JSON = "zarr.json"

AWS_DEFAULT_ENDPOINT = "s3.us-east-1.amazonaws.com"

OBJECT_PLATE = "plate"
OBJECT_IMAGE = "image"

PIXELS_TYPE = {'int8': PixelsTypeint8,
               'int16': PixelsTypeint16,
               'uint8': PixelsTypeuint8,
               'uint16': PixelsTypeuint16,
               'int32': PixelsTypeint32,
               'float_': PixelsTypefloat,
               'float8': PixelsTypefloat,
               'float16': PixelsTypefloat,
               'float32': PixelsTypefloat,
               'float64': PixelsTypedouble,
               'complex_': PixelsTypecomplex,
               'complex64': PixelsTypecomplex}


def format_s3_uri(uri, endpoint):
    '''
    Combine endpoint and uri
    '''
    parsed_uri = urlsplit(uri)
    url = "{0.netloc}".format(parsed_uri)
    if endpoint:
        parsed_endpoint = urlsplit(endpoint)
        endpoint = "{0.netloc}".format(parsed_endpoint)
    else:
        endpoint = AWS_DEFAULT_ENDPOINT
    return "{0.scheme}".format(parsed_uri) + "://" + endpoint + "/" + url + "{0.path}".format(parsed_uri)


def create_client(endpoint, nosignrequest=False):
    """
    Create a boto3 client to connect to S3
    """
    config = None

    try:
        import boto3
        import botocore
        import botocore.client
    except ImportError:
        print("boto3 and botocore required for s3 URLs.")
        raise

    if nosignrequest:
        config = botocore.client.Config(signature_version=botocore.UNSIGNED)
    session = boto3.Session()
    if endpoint:
        if config:
            client = session.client('s3', endpoint_url=endpoint, config=config)
        else:
            client = session.client('s3', endpoint_url=endpoint)
    else:
        if config:
            client = session.client('s3', config=config)
        else:
            client = session.client('s3')
    transport_params = {'client': client}
    return transport_params


def load_attrs(uri, transport_params=None, extension=None):
    """
    Load the attributes from the zattrs file
    """
    extensions = ["zarr.json", ".zattrs"]
    if extension is not None:
        extensions = [extension] + extensions
    for ext in extensions:
        path = uri + ext
        try:
            if transport_params is not None:
                if sm_open is None:
                    raise ImportError("smart_open needed for remote URLs but not Installed")
                with sm_open(path, 'rb', transport_params=transport_params) as f:
                    zattrs = json.load(f)
            else:
                with open(path) as f:
                    zattrs = json.load(f)
            if "attributes" in zattrs:
                zattrs = zattrs["attributes"]["ome"]
            return zattrs
        except Exception as e:
            pass

    raise FileNotFoundError(f"Could not load attributes from {uri}. Tried extensions: {extensions}")


def determine_object_to_register(uri, transport_params=None):
    """
    Determine the object to register: supported Plate and Image
    """
    zattrs = load_attrs(uri, transport_params)
    if "plate" in zattrs:
        return OBJECT_PLATE, uri
    if "bioformats2raw.layout" in zattrs and zattrs["bioformats2raw.layout"] == 3:
        uri = f"{uri}0/"
    return OBJECT_IMAGE, uri


def parse_image_metadata(uri, img_attrs, transport_params=None):
    """
    Parse the image metadata
    """
    multiscale_attrs = img_attrs['multiscales'][0]
    array_path = multiscale_attrs["datasets"][0]["path"]
    # load .zarray from path to know the dimension
    array_data = load_attrs(f"{uri}{array_path}/", transport_params=transport_params,
                            extension=".zarray")
    sizes = {}
    shape = array_data["shape"]
    axes = multiscale_attrs.get("axes")
    # Need to check the older version
    if axes:
        for axis, size in zip(axes, shape):
            if isinstance(axis, str):
                sizes[axis] = size  # v0.3
            else:
                sizes[axis["name"]] = size

    if "data_type" in array_data:
        data_type_key = "data_type"
    else:
        data_type_key = "dtype"
    pixels_type = dtype(array_data[data_type_key]).name
    return sizes, pixels_type


def create_image(conn, image_attrs, image_uri, object_name, families, models, transport_params=None, endpoint=None,
                 uri_parameters=None):
    '''
    Create an Image/Pixels object
    '''
    query_service = conn.getQueryService()
    pixels_service = conn.getPixelsService()
    sizes, pixels_type = parse_image_metadata(image_uri, image_attrs, transport_params)
    size_t = sizes.get("t", 1)
    size_z = sizes.get("z", 1)
    size_x = sizes.get("x", 1)
    size_y = sizes.get("y", 1)
    size_c = sizes.get("c", 1)
    # if channels is None or len(channels) != size_c:
    channels = list(range(sizes.get("c", 1)))
    omero_pixels_type = query_service.findByQuery("from PixelsType as p where p.value='%s'" % PIXELS_TYPE[pixels_type],
                                                  None)
    iid = pixels_service.createImage(size_x, size_y, size_z, size_t, channels, omero_pixels_type, object_name, "",
                                     conn.SERVICE_OPTS)
    iid = iid.getValue()

    omero_attrs = image_attrs.get('omero', None)
    set_channel_names(conn, iid, omero_attrs)

    image = conn.getObject("Image", iid)
    img_obj = image._obj
    set_external_info(image_uri, img_obj, endpoint=endpoint, uri_parameters=uri_parameters)
    # Check rendering settings
    rnd_def = set_rendering_settings(omero_attrs, pixels_type, image.getPixelsId(), families, models)

    return img_obj, rnd_def


def hex_to_rgba(hex_color):
    """
    Converts a hex color code to an RGB array.
    """
    if len(hex_color) == 3:
        hex_color = hex_color[0] * 2 + hex_color[1] * 2 + hex_color[2] * 2
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    return [r, g, b]


def get_channels(omero_info):
    '''
    Find the name of the channels if specified
    '''
    channel_names = []
    if omero_info is None:
        return channel_names
    for index, entry in enumerate(omero_info.get('channels', [])):
        channel_names.append(entry.get('label', index))
    return channel_names


def set_channel_names(conn, iid, omero_attrs):
    channel_names = get_channels(omero_attrs)
    nameDict = dict((i + 1, name) for i, name in enumerate(channel_names))
    conn.setChannelNames("Image", [iid], nameDict)


def set_rendering_settings(omero_info, pixels_type, pixels_id, families, models):
    '''
    Extract the rendering settings and the channels information
    '''
    if omero_info is None:
        return
    rdefs = omero_info.get('rdefs', None)
    rnd_def = None
    if rdefs is not None:
        rnd_def = omero.model.RenderingDefI()
        rnd_def.defaultZ = rint(rdefs.get('defaultZ', 0))
        rnd_def.defaultT = rint(rdefs.get('defaultT', 0))
        value = rdefs.get('model', 'rgb')
        if value == 'color':
            value = 'rgb'
        ref_model = None
        for m in models:
            mv = m.getValue()._val
            if mv == 'rgb':
                ref_model = m
            if mv == value:
                rnd_def.model = m
        if rnd_def.model is None:
            rnd_def.model = ref_model

        q_def = omero.model.QuantumDefI()
        q_def.cdStart = rint(0)
        q_def.cdEnd = rint(255)
        # Flag to select a 8-bit depth (<i>=2^8-1</i>) output interval
        q_def.bitResolution = rint(255)
        rnd_def.quantization = q_def
        rnd_def.pixels = omero.model.PixelsI(pixels_id, False)

    pixels_min = iinfo(pixels_type).min
    pixels_max = iinfo(pixels_type).max
    for index, entry in enumerate(omero_info.get('channels', [])):
        if rnd_def is not None:
            cb = omero.model.ChannelBindingI()
            rnd_def.addChannelBinding(cb)
            cb.coefficient = rdouble(entry.get('coefficient', 1.0))
            cb.active = rbool(entry.get('active', False))
            value = entry.get('family', "linear")
            ref_family = None
            for f in families:
                fv = f.getValue()._val
                if fv == "linear":
                    ref_family = f
                if fv == value:
                    cb.family = f
            if cb.family is None:
                cb.family = ref_family

            # convert color to rgba
            rgb = hex_to_rgba(entry.get('color', "000000"))  # default to black is no color set
            cb.red = rint(rgb[0])
            cb.green = rint(rgb[1])
            cb.blue = rint(rgb[2])
            cb.alpha = rint(255)
            cb.noiseReduction = rbool(False)

            window = entry.get("window", None)
            if window:
                cb.inputStart = rdouble(window.get("start", pixels_min))
                cb.inputEnd = rdouble(window.get("end", pixels_max))
            inverted = entry.get("inverted", False)
            if inverted:  # add codomain
                ric = omero.model.ReverseIntensityContextI()
                ric.reverse = rbool(inverted)
                cb.addCodomainMapContext(ric)
    return rnd_def


def load_families(query_service):
    ctx = {'omero.group': '-1'}
    return query_service.findAllByQuery('select f from Family as f', None, ctx)


def load_models(query_service):
    ctx = {'omero.group': '-1'}
    return query_service.findAllByQuery('select f from RenderingModel as f', None, ctx)


def register_image(conn, uri, name=None, transport_params=None, endpoint=None, uri_parameters=None):
    """
    Register the ome.zarr image in OMERO.
    """

    update_service = conn.getUpdateService()
    query_service = conn.getQueryService()
    families = load_families(query_service)
    models = load_models(query_service)

    img_attrs = load_attrs(uri, transport_params)
    if name:
        image_name = name
    elif "name" in img_attrs:
        image_name = img_attrs["name"]
    else:
        image_name = uri.rstrip("/").split("/")[-1]
    image, rnd_def = create_image(conn, img_attrs, uri, image_name, families, models, transport_params, endpoint,
                                  uri_parameters)
    update_service.saveAndReturnObject(image)
    update_service.saveAndReturnObject(rnd_def)

    print("Created Image", image.id.val)
    return image


def determine_naming(values):
    '''
    Determine the name of columns or rows of a plate
    '''
    if len(values) > 0:
        value = values[0]['name']
        if value.isdigit():
            return "number"
    return "letter"


def create_plate_acquisition(pa):
    '''
    Create a plate acquisition object
    '''
    plate_acquisition = omero.model.PlateAcquisitionI()
    if pa.get("name"):
        plate_acquisition.name = rstring(pa.get("name"))
    else:
        plate_acquisition.name = rstring(pa.get("id"))
    if pa.get("maximumfieldcount"):
        plate_acquisition.maximumFieldCount = rint(pa.get("maximumfieldcount"))
    if pa.get("starttime"):
        plate_acquisition.startTime = rint(pa.get("starttime"))
    if pa.get("endtime"):
        plate_acquisition.endTime = rint(pa.get("endtime"))
    return plate_acquisition


def register_plate(conn, uri, name=None, transport_params=None, endpoint=None, uri_parameters=None):
    '''
    Register a plate
    '''
    plate_attrs = load_attrs(uri, transport_params)["plate"]

    object_name = name
    if object_name is None:
        object_name = plate_attrs.get("name", None)
    if object_name is None:
        object_name = uri.rstrip("/").split("/")[-1].split(".")[0]

    update_service = conn.getUpdateService()
    query_service = conn.getQueryService()
    families = load_families(query_service)
    models = load_models(query_service)

    # Create a plate
    plate = omero.model.PlateI()
    plate.name = rstring(object_name)
    plate.columnNamingConvention = rstring(determine_naming(plate_attrs['columns']))
    plate.rowNamingConvention = rstring(determine_naming(plate_attrs['rows']))
    plate.rows = rint(len(plate_attrs['rows']))
    plate.columns = rint(len(plate_attrs['columns']))

    acquisitions = plate_attrs.get('acquisitions')
    plate_acquisitions = {}
    if acquisitions is not None and len(acquisitions) > 1:
        for pa in acquisitions:
            plate_acquisition = update_service.saveAndReturnObject(create_plate_acquisition(pa))
            plate_acquisitions[pa.get("id")] = plate_acquisition
            plate.addPlateAcquisition(omero.model.PlateAcquisitionI(plate_acquisition.getId(), False))

    plate = update_service.saveAndReturnObject(plate)

    # for Platani plate - bug in omero-cli-zarr - dupliate Wells!
    well_paths = []

    for well_attrs in plate_attrs["wells"]:
        images_to_save = []
        rnd_defs = []
        # read metadata
        row_index = well_attrs["rowIndex"]
        column_index = well_attrs["columnIndex"]
        well_path = well_attrs['path']
        if well_path in well_paths:
            continue
        else:
            well_paths.append(well_path)
        print("well_path", well_path)
        # create OMERO object
        well = omero.model.WellI()
        well.plate = omero.model.PlateI(plate.getId(), False)
        well.column = rint(column_index)
        well.row = rint(row_index)

        well_attrs = load_attrs(f"{uri}{well_path}/", transport_params)
        well_samples_attrs = well_attrs["well"]["images"]

        for sample_attrs in well_samples_attrs:
            image_uri = f"{uri}{well_path}/{sample_attrs['path']}/"

            img_attrs = load_attrs(image_uri, transport_params)
            image_name = img_attrs.get('name', f"{well_path}/{sample_attrs['path']}")

            image, rnd_def = create_image(conn, img_attrs, image_uri, image_name, families, models, transport_params,
                                          endpoint, uri_parameters)

            images_to_save.append(image)
            rnd_defs.append(rnd_def)
            # Link well sample and plate acquisition
            ws = omero.model.WellSampleI()
            if 'acquisition' in sample_attrs:
                acquisition_id = sample_attrs['acquisition']
                pa = plate_acquisitions.get(acquisition_id)
                if pa is not None:
                    ws.plateAcquisition = omero.model.PlateAcquisitionI(pa.getId(), False)
            ws.image = omero.model.ImageI(image.id.val, False)
            ws.well = well
            well.addWellSample(ws)

        # Save each Well and Images as we go...
        update_service.saveObject(well)
        update_service.saveAndReturnArray(images_to_save)
        update_service.saveAndReturnIds(rnd_defs)

    print("Plate created with id:", plate.id.val)
    return plate


def set_external_info(uri, image, endpoint=None, uri_parameters=None):
    '''
    Create the external info and link it to the image
    '''
    extinfo = ExternalInfoI()
    # non-nullable properties
    setattr(extinfo, "entityId", rlong(3))
    setattr(extinfo, "entityType", rstring("com.glencoesoftware.ngff:multiscales"))
    if not uri.startswith("/"):
        uri = format_s3_uri(uri, endpoint)
    if uri_parameters:
        if not uri.endswith("/"):
            uri = uri + "/"
        uri = uri + uri_parameters
    if uri.endswith("/"):  # check with Will
        uri = uri[:-1]
    setattr(extinfo, "lsid", rstring(uri))
    image.details.externalInfo = extinfo


def validate_uri(uri):
    '''
    Check that the protocol is valid and the URI ends with "/"
    '''
    parsed_uri = urlsplit(uri)
    scheme = "{0.scheme}".format(parsed_uri)
    if "s3" not in scheme:
        raise Exception("Protocol should be s3. Protocol specified is: " + scheme)
    # Check if ends with / otherwise add one
    path = "{0.path}".format(parsed_uri)
    if path.endswith("/"):
        return uri
    return uri + "/"


def validate_endpoint(endpoint):
    '''
    Check that the protocol is valid
    '''
    if endpoint is None or not endpoint:
        return
    parsed_endpoint = urlsplit(endpoint)
    scheme = "{0.scheme}".format(parsed_endpoint)
    if "https" not in scheme:
        raise Exception("Protocol should be https. Protocol specified is: " + scheme)


def get_uri_parameters(transport_params, nosignrequest):
    if transport_params is None:
        return None
    if nosignrequest:
        return "?anonymous=true"
    return None


def link_to_target(parameter_map, conn, obj):
    is_plate = isinstance(obj, omero.model.PlateI)

    if parameter_map.get("target"):
        if is_plate:
            target = conn.getObject("Screen", attributes={'id': int(parameter_map.get("target"))})
        else:
            target = conn.getObject("Dataset", attributes={'id': int(parameter_map.get("target"))})
    else:
        if is_plate:
            target = conn.getObject("Screen", attributes={'name': parameter_map.get("target_by_name")})
        else:
            target = conn.getObject("Dataset", attributes={'name': parameter_map.get("target_by_name")})

    if target is None:
        print("Target not found")
        return

    if is_plate:
        link = omero.model.ScreenPlateLinkI()
        link.parent = omero.model.ScreenI(target.getId(), False)
        link.child = omero.model.PlateI(obj.getId(), False)
        conn.getUpdateService().saveObject(link)
        print("Linked to Screen", target.getId())
    else:
        link = omero.model.DatasetImageLinkI()
        link.parent = omero.model.DatasetI(target.getId(), False)
        link.child = omero.model.ImageI(obj.getId(), False)
        conn.getUpdateService().saveObject(link)
        print("Linked to Dataset", target.getId())


def register(conn, parameter_map):

    filename = parameter_map["Filename"]



    message = "ok"
    return message


def run_script():
    """
    The main entry point of the script, as called by the client via the
    scripting service, passing the required parameters.
    """

    client = scripts.client(
        'register_script.py',
        """ome-zarr register test script.
""",

        scripts.String("uri", optional=False, description="The URI to the S3 store", grouping="1", default='/data/6001240.zarr/'),
        scripts.String("endpoint", optional=True, description="Enter the URL endpoint if applicable", grouping="2"),
        scripts.String("name", optional=True, description="The name of the image/plate", grouping="3"),
        scripts.Bool("nosignrequest", optional=True, description="Indicate to sign anonymously", grouping="4"),
        scripts.String("target", optional=True, description="The id of the target (dataset/screen)", grouping="5"),
        scripts.String("target-by-name", optional=True, description="The name of the target (dataset/screen)", grouping="6"),

        version="5.3.0",
        authors=["William Moore", "OME Team"],
        institutions=["University of Dundee"],
        contact="ome-users@lists.openmicroscopy.org.uk",
    )

    try:
        parameter_map = client.getInputs(unwrap=True)

        # create a wrapper so we can use the Blitz Gateway.
        conn = BlitzGateway(client_obj=client)
        uri = parameter_map["uri"]
        endpoint = parameter_map.get("endpoint")
        nosignrequest = parameter_map.get("nosignrequest")
        validate_endpoint(endpoint)
        if uri.startswith("/"):
            transport_params = None
        else:
            parsed_uri = urlsplit(uri)
            scheme = "{0.scheme}".format(parsed_uri)
            if "http" in scheme:
                endpoint = "https://" + "{0.netloc}".format(parsed_uri)
                nosignrequest = True
                path = "{0.path}".format(parsed_uri)
                if path.startswith("/"):
                    path = path[1:]
                uri = "s3://" + path

            uri = validate_uri(uri)
            transport_params = create_client(endpoint, nosignrequest)
        params = get_uri_parameters(transport_params, nosignrequest)
        type_to_register, uri = determine_object_to_register(uri, transport_params)
        print("type_to_register, uri", type_to_register, uri)

        if type_to_register == OBJECT_PLATE:
            obj = register_plate(conn, uri, parameter_map.get("name"), transport_params, endpoint=endpoint, uri_parameters=params)

        else:
            obj = register_image(conn, uri, parameter_map.get("name"), transport_params, endpoint=endpoint, uri_parameters=params)

        if parameter_map.get("target") or parameter_map.get("target_by_name"):
            link_to_target(parameter_map, conn, obj)

        #message = register(conn, parameter_map)
        #client.setOutput("Message", rstring(message))
        if obj is not None:
            client.setOutput("Result", robject(obj))

    finally:
        client.closeSession()


if __name__ == "__main__":
    run_script()
