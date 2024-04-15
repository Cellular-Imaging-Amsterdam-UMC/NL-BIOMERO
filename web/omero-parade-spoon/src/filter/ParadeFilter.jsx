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
import { Sparklines, SparklinesBars } from 'react-sparklines';
import FilterInput from './FilterInput';
import config from '../config';


class ParadeFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterParams: [],
        }
        this.handleFilterInput = this.handleFilterInput.bind(this);
    }

    componentDidMount() {
        // Load /filter/?filter=filterName&plate=plateId script
        // which adds itself to the PARADE_FILTERS list,
        // like OPEN_WITH list.

        var url = config.indexUrl + 'filters/script/' + this.props.name + '/';
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
            url += '?' + this.props.images.map(i => 'image=' + i.id).join('&');
        }
        $.getJSON(url, function(data){
            if (!data.f) {
                return;
            }
            // Response has filter function - Needs eval()
            var f = eval(data.f);
            // Get current values - set state to parent
            var filterValues = data.params.reduce((prev, current) => {
                prev[current.name] = current.default;
                return prev;
            }, {});
            this.props.handleFilterLoaded(this.props.filterIndex, f, filterValues);

            this.setState({
                filterParams: data.params
            })
        }.bind(this));
    }
    
    handleFilterInput(paramName, value) {
        // Depending on how many filter parameters we have, their type, and
        // the availability of additional metadata this method may be invoked
        // by several other event handlers.  The defining characteristic that
        // allows us to recognise which `FilterInput` called us is
        // `paramName`.  The `paramName` *should* always match *one*
        // filter parameter.
        let filterParam = this.state.filterParams.filter(v => {
            return v.name === paramName;
        })[0];

        // If this filterParam object has extra data (histogram, min, max)
        // Then we assume it is the first param of a Table filter
        // and we are switching to a different column (named 'value')
        // We try to update the histogram, min & max values for this column
        if (filterParam.histograms) {
            this.setState({
                histogram: filterParam.histograms[value]
            });
        }
        if (filterParam.minima) {
            this.setState({
                minimum: filterParam.minima[value]
            });
        }
        if (filterParam.maxima) {
            this.setState({
                maximum: filterParam.maxima[value]
            });
        }

        let paramState = {};
        paramState[paramName] = value;

        // Also for Table filter, if switching column we want to reset the
        // 'count' we are filtering by.
        if (filterParam.maxima && filterParam.minima !== undefined) {
            paramState.count = undefined;
        }
        this.props.handleFilterChange(this.props.filterIndex, paramState);
    }

    render() {
        return(
            <div className="parade_filter">
                <div className="parade_filter_controls">
                    {this.props.name}
                    {this.state.filterParams.map(p => {
                        return <FilterInput
                                    param={p}
                                    min={this.state.minimum}
                                    max={this.state.maximum}
                                    key={p.name}
                                    onChange={this.handleFilterInput}
                                    value={this.props.filterValues[p.name]}
                                />
                    })}
                </div>
                <div className="sparkline">
                    <span className="minimum">{this.state.minimum}</span>
                    <Sparklines data={this.state.histogram}>
                        <SparklinesBars />
                    </Sparklines>
                    <span className="maximum">{this.state.maximum}</span>
                </div>
                <button
                    className="parade_removeFilter"
                    onClick={() => {this.props.handleRemoveFilter(this.props.filterIndex)}}>
                    X 
                </button>
            </div>
        )
    }
}

export default ParadeFilter
