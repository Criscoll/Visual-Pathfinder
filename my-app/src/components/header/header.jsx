import React, { Component } from "react";
import "./header.css";

class Header extends Component {
  state = {
    nodes: [],
  };

  render() {
    return (
      <div>
        <h1>Visual Pathfinder</h1>
        <ul className="node-selection">
          <li className="node-type" onClick={this.props.startClick}>
            Start
          </li>
          <li className="node-type" onClick={this.props.endClick}>
            End
          </li>
          <li className="node-type" onClick={this.props.wallClick}>
            Wall
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
