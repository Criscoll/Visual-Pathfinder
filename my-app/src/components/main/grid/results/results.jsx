import React, { Component } from "react";
import "./results.css";

class Results extends Component {
  render() {
    return <div className="container">{this.getMessage()}</div>;
  }

  getMessage() {
    let pathStatus = this.props.pathStatus;
    let message = "Visual Pathfinder is not running";
    if (pathStatus === "searching") {
      message = "searching for a path...";
    } else if (pathStatus === "found") {
      message = "path found!";
    } else if (pathStatus === "none") {
      message = "no path found";
    }

    return message;
  }
}

export default Results;
