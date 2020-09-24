import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handleClick() {
    if (this.props.isDragging) {
      this.props.handleNodeClick(this.props.node.row, this.props.node.col);
    }
  }

  handlePress() {
    this.props.handleNodePressed(this.props.node.row, this.props.node.col);
  }

  render() {
    return (
      <div
        id={"node-" + this.props.row + "-" + this.props.col}
        className={this.props.node.nodeType}
        onClick={this.handleClick}
        onMouseDown={this.handlePress}
        onMouseUp={this.props.handleNodeReleased}
        onMouseEnter={this.handleClick}
      ></div>
    );
  }
}

export default Node;
