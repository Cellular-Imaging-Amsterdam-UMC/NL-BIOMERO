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
import ParadeFilter from './ParadeFilter';
import config from '../config';


class FilterContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: [],
        }
        this.handleAddFilter = this.handleAddFilter.bind(this);
    }

    componentDidMount() {
        // list available filters (TODO: only for current data? e.g. plate)
        let url = config.filtersUrl;
        if (this.props.parentType && this.props.parentId) {
            url += '?' + this.props.parentType + '=' + this.props.parentId;
        } else {
            url += '?' + this.props.images.map(i => 'image=' + i.id).join('&');
        }
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    filters: data.data,
                });
            }
        });
    }

    handleAddFilter(event) {
        // When user chooses to ADD a filter by Name, setState of parent
        var filterName = event.target.value;
        if (filterName !== "--") {
            this.props.addFilter(filterName);
        }
    }

    render() {
        return(
            <div className="filterContainer">
                <select value={"--"} onChange={this.handleAddFilter}>
                    <option
                        value="--" >
                        Add filter...
                    </option>
                    {this.state.filters.map(function(n, i){
                        return (
                            <option
                                key={i}
                                value={n}>
                                {n}
                            </option>
                        );
                    })}
                </select>
                <br />
                {
                    this.props.filterNames.map((fname, idx) => (
                        <ParadeFilter
                            key={fname + idx}
                            filterIndex={idx}
                            filterValues={this.props.filterValues[idx]}
                            name={fname}
                            parentType={this.props.parentType}
                            parentId={this.props.parentId}
                            fieldId={this.props.fieldId}
                            images={this.props.images}
                            handleFilterLoaded={this.props.handleFilterLoaded}
                            handleFilterChange={this.props.handleFilterChange}
                            handleRemoveFilter={this.props.handleRemoveFilter}
                        />
                    ))
                }
            </div>
        )
    }
}

export default FilterContainer
