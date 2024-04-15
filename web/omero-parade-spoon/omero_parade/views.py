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

"""Django views methods."""

import numpy
import omero
import omero.clients

from base64 import b64decode
from distutils.version import LooseVersion

from django.http import Http404, JsonResponse
from omeroweb.webclient.decorators import login_required
from omero.rtypes import rlong, unwrap
from django.shortcuts import render
from . import parade_settings
from django.http import HttpResponse

NUMPY_GT_1_11_0 = False
if LooseVersion(numpy.__version__) > LooseVersion('1.11.0'):
    NUMPY_GT_1_11_0 = True


@login_required()
def index(request, **kwargs):
    return render(request, "omero_parade/index.html", {})


@login_required()
def search(request, conn=None, **kwargs):
    """Do a FullText search using text from ?query=text."""
    search = conn.createSearchService()
    text = request.GET.get('query', None)
    if text is None:
        return JsonResponse({'error': 'Search with ?query=text'})
    search.onlyType("Image", conn.SERVICE_OPTS)
    search.byFullText(text, conn.SERVICE_OPTS)

    images = []
    if search.hasNext(conn.SERVICE_OPTS):
        for i in search.results(conn.SERVICE_OPTS):
            images.append({'id': i.id.val, 'name': i.name.val})

    return JsonResponse({'data': images})


def get_long_or_default(request, name, default):
    """
    Retrieve a parameter from the request.

    If the parameter is not present the default is returned
    """
    val = None
    val_raw = request.GET.get(name, default)
    if val_raw is not None:
        val = int(val_raw)
    return val


@login_required()
def api_field_list(request, conn=None, **kwargs):
    """Return the min and max-indexed well samples for plate/run."""
    plate_id = get_long_or_default(request, 'plate', None)
    run_id = get_long_or_default(request, 'run', None)
    if (plate_id is None and run_id is None):
        raise Http404('Need to use ?plate=pid or ?run=runid')

    q = conn.getQueryService()
    sql = "select minIndex(ws), maxIndex(ws) from Well w " \
        "join w.wellSamples ws"

    params = omero.sys.ParametersI()

    if run_id is not None:
        sql += " where ws.plateAcquisition.id=:runid"
        params.add('runid', rlong(run_id))
    if plate_id is not None:
        sql += " where w.plate.id=:pid"
        params.add('pid', rlong(plate_id))

    fields = []

    res = q.projection(sql, params, conn.SERVICE_OPTS)
    res = [r for r in unwrap(res)[0] if r is not None]
    if len(res) == 2:
        fields = res

    return JsonResponse({'data': fields})


@login_required()
def filter_list(request, conn=None, **kwargs):

    filter_modules = parade_settings.PARADE_FILTERS

    filters = []
    for m in filter_modules:
        module = __import__('%s.omero_filters' % m, fromlist=[''])
        filters.extend(module.get_filters(request, conn))

    return JsonResponse({'data': filters})


@login_required()
def filter_script(request, filter_name, conn=None, **kwargs):

    filter_modules = parade_settings.PARADE_FILTERS

    for m in filter_modules:
        try:
            module = __import__('%s.omero_filters' % m, fromlist=[''])
            if filter_name in module.get_filters(request, conn):
                return module.get_script(request, filter_name, conn)
        except ImportError:
            pass

    return JsonResponse({'Error': 'Filter script not found'})


@login_required()
def dataprovider_list(request, conn=None, **kwargs):

    modules = parade_settings.PARADE_FILTERS

    dps = []
    for m in modules:
        try:
            module = __import__('%s.data_providers' % m, fromlist=[''])
            if hasattr(module, 'get_dataproviders'):
                data = module.get_dataproviders(request, conn)
                dps.extend(data)
        except ImportError:
            pass

    return JsonResponse({'data': dps})


def numpy_to_json(value):
    if isinstance(value, numpy.integer):
        return int(value)
    elif isinstance(value, numpy.floating):
        return float(value)
    return value


@login_required()
def get_data(request, data_name, conn=None, **kwargs):
    # Avoid e.g. int64 is not JSON serializable
    try:
        data_name = b64decode(data_name)
    except Exception:
        return JsonResponse(
            {'Error': 'Could not Base64 decode: %s' % data_name}
        )

    # python3 bytes > str
    data_name = data_name.decode('utf-8')

    modules = parade_settings.PARADE_FILTERS

    for m in modules:
        try:
            module = __import__('%s.data_providers' % m, fromlist=[''])
            if hasattr(module, 'get_dataproviders'):
                dp = module.get_dataproviders(request, conn)
                if data_name in dp:
                    data = module.get_data(request, data_name, conn)
                    values = numpy.array(list(data.values()))
                    rv = {'data': data}
                    # Adding histogram etc will fail if data is not numerical
                    try:
                        rv['min'] = numpy_to_json(numpy.amin(values))
                        rv['max'] = numpy_to_json(numpy.amax(values))
                        bins = 10
                        if NUMPY_GT_1_11_0:
                            # numpy.histogram() only supports bin calculation
                            # from 1.11.0 onwards
                            bins = 'auto'
                        histogram, bin_edges = numpy.histogram(values,
                                                               bins=bins)
                        rv['histogram'] = histogram.tolist()
                    except TypeError:
                        pass
                    return JsonResponse(rv)
        except ImportError:
            pass

    return JsonResponse({'Error': 'Data provider not found'})

def scripts_url_name(request):
    # Your view logic here
    return HttpResponse("This is the scripts view.")