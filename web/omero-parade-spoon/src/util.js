//
// Copyright (C) 2018 University of Dundee & Open Microscopy Environment.
// All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

const getHeatmapColor = function(fraction) {
    // we only support one LUT just now
    var red = 0,
        green = 0,
        blue = 0,
        alpha = 1;
    // if (fraction > 0.25) {
    //     red = parseInt(256 * (fraction - 0.25) * 1.3);
    // }
    // if (fraction < 0.75) {
    //     green = parseInt(256 * (1 - (fraction * 1.3)));
    // }
    if (fraction > 0.5) {
        red = parseInt(256 * (fraction - 0.5) * 2);
    }
    if (fraction < 0.5) {
        green = parseInt((0.5 - fraction) * 2 * 256);
    }
    return "rgba(" + [red, green, blue, alpha].join(",") + ")";
}

export { getHeatmapColor }
