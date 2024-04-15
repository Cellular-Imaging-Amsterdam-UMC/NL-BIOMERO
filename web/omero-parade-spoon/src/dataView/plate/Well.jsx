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

import React, { Component } from 'react';

import config from '../../config';

class Well extends React.Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     // Only re-render if visibility changes
    //     return this.props.hidden !== nextProps.hidden;
    // },

    render() {
        let {id,
               iconSize,
               selected,
               hidden,
               row,
               col,
               thumb_url,
               imgTableData,
               handleWellClick,
               selectedHeatmap,
               heatmapRange,
               heatmapValues} = this.props;


        let heatmapColor = "rgba(255,255,255,0)";   // transparent by default
        let title = "" + row + col; // E.g. A1
        title = title + " " + imgTableData.join(" ");
        let imgStyle = {width: iconSize + 'px', maxHeight: iconSize + 'px'};
        if (hidden) {
            imgStyle.opacity = 0.1;
        }
        let divStyle = {width: iconSize + 'px', height: iconSize + 'px'};
        let cls = "";

        // if (selectedHeatmap) {
        //     var value = heatmapValues[selectedHeatmap];
        //     title += " " + value;
        //     if (heatmapRange && value) {
        //         var fraction = (value - heatmapRange[0]) / (heatmapRange[1] - heatmapRange[0]);
        //         heatmapColor = getHeatmapColor(fraction);
        //         divStyle.background = heatmapColor;
        //         cls += "heatmap";
        //     }
        // }
        if (selected) {
            cls += " ui-selected";
        }

        let className = "";
        let src = this.props.thumb_url;
        if (!src) {
            className = "waiting";
            src = config.staticPrefix + "webgateway/img/spacer.gif";
        }
        return (
            <td className={"well " + cls}
                data-wellid={id}
                title={""+row+col}>
                <div
                    style={divStyle}
                    onClick={event => {handleWellClick(event, id)}}
                    title={title}
                    >
                    <img
                        className={className}
                        src={src}
                        style={imgStyle} />
                </div>
            </td>
        )
    }
}

export default Well
