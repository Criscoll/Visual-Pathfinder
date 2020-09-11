import React, { Component } from "react";
import Header from "./header/header";
import Grid from "./grid/grid";

class MainWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionMode: "",
      resetGridCalled: false,
    };
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.handleWallClick = this.handleWallClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);

    this.handleResetState = this.handleResetState.bind(this);
  }

  handleStartClick() {
    this.setState({ selectionMode: "start" });
  }

  handleEndClick() {
    this.setState({ selectionMode: "end" });
  }

  handleWallClick() {
    this.setState({ selectionMode: "wall" });
  }

  handleResetClick() {
    this.setState({ resetGridCalled: true });
  }

  handleResetState() {
    this.setState({ resetGridCalled: !this.state.resetGridCalled });
  }

  render() {
    console.log(this.state.selectionMode);
    return (
      <div>
        <Header
          startClick={this.handleStartClick}
          endClick={this.handleEndClick}
          wallClick={this.handleWallClick}
          resetClick={this.handleResetClick}
        />
        <Grid
          selectionMode={this.state.selectionMode}
          resetGrid={this.state.resetGridCalled}
          changeResetState={this.handleResetState}
        />
      </div>
    );
  }
}

export default MainWrapper;
