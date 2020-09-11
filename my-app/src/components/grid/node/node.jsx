import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleNodeClick(this.props.node.row, this.props.node.col);
  }

  render() {
    return (
      <div
        className={this.props.node.nodeType}
        onClick={this.handleClick}
      ></div>
    );
  }
}

export default Node;
