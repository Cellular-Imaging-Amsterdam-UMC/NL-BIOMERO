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

import React, { Component, useState, useEffect } from "react";
import FilterHub from "../../filter/FilterHub";
import _ from "lodash";

{
  /* <P text={'Helo'}></P>

const P = ({text}) => {

    const [textMemory, setTextMemory] = useState(text)

    const handleClick = () => {
        console.log("Click!")
        setTextMemory("Clicked")
    }
    useEffect(() => {
        console.log('Üse effect triggered')
    }, [textMemory, text])

    return text ? <button onClick={handleClick}>{textMemory}</button> : null
} */
}

class DatasetContainer extends React.Component {
  constructor(props) {
    super(props);
    let transientState = false;
    window.rodrigoprops = props;
    for (let openNode of props.treeOpenNodes) {
      if (props.jstree.is_loading(openNode)) {
        // State is transient, mounting may have been triggered
        // by a selection event on a jsTree node that has not yet
        // been loaded.  We will be notified of steady state by a
        // later event, at which time componentDidUpdate() will be
        // called.
        transientState = true;
        break;
      }
    }
    this.state = {
      imagesJson: this.createImagesJson(),
      transientState: transientState,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const treeOpenNodes = this.props.treeOpenNodes.map((v) => v.id);
    const prevTreeOpenNodes = prevProps.treeOpenNodes.map((v) => v.id);
    const treeSelectedNodes = this.props.treeSelectedNodes.map((v) => v.id);
    const prevTreeSelectedNodes = prevProps.treeSelectedNodes.map((v) => v.id);

    if (
      this.state.transientState ||
      !_.isEqual(treeOpenNodes, prevTreeOpenNodes) ||
      !_.isEqual(treeSelectedNodes, prevTreeSelectedNodes)
    ) {
      this.setState({
        imagesJson: this.createImagesJson(),
        transientState: false,
      });
    }

    // Log updates to treeOpenNodes or treeSelectedNodes with specific data-id
    if (!_.isEqual(treeOpenNodes, prevTreeOpenNodes)) {
      console.log("treeOpenNodes updated:", treeOpenNodes);
    }
    if (!_.isEqual(treeSelectedNodes, prevTreeSelectedNodes)) {
      this.props.treeSelectedNodes.forEach((node) => {
        const dataId = node.li_attr["data-id"];
        const type = node.type;
        if (type === "dataset") {
          console.log(`Dataset selected: ID=${dataId}`);
        } else if (type === "project") {
          console.log(`Project selected: ID=${dataId}`);
        } else if (type === "image") {
          console.log(`Image selected: ID=${dataId}`);
        }
      });
    }
  }

  createImagesJson() {
    const effectiveRootNode = this.props.effectiveRootNode;
    const imageNodes = this.getImageNodes();

    // Convert jsTree nodes into json for template
    let imagesJson = imageNodes.map((node) => this.marshalNode(node));
    // Get selected filesets IDs
    let selectedFilesetIds = imagesJson
      .filter((i) => i.selected)
      .map((i) => i.data.obj.filesetId);
    // Go through all images, adding fs-selection flag if in selected
    // fileset
    if (selectedFilesetIds.length > 0) {
      for (let imageJson of imagesJson) {
        const filesetId = imageJson.data.obj.filesetId;
        if (selectedFilesetIds.includes(filesetId)) {
          imageJson.fsSelected = true;
        }
      }
    }
    return imagesJson;
  }

  marshalNode(node) {
    const effectiveRootNode = this.props.effectiveRootNode;
    const dateFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const d = node.data.obj.date || node.data.obj.acqDate;
    let date = new Date(d);
    date = date.toLocaleTimeString(undefined, dateFormatOptions);
    let iData = {
      id: node.data.obj.id,
      name: node.text,
      data: JSON.parse(JSON.stringify(node.data)),
      selected: node.state.selected,
      date: date,
      parent: node.parent, // jstree node_id string e.g. 'j1_118'
      datasetName: node.datasetName,
      datasetId: node.datasetId,
    };
    // If image is in share and share is not owned by user...
    if (node.data.obj.shareId && !effectiveRootNode.data.obj.isOwned) {
      // share ID will be needed to open image viewer
      iData.shareId = node.data.obj.shareId;
    }
    return iData;
  }

  getImageNodes() {
    const jstree = this.props.jstree;
    let imageNodes = [];
    for (let openNode of this.props.treeOpenNodes) {
      for (let childNode of openNode.children) {
        childNode = jstree.get_node(childNode);
        if (childNode.type !== "image") {
          continue;
        }
        if (openNode.type === "dataset") {
          childNode.datasetName = openNode.text;
          childNode.datasetId = openNode.data.id;
        }
        imageNodes.push(childNode);
      }
    }
    return imageNodes;
  }

  render() {
    const effectiveRootNode = this.props.effectiveRootNode;
    return (
      <FilterHub
        parentType={effectiveRootNode.type}
        parentId={effectiveRootNode.data.obj.id}
        setSelectedImages={this.props.setSelectedImages}
        thumbnailLoader={this.props.thumbnailLoader}
        images={this.state.imagesJson}
      />
    );
  }
}

export default DatasetContainer;
