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
import { getHeatmapColor } from '../../util';
import config from '../../config';

const styles = {
    xAxisSelect: {
    },
    yAxisSelect: {

    },
}
class DataPlot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            xAxisName: undefined,
            yAxisName: undefined,
        }
        this.setAxisName = this.setAxisName.bind(this);
    }

    setAxisName(axis, event, otherAxis) {
        // Set BOTH axis names.
        // Since we start with both undefined, as soon as
        // user picks one to change, we set both.
        let name = event.target.value;
        if (axis === 'x') {
            this.setState({xAxisName: name, yAxisName: otherAxis});
        } else {
            this.setState({yAxisName: name, xAxisName: otherAxis});
        }
    }

    componentDidMount() {
        let dtype = this.props.imgJson[0].wellId ? 'well' : 'image';
        let idAttr = (dtype === 'well' ? 'data-wellid': 'data-id')
        $(this.refs.thumb_plot_canvas).selectable({
            filter: 'div',
            distance: 2,
            stop: () => {
                // Make the same selection in the jstree etc
                let ids = [];
                $(".thumbnail_plot_canvas .ui-selected").each(function(){
                    ids.push(parseInt($(this).attr(idAttr), 10));
                });
                this.props.setImagesWellsSelected(dtype, ids);
            },
        });
    }

    componentWillUnmount() {
        // cleanup plugin
        $(this.refs.dataIcons).selectable( "destroy" );
    }

    getAxisPercent(dataRanges, name, value) {
        if (!value) {
            return 0;
        }
        let minMax = dataRanges[name];
        let fraction = (value - (minMax[0]))/((minMax[1]) - (minMax[0]));
        return fraction * 100;
    }

    getAxisTicks(dataRanges, name, axisScales) {
        let minMax = dataRanges[name];
        let tickValues = axisScales.map( (scale, index) => {
            return (minMax[0] + ((minMax[1] - minMax[0]) * scale / 100.0)).toFixed(2);
        });
        return tickValues;
        let step = (minMax[1] - minMax[0]) / (numberOfTicks - 1);
        let ticks = Array.from(
            {length: numberOfTicks},
            (x, i) => (minMax[0] + i * step).toFixed(2));
        return ticks;
    }

    render() {
        let {imgJson, iconSize, tableData,
             handleImageWellClicked, selectedWellIds} = this.props;

        let xAxisName = this.state.xAxisName;
        let yAxisName = this.state.yAxisName;

        // Available axes are dataTable keys.
        let axisNames = Object.keys(tableData);
        if (axisNames.length < 2) {
            return (<div>Choose more data to load</div>)
        }

        if (xAxisName !== undefined) {
            axisNames.splice(axisNames.indexOf(xAxisName), 1);
        }
        if (yAxisName !== undefined) {
            axisNames.splice(axisNames.indexOf(yAxisName), 1);
        }
        if (xAxisName == undefined) {
            xAxisName = axisNames[0];
            axisNames.splice(0, 1);
        }
        if (yAxisName == undefined) {
            yAxisName = axisNames[0];
        }
        axisNames = Object.keys(tableData);
        let dataRanges = axisNames.reduce((prev, name) => {
            let v = tableData[name];
            prev[name] = [v.min, v.max];
            return prev;
        }, {});

        const images = imgJson.map(image => {
            const classNames = [];
            let src = this.props.thumbnails[image.id];
            if (!src) {
                classNames.push("waiting");
                src = config.staticPrefix + "webgateway/img/spacer.gif";
            }
            if (image.selected || selectedWellIds.includes(image.wellId)) {
                classNames.push("ui-selected");
            }
            const x = tableData[xAxisName].data[image.id];
            const y = tableData[yAxisName].data[image.id];

            {/* Tooltip info */}
            let properties = "";
            for (let key in tableData) {
                if (key != xAxisName && key != yAxisName) {
                    properties += "\n" + key + ": " + tableData[key].data[image.id];
                }
            }

            let left_position = this.getAxisPercent(dataRanges, xAxisName, x);
            let top_position = (100 - this.getAxisPercent(dataRanges, yAxisName, y));
            classNames.push("data-point");
            return (
                <div
                    style={{
                        left: left_position + '%',
                        top: top_position + '%'}}
                    key={image.id + (image.parent ? image.parent : "")}
                    className={classNames.join(" ")}
                    data-id={image.id}
                    data-wellid={image.wellId}
                    title={
                        "Image Name: " + image.name +
                        "\n" + xAxisName + ": " + x +
                        "\n" + yAxisName + ": " + y +
                        properties}
                    onClick={event => {handleImageWellClicked(image, event)}}
                ></div>
            )
        });
        const lineStyle = {
            stroke: 'black',
            strokeWidth: 1
        }
        const plotHeight = 450;
        const xAxisLabelScale = [0, 25, 50, 75, 100];
        const xAxisLabelValues = this.getAxisTicks(
            dataRanges, xAxisName, xAxisLabelScale);
        const xAxisTicks = xAxisLabelScale.map( (label, index) => {
            const xPos = label + "%";
            if (label == 0) {
                return (
                    <g>
                        <line className="plot-x-tick-lines"
                              x1={xPos} x2={xPos} y2="10"
                              style={{transform: "translateX(1px)"}}>
                        </line>
                        <text x={xPos} y="25"
                              style={{transform: "translateX(-10px)"}}>
                            {xAxisLabelValues[index]}
                        </text>
                    </g>
                )
            } else if (label == 100) {
                return (
                    <g>
                        <line className="plot-x-tick-lines"
                              x1={xPos} x2={xPos} y2="10">
                        </line>
                        <text x={xPos} y="25"
                              style={{transform: "translateX(-10px)"}}>
                            {xAxisLabelValues[index]}
                        </text>
                    </g>
                )
            } else {
                return (
                    <g>
                        <line className="plot-x-tick-lines"
                              x1={xPos} x2={xPos} y2="10">
                        </line>
                        <line className="plot-x-grid-lines"
                              x1={xPos} x2={xPos} y2={-plotHeight}>
                        </line>
                        <text x={xPos} y="25"
                              style={{transform: "translateX(-10px)"}}>
                            {xAxisLabelValues[index]}
                        </text>
                    </g>
                )
            }
        });
        const yAxisLabelScale = [0, 33, 66, 100];
        const yAxisLabelValues = this.getAxisTicks(
            dataRanges, yAxisName, yAxisLabelScale);
        const yAxisTicks = yAxisLabelScale.map( (label, index) => {
            const yPos = (100 - label) * plotHeight / 100;
            if (label == 0) {
                return (
                    <g>
                        <line className="plot-y-tick-lines"
                              y1={yPos} y2={yPos} x2="-10">
                        </line>
                        <text x="-45" y={yPos - 5}>
                            {yAxisLabelValues[index]}
                        </text>
                    </g>
                )
            } else if (label == 100) {
                return (
                    <g>
                        <line className="plot-y-tick-lines"
                              y1={yPos} y2={yPos} x2="-10"
                              style={{transform: "translateY(1px)"}}>
                        </line>
                        <text x="-45" y={yPos - 5}>
                            {yAxisLabelValues[index]}
                        </text>
                    </g>
                )
            } else {
                return (
                    <g>
                        <line className="plot-y-tick-lines"
                              y1={yPos} y2={yPos} x2="-10">
                        </line>
                        <line className="plot-y-grid-lines"
                              y1={yPos} y2={yPos} x2="100%">
                        </line>
                        <text x="-45" y={yPos - 5}>
                            {yAxisLabelValues[index]}
                        </text>
                    </g>
                )
            }
        });
        return (
            <div className="parade_centrePanel">
                {/* The Plot */}
                <div className="thumbnail_plot">
                    <div className="thumbnail_plot_canvas" ref="thumb_plot_canvas">
                        {images}
                    </div>
                </div>
                {/* X Axis Ticks */}
                <div className="plot-x-ticks">
                    <svg style={{width: "100%", resize: "both", fontSize: "10px", overflow: "inherit"}}>
                        {xAxisTicks}
                    </svg>
                </div>
                {/* X Axis Label */}
                <div className="plot-x-label">
                    <select onChange={(event) => {this.setAxisName('x', event, yAxisName)}}
                            value={xAxisName}
                            style={styles.xAxisSelect}>
                        {axisNames.map((n, i) => (<option key={i} value={n}> {n}</option>))}
                    </select>
                </div>
                {/* Y AXis Ticks */}
                <div className="plot-y-ticks">
                    <svg style={{width: "100%", resize: "both", fontSize: "10px", overflow: "inherit"}}>
                        {yAxisTicks}
                    </svg>
                </div>
                {/* Y Axis Label */}
                <div className="plot-y-label">
                    <select onChange={(event) => {this.setAxisName('y', event, xAxisName)}}
                            value={yAxisName}
                            style={styles.yAxisSelect}>
                        {axisNames.map((n, i) => (<option key={i} value={n}> {n}</option>))}
                    </select>
                </div>
            </div>
        );
    }
}

export default DataPlot
