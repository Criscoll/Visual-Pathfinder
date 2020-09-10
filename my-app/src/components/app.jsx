import React, { Component } from "react";
import Header from "./header/header";
import Grid from "./grid/grid";

class MainWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionMode: "wall",
    };
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.handleWallClick = this.handleWallClick.bind(this);
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

  render() {
    console.log("APP RENDERED");
    return (
      <div>
        <Header
          startClick={this.handleStartClick}
          endClick={this.handleEndClick}
          wallClick={this.handleWallClick}
        />
        <Grid selectionMode={this.state.selectionMode} />
      </div>
    );
  }
}

export default MainWrapper;
