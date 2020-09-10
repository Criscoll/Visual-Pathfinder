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
      buttonPressed: "",
    };
    this.handleEventStartHover = this.handleEventStartHover.bind(this);
    this.handleEventEndHover = this.handleEventEndHover.bind(this);
    this.handleEventWallHover = this.handleEventWallHover.bind(this);

    this.handleEventStartClick = this.handleEventStartClick.bind(this);
    this.handleEventEndClick = this.handleEventEndClick.bind(this);
    this.handleEventWallClick = this.handleEventWallClick.bind(this);
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

  handleEventStartClick() {
    this.props.startClick();
    this.setState({ buttonPressed: "start" });
  }

  handleEventEndClick() {
    this.props.endClick();
    this.setState({ buttonPressed: "end" });
  }

  handleEventWallClick() {
    this.props.wallClick();
    this.setState({ buttonPressed: "wall" });
  }

  render() {
    return (
      <div>
        <h1>Visual Pathfinder</h1>
        <ul className="button-container">
          <button
            className={this.getBtnClass("start")}
            onClick={this.handleEventStartClick}
            onMouseEnter={this.handleEventStartHover}
            onMouseLeave={this.handleEventStartHover}
          >
            Start
          </button>
          <button
            className={this.getBtnClass("end")}
            onClick={this.handleEventEndClick}
            onMouseEnter={this.handleEventEndHover}
            onMouseLeave={this.handleEventEndHover}
          >
            End
          </button>
          <button
            className={this.getBtnClass("wall")}
            onClick={this.handleEventWallClick}
            onMouseEnter={this.handleEventWallHover}
            onMouseLeave={this.handleEventWallHover}
          >
            Wall
          </button>
        </ul>
      </div>
    );
  }

  getBtnClass(button) {
    let btnClass = "";

    if (button === "start") {
      btnClass = this.state.isStartHovered
        ? "button-hovered"
        : "button-default";

      if (this.state.buttonPressed === "start") {
        btnClass = "button-clicked";
      }
    } else if (button === "end") {
      btnClass = this.state.isEndHovered ? "button-hovered" : "button-default";

      if (this.state.buttonPressed === "end") {
        btnClass = "button-clicked";
      }
    } else {
      btnClass = this.state.isWallHovered ? "button-hovered" : "button-default";

      if (this.state.buttonPressed === "wall") {
        btnClass = "button-clicked";
      }
    }

    return btnClass;
  }
}

export default Header;
