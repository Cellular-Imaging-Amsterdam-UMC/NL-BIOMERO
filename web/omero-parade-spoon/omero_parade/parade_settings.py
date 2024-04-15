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

"""Settings for the omero-parade app."""

import sys
import json
from omeroweb.settings import process_custom_settings, report_settings

# load settings
PARADE_SETTINGS_MAPPING = {

    "omero.web.parade.max_csv_size":
        ["MAX_CSV_SIZE", 100000000, int,
         ("Maximum supported size of CSV files in bytes, to avoid trying \
          to load very large files for filtering or plotting. \
          The default is 100MB")],

    "omero.web.parade.filters":
        ["PARADE_FILTERS",
         '["omero_parade", "omero_parade.annotation_filters", '
         '"omero_parade.table_filters", "omero_parade.csv_filters"]',
         json.loads,
         ("Filters for filtering data. Each is a python module \
          that contains an omero_filter module"
          "that has a get_filters function")],
}

process_custom_settings(sys.modules[__name__], 'PARADE_SETTINGS_MAPPING')
report_settings(sys.modules[__name__])
