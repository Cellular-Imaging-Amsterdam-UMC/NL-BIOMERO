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
import FilterContainer from './FilterContainer';
import Layout from '../dataView/Layout';

class FilterHub extends React.Component {

    constructor(props) {
        super(props);
        // We store various filter inputs & defaults in STATE
        // but the filter functions are stored here
        const filterFunctions = [];
        const filterNames = [];
        const filterValues = [];
        const filteredImages = this.filterImages(
            filterFunctions, filterNames, filterValues
        );
        this.state = {
            filterFunctions: filterFunctions,
            filterNames: filterNames,
            filterValues: filterValues,   // [{'inputName':'value'}]
            filteredImages: filteredImages,
            iconSize: 50,
        }
        this.addFilter = this.addFilter.bind(this);
        this.handleFilterLoaded = this.handleFilterLoaded.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
        this.setIconSize = this.setIconSize.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!Object.is(this.props.images, prevProps.images)) {
            this.setState({
                filteredImages: this.filterImages(
                    this.state.filterFunctions, this.state.filterNames,
                    this.state.filterValues
                )
            });
        }
    }

    filterImages(filterFunctions, filterNames, filterValues) {
        const images = this.props.images;
        if (filterNames.length < 1) {
            return images;
        }
        let filteredImages;
        const startTime = performance.now();
        filteredImages = filterNames.reduce((imgList, name, idx) => {
            // get the filter function...
            let f = filterFunctions[idx];
            let paramValues = filterValues[idx];
            if (f && paramValues) {
                imgList = imgList.filter(image => f(image, paramValues));
            }
            return imgList;
        }, images);
        console.log("Filtering images took ms:", performance.now() - startTime);
        return filteredImages;
    }

    addFilter(filterName) {
        const filterNames = [...this.state.filterNames, filterName];
        const filteredImages = this.filterImages(
            this.state.filterFunctions, filterNames, this.state.filterValues
        );
        this.setState({
            filterNames: filterNames,
            filteredImages: filteredImages,
        });
    }

    handleFilterLoaded(filterIndex, filterFunc, defaultValues) {
        let filterFunctions = [...this.state.filterFunctions];
        filterFunctions[filterIndex] = filterFunc;
        let filterValues = [...this.state.filterValues];    // new list
        filterValues[filterIndex] = defaultValues;
        const filteredImages = this.filterImages(
            filterFunctions, this.state.filterNames, filterValues
        );
        this.setState({
            filterFunctions: filterFunctions,
            filterValues: filterValues,
            filteredImages: filteredImages,
        });
    }

    handleFilterChange(filterIndex, paramState) {
        // A parameter has changed in one of the list of filters...
        this.setState(prevState => {
            // Copy the previous set of values for the filter at this index,
            // and apply the new paramState
            let newValues = Object.assign({}, prevState.filterValues[filterIndex],
                                              paramState);
            // Make a copy of the previous list of parameter values
            let filterValues = [...prevState.filterValues];
            // And add back the new object to the correct index
            filterValues[filterIndex] = newValues;
            const filteredImages = this.filterImages(
                this.state.filterFunctions, this.state.filterNames,
                filterValues
            );
            return {
                filterValues: filterValues,
                filteredImages: filteredImages,
            }
        });
    }

    handleRemoveFilter(filterIndex) {
        let filterNames = [...this.state.filterNames];
        let filterValues = [...this.state.filterValues];
        filterNames.splice(filterIndex, 1);
        filterValues.splice(filterIndex, 1);
        const filteredImages = this.filterImages(
            this.state.filterFunctions, filterNames, filterValues
        );
        this.setState({
            filterNames: filterNames,
            filterValues: filterValues,
            filteredImages: filteredImages,
        });
    }

    setIconSize(size) {
        this.setState({iconSize: parseInt(size, 10)});
    }

    render() {
        return(<div className="reactContainer">
                    <FilterContainer
                        parentType={this.props.parentType}
                        parentId={this.props.parentId}
                        fieldId={this.props.fieldId}
                        images={this.props.images}
                        addFilter={this.addFilter}
                        handleFilterLoaded={this.handleFilterLoaded}
                        handleFilterChange={this.handleFilterChange}
                        handleRemoveFilter={this.handleRemoveFilter}
                        filterNames={this.state.filterNames}
                        filterValues={this.state.filterValues}
                        />
                    <Layout
                        parentType={this.props.parentType}
                        parentId={this.props.parentId}
                        fieldId={this.props.fieldId}
                        setSelectedImages={this.props.setSelectedImages}
                        plateData={this.props.plateData}
                        filteredImages={this.state.filteredImages}
                        thumbnailLoader={this.props.thumbnailLoader}
                        />
                </div>)
    }
}

export default FilterHub
