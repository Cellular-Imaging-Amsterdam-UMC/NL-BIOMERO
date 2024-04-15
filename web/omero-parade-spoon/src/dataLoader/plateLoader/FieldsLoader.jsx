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
import PlateLoader from './PlateLoader';
import config from '../../config';

class Plate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            selectedField: undefined,
        }
    }

    loadData() {
        // Parent component enforces that there will only be one selected node
        const selectedNode = this.props.treeSelectedNodes[0];

        let data;
        if (selectedNode.type === "plate") {
            data = {'plate': selectedNode.data.id}
        } else if (selectedNode.type === "acquisition") {
            // select 'run', load plate...
            data = {'run': selectedNode.data.id};
        } else {
            return;
        }

        const url = config.indexUrl + "api/fields/";
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            cache: false,
            success: v => {
                this.setState({
                    fields: v.data,
                    selectedField: v.data[0]
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

        // Parent component enforces that there will only be one selected node
        const prevSelectedNode = prevProps.treeSelectedNodes[0];
        const selectedNode = this.props.treeSelectedNodes[0];
        if (prevSelectedNode.id !== selectedNode.id) {
            this.loadData();
        }
    }

    render() {
        if (this.props.treeOpenNodes.length < 1) {
            return null;
        }
        // Parent component enforces that there will only be one open node and
        // it will always be of "plate" type
        const plateNode = this.props.treeOpenNodes[0];
        return (
            <PlateLoader
                plateId={plateNode.data.id}
                fieldId={this.state.selectedField}
                thumbnailLoader={this.props.thumbnailLoader} />
        )
    }
}

export default Plate
