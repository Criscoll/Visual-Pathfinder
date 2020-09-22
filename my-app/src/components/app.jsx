import React, { Component } from "react";
import Main from "./main/main";

class MainWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default MainWrapper;
