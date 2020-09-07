import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  state = {};

  render() {
    let grids = [];
    for (let i = 0; i < 1000; i++) {
      grids.push(<div class="grid-item"></div>);
    }

    return <div class="grid-container">{grids}</div>;
  }
}

export default Node;
