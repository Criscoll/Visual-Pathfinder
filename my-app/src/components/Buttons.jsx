import React, { Component } from 'react';
import '../styles/main.css';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStartHovered: false,
      isEndHovered: false,
      isWallHovered: false,
    };

    this.handleStartHover = this.handleStartHover.bind(this);
    this.handleEndHover = this.handleEndHover.bind(this);
    this.handleWallHover = this.handleWallHover.bind(this);
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

  render() {
    return (
      <React.Fragment>
        <ul className="button-container">
          <button
            className={this.getBtnClass('start')}
            onClick={this.props.handleStartClick}
            onMouseEnter={this.handleStartHover}
            onMouseLeave={this.handleStartHover}
          >
            Start
          </button>
          <button
            className={this.getBtnClass('end')}
            onClick={this.props.handleEndClick}
            onMouseEnter={this.handleEndHover}
            onMouseLeave={this.handleEndHover}
          >
            End
          </button>
          <button
            className={this.getBtnClass('wall')}
            onClick={this.props.handleWallClick}
            onMouseEnter={this.handleWallHover}
            onMouseLeave={this.handleWallHover}
          >
            Wall
          </button>
        </ul>
      </React.Fragment>
    );
  }

  getBtnClass(button) {
    let btnClass = '';

    if (button === 'start') {
      btnClass = this.state.isStartHovered
        ? 'button-hovered'
        : 'button-default';

      if (this.props.buttonPressed === 'start') {
        btnClass = 'button-clicked';
      }
    } else if (button === 'end') {
      btnClass = this.state.isEndHovered ? 'button-hovered' : 'button-default';

      if (this.props.buttonPressed === 'end') {
        btnClass = 'button-clicked';
      }
    } else if (button === 'wall') {
      btnClass = this.state.isWallHovered ? 'button-hovered' : 'button-default';

      if (this.props.buttonPressed === 'wall') {
        btnClass = 'button-clicked';
      }
    } else if (button === 'reset') {
      btnClass = this.state.isResetHovered
        ? 'button-hovered'
        : 'button-default';
    } else if (button === 'go') {
      btnClass = this.state.isGoHovered ? 'button-hovered' : 'button-default';

      if (this.props.buttonPressed === 'go') {
        btnClass = 'button-clicked';
      }
    }

    return btnClass;
  }
}

export default Buttons;
