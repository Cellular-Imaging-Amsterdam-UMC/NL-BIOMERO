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
import _ from 'lodash'
import axios from 'axios';

import Dataset from './dataset/Dataset';
import PlateGrid from './plate/PlateGrid';
import DataPlot from './plot/DataPlot';
import Tables from './table/Tables';
import Footer from '../Footer';
import config from '../config';

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iconSize: 50,
            layout: "icon",   // "icon", "plot" or "table"
            dataProviders: [],
            tableData: {},
            selectedWellIds: [],
            showDatasets: true,
            thumbnails: {},
        }
        this.setIconSize = this.setIconSize.bind(this);
        this.setLayout = this.setLayout.bind(this);
        this.setShowDatasets = this.setShowDatasets.bind(this);
        this.handleAddData = this.handleAddData.bind(this);
        this.handleImageWellClicked = this.handleImageWellClicked.bind(this);
        this.setImagesWellsSelected = this.setImagesWellsSelected.bind(this);
        this.setSelectedWells = this.setSelectedWells.bind(this);
    }

    setIconSize(size) {
        this.setState({iconSize: parseInt(size, 10)});
    }

    setLayout(layout) {
        this.setState({layout: layout});
    }

    setShowDatasets(event) {
        let show = event.target.checked;
        this.setState({showDatasets: show});
    }

    loadThumbnails() {
        const imageIds = this.props.filteredImages.map(v => v.id)
            .filter(v => !this.state.thumbnails[v]);
        if (imageIds.length < 1) {
            return;
        }
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        this.props.thumbnailLoader.getThumbnails(imageIds, (response) => {
            this.setState(prevState => {
                let thumbnails = prevState.thumbnails;
                for (const imageId in response.data) {
                    thumbnails[imageId] = response.data[imageId];
                }
                return {thumbnails: thumbnails};
            });
        }, (thrown) => {
            if (axios.isCancel(thrown)) {
                return;
            }
            // TODO: Put this error somewhere "correct"
            console.log("Error loading thumbnails!", thrown);
        }, this.source.token);
    }

    componentDidMount() {
        // list available data providers (TODO: only for current data? e.g. plate)
        let url = config.dataprovidersUrl;
        if (this.props.parentType === "project") {
            url += '?project=' + this.props.parentId;
        } else if (this.props.datasetId
                   || this.props.parentType === "dataset") {
            // FIXME: Be compatible with older implementations that
            // did not use a generic `parentId`.
            let datasetId = this.props.datasetId;
            if (!datasetId) {
                datasetId = this.props.parentId;
            }
            url += '?dataset=' + datasetId;
        } else if (this.props.plateId || this.props.parentType == "plate") {
            // FIXME: Be compatible with older implementations that
            // did not use a generic `parentId`.
            let plateId = this.props.plateId;
            if (!plateId) {
                plateId = this.props.parentId;
            }
            url += '?plate=' + plateId;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    dataProviders: data.data,
                });
            }
        });
        this.loadThumbnails();
    }

    componentWillUnmount() {
        if (this.source) {
            this.source.cancel();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const imageIds = this.props.filteredImages.map(v => v.id);
        const prevImageIds = prevProps.filteredImages.map(v => v.id);
        if (!_.isEqual(imageIds, prevImageIds)) {
            this.loadThumbnails();
        }
    }

    handleAddData(event) {
        // When user chooses to ADD data by Name, load it...
        var dataName = event.target.value;
        if (dataName !== "--") {
            var url = config.indexUrl + 'data/' + btoa(dataName) + '/';

            if (this.props.parentType === "plate") {
                url += '?plate=' + this.props.parentId;
                if (this.props.fieldId !== undefined) {
                    url += '&field=' + this.props.fieldId;
                }
            }
            else if (this.props.parentType === "dataset") {
                url += '?dataset=' + this.props.parentId;
            } else if (this.props.parentType === "project") {
                url += '?project=' + this.props.parentId;
            } else {
                url += '?' + this.props.filteredImages.map(i => 'image=' + i.id).join('&');
            }
            $.getJSON(url, data => {
                // Add data to table data
                let td = Object.assign({}, this.state.tableData);
                td[dataName] = data;
                this.setState({
                    tableData: td
                });
            });
        }
    }

    handleImageWellClicked(obj, event) {
        // Might be a Dataset image OR a Well that is selected.
        let imageId = obj.id;
        let wellId = obj.wellId;
        if (wellId) {
            // TODO - handle Shift/Ctrl-click
            this.setSelectedWells([wellId]);
            return;
        }
        let selIds = this.props.filteredImages.filter(i => i.selected).map(i => i.id);
        let imgIds = this.props.filteredImages.map(i => i.id);
        let clickedIndex = imgIds.indexOf(imageId);

        let toSelect = [];
        // handle shift
        if (event.shiftKey && selIds.length > 0) {
            // if any selected already, select range...
            let firstSelIndex = imgIds.indexOf(selIds[0]);
            let lastSelIndex = imgIds.indexOf(selIds[selIds.length - 1]);
            firstSelIndex = Math.min(firstSelIndex, clickedIndex);
            lastSelIndex = Math.max(lastSelIndex, clickedIndex);
            toSelect = imgIds.slice(firstSelIndex, lastSelIndex + 1);
        } else if (event.metaKey) {
            // handle Cmd -> toggle selection
            if (selIds.indexOf(imageId) === -1) {
                selIds.push(imageId)
                toSelect = selIds;
            } else {
                toSelect = selIds.filter(i => i !== imageId);
            }
        } else {
            // Only select clicked image
            toSelect = [imageId];
        }
        this.props.setSelectedImages(toSelect);
    }

    setImagesWellsSelected(dtype, ids) {
        // Selected state of IMAGES is handled in jstree
        // Selected state of WELLS is handled by this.state 
        if (dtype === 'well') {
            this.setSelectedWells(ids);
        } else {
            this.props.setSelectedImages(ids);
        }
    }

    setSelectedWells(wellIds) {
        this.setState({selectedWellIds: wellIds});
        // Trigger loading Wells in right panel...
        var well_index = this.props.fieldId;
        var selected_objs = wellIds.map(wId => ({id: 'well-' + wId, index: this.props.fieldId}))
        $("body")
            .data("selected_objects.ome", selected_objs)
            .trigger("selection_change.ome");
        // Update the buttons above jstree as if nothing selected
        // (but don't actually change selection in jstree).
        if (buttonsShowHide) {
            buttonsShowHide([]);
        }
    }

    render() {
        if (this.props.plateData === undefined && this.props.filteredImages === undefined) {
            return(<div></div>)
        }
        let filteredImages = this.props.filteredImages;
        let imageComponent;
        if (this.state.layout === "table") {
            imageComponent = (
                <Tables
                    iconSize={this.state.iconSize}
                    imgJson={filteredImages}
                    selectedWellIds={this.state.selectedWellIds}
                    showDatasets={this.state.showDatasets}
                    handleImageWellClicked = {this.handleImageWellClicked}
                    setImagesWellsSelected = {this.setImagesWellsSelected}
                    tableData={this.state.tableData}
                    thumbnails={this.state.thumbnails}
                    />)
        } else if (this.state.layout === "plot") {
            imageComponent = (
                <DataPlot
                    iconSize={this.state.iconSize}
                    imgJson={filteredImages}
                    tableData={this.state.tableData}
                    selectedWellIds={this.state.selectedWellIds}
                    handleImageWellClicked = {this.handleImageWellClicked}
                    setImagesWellsSelected = {this.setImagesWellsSelected}
                    thumbnails={this.state.thumbnails}
                    />)
        } else if (this.props.plateData) {
            imageComponent = (
                <PlateGrid
                    iconSize={this.state.iconSize}
                    plateData={this.props.plateData}
                    filteredImages={filteredImages}
                    tableData={this.state.tableData}
                    selectedWellIds={this.state.selectedWellIds}
                    handleImageWellClicked={this.handleImageWellClicked}
                    setImagesWellsSelected={this.setImagesWellsSelected}
                    thumbnails={this.state.thumbnails}
                    />)
        } else {
            imageComponent = (
                <Dataset
                    iconSize={this.state.iconSize}
                    imgJson={filteredImages}
                    showDatasets={this.state.showDatasets}
                    handleImageWellClicked={this.handleImageWellClicked}
                    setImagesWellsSelected={this.setImagesWellsSelected}
                    thumbnails={this.state.thumbnails}
                    />)
        }

        return(
                <div className="parade_layout_container">
                    <div className="layoutHeader">
                        <select value={"--"} onChange={this.handleAddData}>
                            <option
                                value="--" >
                                Add table data...
                            </option>
                            {this.state.dataProviders.map(function(n, i){
                                return (
                                    <option
                                        key={i}
                                        value={n}>
                                        {n}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="layoutControls">
                            <label>
                                Show Datasets
                                <input  type="checkbox"
                                        checked={this.state.showDatasets}
                                        onChange={this.setShowDatasets} />
                            </label>
                            <div>
                                <button onClick={() => {this.setLayout("icon")}}
                                        className={"iconLayoutButton " + (this.state.layout === "icon" ? "checked" : "")} />
                                <button onClick={() => {this.setLayout("table")}}
                                        className={"tableLayoutButton " + (this.state.layout === "table" ? "checked" : "")} />
                                <button onClick={() => {this.setLayout("plot")}}
                                        className={"plotLayoutButton " + (this.state.layout === "plot" ? "checked" : "")} />
                            </div>
                        </div>
                    </div>
                    {imageComponent}
                    <Footer
                        iconSize={this.state.iconSize}
                        setIconSize={this.setIconSize} />
                </div>)
    }
}

export default Layout
