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
import config from '../../config';

const styles = {
    selected: {
        color: 'white',
        backgroundColor: '#3875d7',
        border: 'solid 1px #3875d7',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
    },
    fsSelected: {
        backgroundColor: '#cddcfc',
        border: 'solid 1px #cddcfc',
    }
}

class ImageIcon extends React.Component {

    constructor(props) {
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);
    }

    handleIconClick(event) {
        this.props.handleImageWellClicked(this.props.image, event);
    }

    getImgStyle() {
        var width = this.props.iconSize;
        return {width: width, maxHeight: width}
    }

    // After rendering, scroll selectd icon into view
    // NB: scrollIntoViewIfNeeded() is provided by polyfill
    componentDidUpdate() {
        if (this.props.image.selected && this.refs.icon) {
            this.refs.icon.scrollIntoViewIfNeeded();
        }
    }

    render() {

        var image = this.props.image,
            imgStyle = this.getImgStyle(),
            cls = [];

        let iconStyle = {width: this.props.iconSize, height: this.props.iconSize};
        if (image.fsSelected) {
            iconStyle = Object.assign({}, iconStyle, styles.fsSelected)
        };
        if (image.selected) {
            iconStyle = Object.assign({}, iconStyle, styles.selected)
        };

        let className = "";
        let src = this.props.src;
        if (!src) {
            className = "waiting";
            src = config.staticPrefix + "webgateway/img/spacer.gif";
        }
        return (
            <li className={"datasetThumb " + cls.join(" ")}
                id={"image_icon-" + image.id}
                style={iconStyle}
                data-fileset={image.data ? image.data.obj.filesetId : ""}
                data-type="image"
                data-id={image.id}
                tabIndex={0}
                onClick={this.handleIconClick}
            >
                    <img alt="image"
                        className={className}
                        style={imgStyle}
                        src={src}
                        title={image.name} />
            </li>
        )
    }
}

export default ImageIcon
