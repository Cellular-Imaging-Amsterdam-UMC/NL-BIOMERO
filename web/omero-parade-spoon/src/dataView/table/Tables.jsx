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
import DatasetTable from './DatasetTable';

class Tables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showHeatmapColumns: {},
            sortBy: undefined,
            sortReverse: false,
        }
        this.handleSortTable = this.handleSortTable.bind(this);
        this.handleShowHeatmap = this.handleShowHeatmap.bind(this);
    }

    componentDidMount() {
        $(this.refs.dataTable).selectable({
            filter: 'img',
            distance: 2,
            stop: () => {
                let dtype = this.props.imgJson[0].wellId ? 'well' : 'image';
                let idAttr = (dtype === 'well' ? 'data-wellid': 'data-id');
                // Make the same selection in the jstree etc
                let ids = [];
                $(".parade_dataTable .ui-selected").each(function(){
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

    handleSortTable(event, name) {
        event.preventDefault();
        // if already sorting by this key, toggle sortReverse
        this.setState(prevState => ({
            sortBy: name,
            sortReverse: prevState.sortBy === name ? !prevState.sortReverse : false,
        }));
    }

    handleShowHeatmap(event, name) {
        let checked = event.target.checked;
        let showHeatmapColumns = Object.assign({}, this.state.showHeatmapColumns);
        showHeatmapColumns[name] = checked;
        this.setState({
            showHeatmapColumns: showHeatmapColumns
        });
    }

    render() {
        let {imgJson, iconSize, tableData,
             showDatasets, selectedWellIds,
             handleImageWellClicked} = this.props;

        let components;
        // If showDatasets AND images have dataset info...
        if (showDatasets && imgJson.length > 0 && imgJson[0].datasetId) {
            // imgJson may come from several Datasets
            // Each image has datasetName and datasetId
            // Create list of datases [ {name: 'name', id:1, images: [imgs]} ]
            let datasets = imgJson.reduce((prev, img, idx, imgList) => {
                // if the last dataset is different from current one,
                // start new Dataset
                if (idx === 0 || imgList[idx - 1].datasetId !== img.datasetId) {
                    prev.push({name: img.datasetName,
                            id: img.datasetId,
                            images: []})
                }
                // Add image to the last Dataset
                prev[prev.length-1].images.push(img);
                return prev;
            }, []);

            components = datasets.map(dataset => (
                <DatasetTable
                    key={dataset.id}
                    tableTitle={dataset.name}
                    imgJson={dataset.images}
                    iconSize={iconSize}
                    tableData={tableData}
                    sortBy={this.state.sortBy}
                    sortReverse={this.state.sortReverse}
                    selectedWellIds={selectedWellIds}
                    showHeatmapColumns={this.state.showHeatmapColumns}
                    handleSortTable={this.handleSortTable}
                    handleShowHeatmap={this.handleShowHeatmap}
                    handleImageWellClicked={handleImageWellClicked}
                    thumbnails={this.props.thumbnails}
                />
            ))
        } else {
            components = (
                <DatasetTable
                    imgJson={imgJson}
                    iconSize={iconSize}
                    tableData={tableData}
                    sortBy={this.state.sortBy}
                    sortReverse={this.state.sortReverse}
                    selectedWellIds={selectedWellIds}
                    showHeatmapColumns={this.state.showHeatmapColumns}
                    handleSortTable={this.handleSortTable}
                    handleShowHeatmap={this.handleShowHeatmap}
                    handleImageWellClicked={handleImageWellClicked}
                    thumbnails={this.props.thumbnails}
                />
            );
        }
        return (
            <div className="parade_centrePanel"
                ref="dataTable">
                <table className="parade_dataTable">
                {components}
                </table>
            </div>
        );
    }
}

export default Tables
