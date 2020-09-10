import React, { Component } from "react";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      isStartHovered: false,
      isEndHovered: false,
      isWallHovered: false,
    };
    this.handleEventStartHover = this.handleEventStartHover.bind(this);
    this.handleEventEndHover = this.handleEventEndHover.bind(this);
    this.handleEventWallHover = this.handleEventWallHover.bind(this);
  }

  handleEventStartHover() {
    this.setState({ isStartHovered: !this.state.isStartHovered });
  }

  handleEventEndHover() {
    this.setState({ isEndHovered: !this.state.isEndHovered });
  }

  handleEventWallHover() {
    this.setState({ isWallHovered: !this.state.isWallHovered });
  }

  render() {
    const startBtnClass = this.state.isStartHovered
      ? "button-hovered"
      : "button-default";
    const endBtnClass = this.state.isEndHovered
      ? "button-hovered"
      : "button-default";
    const wallBtnClass = this.state.isWallHovered
      ? "button-hovered"
      : "button-default";

    return (
      <div>
        <h1>Visual Pathfinder</h1>
        <ul className="button-container">
          <button
            className={startBtnClass}
            onClick={this.props.startClick}
            onMouseEnter={this.handleEventStartHover}
            onMouseLeave={this.handleEventStartHover}
          >
            Start
          </button>
          <button
            className={endBtnClass}
            onClick={this.props.endClick}
            onMouseEnter={this.handleEventEndHover}
            onMouseLeave={this.handleEventEndHover}
          >
            End
          </button>
          <button
            className={wallBtnClass}
            onClick={this.props.wallClick}
            onMouseEnter={this.handleEventWallHover}
            onMouseLeave={this.handleEventWallHover}
          >
            Wall
          </button>
        </ul>
      </div>
    );
  }
}

export default Header;
