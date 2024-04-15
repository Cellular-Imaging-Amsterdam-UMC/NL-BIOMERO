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
import FilterHub from '../../filter/FilterHub';
import config from '../../config';

class PlateLoader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            selectedWellIds: [],
        }
    }

    loadData() {
        let plateId = this.props.plateId,
            fieldId = this.props.fieldId;

        if (fieldId === undefined) {
            return;
        }

        const elements = ["plate", plateId, fieldId, ""];
        const url = config.webgatewayBaseUrl + elements.join("/");
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: v => {
                this.setState({
                    data: v,
                });
            }
        });
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Pattern to update based on discussion on this RFC issue:
        //  * https://github.com/reactjs/rfcs/issues/26
        if (prevProps.plateId !== this.props.plateId
                || prevProps.fieldId !== this.props.fieldId) {
            this.loadData();
        }
    }

    render() {
        if (this.props.fieldId === undefined) {
            return(<div></div>)
        }

        let filteredImageIds;

        // Use filter state to filter data.
        // Pass filteredImageIds down to PlateGrid
        let images = [];
        if (this.state.data) {
            this.state.data.grid.forEach(row => {
                row.forEach(col => {
                    // TODO: 
                    if (col) images.push(col);
                });
            });
        }

        return(<FilterHub
                    images={images}
                    parentType={"plate"}
                    parentId={this.props.plateId}
                    fieldId={this.props.fieldId}
                    plateData={this.state.data}
                    thumbnailLoader={this.props.thumbnailLoader}
                />)
    }
}

export default PlateLoader
