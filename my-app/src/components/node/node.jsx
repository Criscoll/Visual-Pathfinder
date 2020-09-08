import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  constructor() {
    super();
    this.setStart = this.setStart.bind(this);
  }

  state = {
    nodeType: "",
  };

  render() {
    return <div className={this.state.nodeType} onClick={this.setStart}></div>;
  }

  componentDidMount() {
    let nodeType = this.props.nodeType;
    this.setState({ nodeType });
  }

  setStart() {
    let nodeType = "start-node";
    this.setState({ nodeType });
  }
}

export default Node;
