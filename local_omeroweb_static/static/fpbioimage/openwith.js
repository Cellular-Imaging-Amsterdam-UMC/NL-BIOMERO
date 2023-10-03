
// Copyright (c) 2017 University of Dundee.

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// FPBioimage was originally published in
// <https://www.nature.com/nphoton/journal/v11/n2/full/nphoton.2016.273.html>.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

OME.setOpenWithUrlProvider("omero_fpbioimage", function(selected, url) {
	// Start with index url, construct viewer url with Image id
	return url + "viewer/" + selected[0].id + "/";
});
