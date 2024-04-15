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

import React, { Component } from "react";
import DataContainer from "./dataLoader/DataContainer";
import ThumbnailLoader from "./dataLoader/ThumbnailLoader";

class App extends Component {
  constructor(props) {
    super(props);
    this.thumbnailLoader = new ThumbnailLoader();
  }

  render() {
    return (
      <DataContainer
        jstree={this.props.jstree}
        thumbnailLoader={this.thumbnailLoader}
      />
    );
  }
}

export default App;
// import React from "react";
// import Message from "./assets/Message"; // Adjust the import path as necessary

// const App = (props) => {
//   // Assuming props.jstree is passed to App
//   return (
//     <div>
//       <h1>Appss Components</h1>
//       <Message jstree={props.jstree} />
//     </div>
//   );
// };

// export default App;
// import React, { useEffect } from "react";
// import Message from "./assets/Message";
// import _ from "lodash";

// const App = (props) => {
//   window.rprops = props;
//   console.log("message2");

//   const treeOpenNodes = props.jstree.treeOpenNodes.map((v) => v.id);
//   const treeSelectedNodes = props.jstree.treeSelectedNodes.map((v) => v.id);

//   const [ton, setTon] = useState(treeOpenNodes);
//   const [tsn, setTsn] = useState(treeSelectedNodes);

//   useEffect(() => {
//     if (!_.isEqual(treeOpenNodes, ton) || !_.isEqual(treeSelectedNodes, tsn)) {
//       console.log(props.jstree);
//     }
//   }, [treeOpenNodes, treeSelectedNodes]);

//   return /*  */ <div>Hello world!2!</div>;
// };

// export default App;
