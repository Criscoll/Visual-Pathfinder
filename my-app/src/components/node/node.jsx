import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  state = {};
  render() {
    return <div className="node" key={this.props.keyName}></div>;
  }
}

export default Node;
