import React, { Component } from 'react';
import '../styles/main.css';

class Node extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }
  state = {
    mounted: false,
  };

  handleMouseEnter() {
    if (this.props.isDragging) {
      this.props.handleNodeClick(this.props.row, this.props.col);
    }
  }

  handlePress() {
    this.props.handleNodePressed(this.props.row, this.props.col);
  }

  // shouldComponentUpdate() is used to tell react whether or not this child component should re-render. By default it returns true such that
  // whenever the parent re-renders so does the child. The check here ensures that shouldComponentUpdate() returns false (don't re-render)
  // unless the nodeType of this Node component changes
  shouldComponentUpdate(nextProps) {
    return this.props.resetClicked !== nextProps.resetClicked;
  }

  render() {
    return (
      <div
        id={'node-' + this.props.row + '-' + this.props.col}
        className={this.props.node.nodeType}
        onMouseDown={this.handlePress}
        onMouseUp={this.props.handleNodeReleased}
        onMouseEnter={this.handleMouseEnter}
      >
        <i className="material-icons walk">directions_walk</i>
        <i className="material-icons flag">flag</i>
        <i className="material-icons weight">fitness_center</i>
      </div>
    );
  }
}

export default Node;
