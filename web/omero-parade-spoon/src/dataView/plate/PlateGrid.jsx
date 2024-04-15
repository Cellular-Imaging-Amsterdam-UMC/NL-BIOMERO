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

import Well from './Well';


class PlateGrid extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(this.refs.plateGrid).selectable({
            filter: 'td.well',
            distance: 2,
            stop: () => {
                // Make the same selection in the jstree etc
                let ids = [];
                $(".plateGrid .ui-selected").each(function(){
                    ids.push(parseInt($(this).attr('data-wellid'), 10));
                });
                this.props.setImagesWellsSelected('well', ids);
            },
        });
    }

    componentWillUnmount() {
        // cleanup plugin
        $(this.refs.dataIcons).selectable( "destroy" );
    }

    render() {
        var data = this.props.plateData,
            iconSize = this.props.iconSize,
            placeholderStyle = {
                width: iconSize + 'px',
                height: iconSize + 'px',
            },
            selectedWellIds = this.props.selectedWellIds,
            handleImageWellClicked = this.props.handleImageWellClicked,
            tableData = this.props.tableData,
            filteredIds = this.props.filteredImages.map(i => i.id);
        if (!data) {
            return (
                <table />
            )
        }
        var columnNames = data.collabels.map(function(l){
            return (<th key={l}>{l}</th>);
        });
        var grid = data.grid;
        var rows = data.rowlabels.map((r, rowIndex) => {
            var wells = data.collabels.map((c, colIndex) => {
                var well = grid[rowIndex][colIndex];
                if (well) {
                    var hidden = (filteredIds !== undefined && filteredIds.indexOf(well.id) === -1);
                    var selected = selectedWellIds.indexOf(well.wellId) > -1;
                    // lookup this Well's data from heatmap
                    // var heatmapValues = heatmapData && heatmapData[well.wellId+""];
                    // tableData is mapped to Image IDs... (well.id is image ID!)
                    var imgTableData = Object.keys(tableData).map(col => col + ": " + tableData[col].data[well.id])
                    return (
                        <Well
                            key={well.wellId}
                            id={well.wellId}
                            iid={well.id}
                            thumb_url={this.props.thumbnails[well.id]}
                            selected={selected}
                            hidden={hidden}
                            iconSize={iconSize}
                            handleWellClick={(event) => {handleImageWellClicked(well, event)}}
                            row={r}
                            col={c}
                            imgTableData={imgTableData} />
                    )
                } else {
                    return (
                        <td className="placeholder" key={r + "_" + c}>
                            <div style={placeholderStyle} />
                        </td>);
                }
            });
            return (
                <tr key={r}>
                    <th>{r}</th>
                    {wells}
                </tr>
            );
        });

        return (
            <div className="plateGrid" ref="plateGrid">
                <table>
                    <tbody>
                        <tr>
                            <th> </th>
                            {columnNames}
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PlateGrid
