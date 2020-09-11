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
      isResetHovered: false,
      buttonPressed: "",
    };
    this.handleStartHover = this.handleStartHover.bind(this);
    this.handleEndHover = this.handleEndHover.bind(this);
    this.handleWallHover = this.handleWallHover.bind(this);
    this.handleResetHover = this.handleResetHover.bind(this);

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.handleWallClick = this.handleWallClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleStartHover() {
    this.setState({ isStartHovered: !this.state.isStartHovered });
  }

  handleEndHover() {
    this.setState({ isEndHovered: !this.state.isEndHovered });
  }

  handleWallHover() {
    this.setState({ isWallHovered: !this.state.isWallHovered });
  }

  handleResetHover() {
    this.setState({ isResetHovered: !this.state.isResetHovered });
  }

  handleStartClick() {
    this.props.startClick();
    this.setState({ buttonPressed: "start" });
  }

  handleEndClick() {
    this.props.endClick();
    this.setState({ buttonPressed: "end" });
  }

  handleWallClick() {
    this.props.wallClick();
    this.setState({ buttonPressed: "wall" });
  }

  handleResetClick() {
    this.props.resetClick();
    this.setState({ buttonPressed: "reset" });
  }

  render() {
    return (
      <div>
        <h1>Visual Pathfinder</h1>
        <ul className="button-container">
          <button
            className={this.getBtnClass("start")}
            onClick={this.handleStartClick}
            onMouseEnter={this.handleStartHover}
            onMouseLeave={this.handleStartHover}
          >
            Start
          </button>
          <button
            className={this.getBtnClass("end")}
            onClick={this.handleEndClick}
            onMouseEnter={this.handleEndHover}
            onMouseLeave={this.handleEndHover}
          >
            End
          </button>
          <button
            className={this.getBtnClass("wall")}
            onClick={this.handleWallClick}
            onMouseEnter={this.handleWallHover}
            onMouseLeave={this.handleWallHover}
          >
            Wall
          </button>
          <button
            className={this.getBtnClass("reset")}
            onClick={this.handleResetClick}
            onMouseEnter={this.handleResetHover}
            onMouseLeave={this.handleResetHover}
          >
            Clear Grid
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
    } else if (button === "wall") {
      btnClass = this.state.isWallHovered ? "button-hovered" : "button-default";

      if (this.state.buttonPressed === "wall") {
        btnClass = "button-clicked";
      }
    } else if (button === "reset") {
      btnClass = this.state.isResetHovered
        ? "button-hovered"
        : "button-default";
    }

    return btnClass;
  }
}

export default Header;
