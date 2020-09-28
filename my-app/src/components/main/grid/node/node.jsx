import React, { Component } from 'react';
import './node.css';

class Node extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handleClick() {
    if (this.props.isDragging) {
      this.props.handleNodeClick(this.props.row, this.props.col);
    }
  }

  handlePress() {
    console.log(
      document.getElementById(`node-${this.props.row}-${this.props.col}`)
        .className
    );
    this.props.handleNodePressed(this.props.row, this.props.col);
  }

  // shouldComponentUpdate() is used to tell react whether or not this child component should re-render. By default it returns true such that
  // whenever the parent re-renders so does the child. The check here ensures that shouldComponentUpdate() returns false (don't re-render)
  // unless the nodeType of this Node component changes
  shouldComponentUpdate(nextProps) {
    return this.props.node.nodeType !== nextProps.node.nodeType;
  }

  render() {
    // console.log(`RENDERED-${this.props.row}-${this.props.col}`);
    return (
      <div
        id={'node-' + this.props.row + '-' + this.props.col}
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
