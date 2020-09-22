import React, { Component } from "react";
import "./buttons.css";

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStartHovered: false,
      isEndHovered: false,
      isWallHovered: false,
      isResetHovered: false,
      isGoHovered: false,
    };

    this.handleStartHover = this.handleStartHover.bind(this);
    this.handleEndHover = this.handleEndHover.bind(this);
    this.handleWallHover = this.handleWallHover.bind(this);
    this.handleResetHover = this.handleResetHover.bind(this);
    this.handleGoHover = this.handleGoHover.bind(this);
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

  handleGoHover() {
    this.setState({ isGoHovered: !this.state.isGoHovered });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Visual Pathfinder</h1>
        <ul className="button-container">
          <button
            className={this.getBtnClass("start")}
            onClick={this.props.handleStartClick}
            onMouseEnter={this.handleStartHover}
            onMouseLeave={this.handleStartHover}
          >
            Start
          </button>
          <button
            className={this.getBtnClass("end")}
            onClick={this.props.handleEndClick}
            onMouseEnter={this.handleEndHover}
            onMouseLeave={this.handleEndHover}
          >
            End
          </button>
          <button
            className={this.getBtnClass("wall")}
            onClick={this.props.handleWallClick}
            onMouseEnter={this.handleWallHover}
            onMouseLeave={this.handleWallHover}
          >
            Wall
          </button>
          <button
            className={this.getBtnClass("reset")}
            onClick={this.props.handleResetClick}
            onMouseEnter={this.props.handleResetHover}
            onMouseLeave={this.props.handleResetHover}
          >
            Clear Grid
          </button>
          <button
            className={this.getBtnClass("go")}
            onClick={this.props.handleGoClick}
            onMouseEnter={this.handleGoHover}
            onMouseLeave={this.handleGoHover}
          >
            Go
          </button>
        </ul>
      </React.Fragment>
    );
  }

  getBtnClass(button) {
    let btnClass = "";

    if (button === "start") {
      btnClass = this.state.isStartHovered
        ? "button-hovered"
        : "button-default";

      if (this.props.buttonPressed === "start") {
        btnClass = "button-clicked";
      }
    } else if (button === "end") {
      btnClass = this.state.isEndHovered ? "button-hovered" : "button-default";

      if (this.props.buttonPressed === "end") {
        btnClass = "button-clicked";
      }
    } else if (button === "wall") {
      btnClass = this.state.isWallHovered ? "button-hovered" : "button-default";

      if (this.props.buttonPressed === "wall") {
        btnClass = "button-clicked";
      }
    } else if (button === "reset") {
      btnClass = this.state.isResetHovered
        ? "button-hovered"
        : "button-default";
    } else if (button === "go") {
      btnClass = this.state.isGoHovered ? "button-hovered" : "button-default";

      if (this.props.buttonPressed === "go") {
        btnClass = "button-clicked";
      }
    }

    return btnClass;
  }
}

export default Buttons;
