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

class DatasetTable extends React.Component {

    heatMapColor(dataRanges, name, value) {
        let minMax = dataRanges[name];
        let fraction = (value - minMax[0])/(minMax[1] - minMax[0]);
        return getHeatmapColor(fraction);
    }

    renderImages(imgJson, columnNames) {
        const tableData = this.props.tableData;
        if (imgJson.length < 1) {
            return null;
        }
        return imgJson.map(image => {
            const iconSize = this.props.iconSize;
            const selectedWellIds = this.props.selectedWellIds;
            const classNames = [];
            let src = this.props.thumbnails[image.id];
            if (!src) {
                classNames.push("waiting");
                src = config.staticPrefix + "webgateway/img/spacer.gif";
            }
            if (image.selected
                    || this.props.selectedWellIds.includes(image.wellId)) {
                classNames.push("ui-selected");
            }
            let dataRanges = columnNames.reduce((prev, name) => {
                let v = tableData[name];
                prev[name] = [v.min, v.max];
                return prev;
            }, {});
            const columnNameCells = columnNames.map(name => {
                let backgroundColor = 'transparent';
                if (this.props.showHeatmapColumns[name]) {
                    backgroundColor = this.heatMapColor(
                        dataRanges, name, tableData[name].data[image.id]
                    );
                }
                return (
                    <td key={name} style={{backgroundColor: backgroundColor}}>
                        {tableData[name].data[image.id]}
                    </td>
                )
            });
            return (
                <tr className={classNames.join(" ")} key={image.id + (image.parent ? image.parent : "")}>
                    <td><img alt="image"
                            className={classNames.join(" ")}
                            width={iconSize + "px"}
                            height={iconSize + "px"}
                            src={src}
                            title={image.name}
                            data-id={image.id}
                            data-wellid={image.wellId}
                            onClick={event => {
                                this.props.handleImageWellClicked(image, event)
                            }}
                        /></td>
                    <td>{image.name}</td>
                    {columnNameCells}
                </tr>
            )
        });
    }

    renderTableTitle(columnNames) {
        const tableTitle = this.props.tableTitle;
        if (!tableTitle) {
            return null;
        }
        return (
            <tr>
                <th colSpan={columnNames.length + 2}>{tableTitle}</th>
            </tr>
        )
    }

    render() {
        let imgJson = this.props.imgJson;
        if (this.props.sortBy != undefined) {
            // let orderedImageIds;
            let colDataToSort = this.props.tableData[this.props.sortBy].data;
            // Add a sortKey to imgJson
            imgJson = imgJson.map(i => Object.assign(i, {sortKey: colDataToSort[i.id]}));
            // sort...
            let reverse = this.props.sortReverse ? -1 : 1;
            imgJson.sort((a, b) => {
                if (a.sortKey === undefined) return -reverse;
                if (b.sortKey === undefined) return reverse;
                return a.sortKey < b.sortKey ? -reverse : reverse;
            });
        }

        const columnNames = Object.keys(this.props.tableData);
        return (
            <tbody>
                {this.renderTableTitle(columnNames)}
                <tr>
                    <td></td>
                    <td>Name</td>
                    {columnNames.map(name => (
                        <td key={name}>
                            <a onClick={(event) => {
                                this.props.handleSortTable(event, name)
                            }}>
                                {name}
                            </a>
                            <input
                                onClick={(event) => {
                                    this.props.handleShowHeatmap(event, name)
                                }}
                                type="checkbox"
                                title="Show Heatmap"/>
                        </td>
                    ))}
                </tr>
                {this.renderImages(imgJson, columnNames)}
            </tbody>
        );
    }
}

export default DatasetTable
