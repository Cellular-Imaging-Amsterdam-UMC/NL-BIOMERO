// import React, { Component } from "react";

// class Message extends React.Component {
//   constructor(props) {
//     super(props);
//     // Assuming no need for transientState or imagesJson in this component
//     // Set window.rodrigoprops with the component's props
//     window.rodrigoprops = props;
//   }

//   render() {
//     // Safely access window.rodrigoprops.treeSelectedNodes[0].datasetId
//     // Ensure treeSelectedNodes is not undefined and has at least one item
//     const datasetId =
//       window.rodrigoprops &&
//       window.rodrigoprops.treeSelectedNodes &&
//       window.rodrigoprops.treeSelectedNodes.length > 0
//         ? window.rodrigoprops.treeSelectedNodes[0].datasetId
//         : "Dataset ID not available";

//     return <div>{datasetId}</div>;
//   }
// }

// export default Message;indow.rprops = props;
import React, { Component } from "react";
import _ from "lodash";

class Message extends Component {
  constructor(props) {
    super(props);
    window.rodrigoprops = props;
    window.this.state = {
      selectedNodeDetails: this.extractNodeDetails(
        props.jstree.treeSelectedNodes
      ),
    };
  }

  componentDidUpdate(prevProps) {
    if (
      !_.isEqual(
        prevProps.jstree.treeSelectedNodes,
        this.props.jstree.treeSelectedNodes
      )
    ) {
      this.setState({
        selectedNodeDetails: this.extractNodeDetails(
          this.props.jstree.treeSelectedNodes
        ),
      });
    }
  }

  extractNodeDetails(nodes) {
    // This method mimics the logic found in DatasetContainer.jsx for processing nodes
    // Adjust the logic here based on the specific details you need to extract from each node
    return nodes
      ? nodes.map((node) => ({
          id: node.id,
          name: node.text, // Assuming 'text' contains the name. Adjust based on actual structure.
          datasetName: node.datasetName, // Assuming these properties exist. Adjust as needed.
          datasetId: node.datasetId,
        }))
      : [];
  }

  render() {
    const { selectedNodeDetails } = this.state;
    return (
      <div>
        <h2>Selected Nodes</h2>
        <ul>
          {selectedNodeDetails.map((detail) => (
            <li key={detail.id}>
              {detail.name} - Dataset: {detail.datasetName} (ID:{" "}
              {detail.datasetId})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Message;
