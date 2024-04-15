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

const styles = {
    footer: {
        position: 'relative',
        height: 25,
        flex: '0 0 25px',
        borderRight: 0,
        borderBottom: 'solid 1px hsl(210,10%,90%)',
        overflow: 'hidden',
        background: 'none repeat scroll 0 0 #EFF1F4',
    },
    slider: {
        position: 'absolute',
        right: 25,
        width: 120,
        top: 6,
        border: 'solid #aaa 1px',
    }
}

class Footer extends React.Component {
    
    render() {
        let {setIconSize, iconSize} = this.props;
        return (
            <div style={styles.footer} >
                <input
                    type="range"
                    style={styles.slider}
                    className="parade"
                    min="30"
                    max="200"
                    value={iconSize}
                    onChange={(event) => {setIconSize(event.target.value)}}
                />
            </div>
        );
    }
}

export default Footer
