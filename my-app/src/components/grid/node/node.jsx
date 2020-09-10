import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.setWall = this.setWall.bind(this);

    this.state = {
      nodeType: "",
    };
  }

  render() {
    return (
      <div
        className={this.state.nodeType}
        onClick={this.getSelectionFunction()}
      ></div>
    );
  }

  componentDidMount() {
    let nodeType = this.props.nodeType;
    this.setState({ nodeType });
  }

  getSelectionFunction() {
    let selectionFunction = this.setWall;
    if (this.props.selectionMode === "start") {
      selectionFunction = this.setStart;
    } else if (this.props.selectionMode === "end") {
      selectionFunction = this.setEnd;
    }

    return selectionFunction;
  }

  setStart() {
    if (this.props.startNodeSet === false) {
      console.log("HEREEE");
      this.props.handleStartNodeSet();
      let nodeType = "start-node";
      this.setState({ nodeType });
    }
  }

  setEnd() {
    let nodeType = "end-node";
    this.setState({ nodeType });
  }

  setWall() {
    let nodeType = "wall-node";
    this.setState({ nodeType });
  }
}

export default Node;
