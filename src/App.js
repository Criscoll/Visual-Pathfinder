import React, { Component } from 'react';
import Grid from './containers/Grid';
import Toolbar from './containers/Toolbar';
import * as enumerations from './constants/algorithmEnum';

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
    this.setAlgorithmRunning = this.setAlgorithmRunning.bind(this);

    this.gridRef = React.createRef(); // used to handle reseting the grid.

    this.state = {
      algorithm: enumerations.algorithms.none,
      algorithmRunning: false,
    };
  }

  handleResetClick() {
    this.gridRef.current.resetGrid();
  }

  handleGoClick() {
    this.gridRef.current.visualiseDijkstras();
    this.setState({ algorithmRunning: true });
  }

  setAlgorithmRunning(state) {
    this.setState({ algorithmRunning: state });
  }

  setAlgorithm(value) {
    console.log(value);
    this.setState({ algorithm: value });
  }

  render() {
    console.log(this.state.algorithm);
    return (
      <React.Fragment>
        <Toolbar
          handleResetClick={this.handleResetClick}
          handleGoClick={this.handleGoClick}
          algorithm={this.state.algorithm}
          setAlgorithm={this.setAlgorithm}
          algorithmRunning={this.state.algorithmRunning}
        />

        {/* <Results pathStatus={this.state.pathStatus} /> */}
        <Grid
          ref={this.gridRef}
          setAlgorithmRunning={this.setAlgorithmRunning}
        />
      </React.Fragment>
    );
  }
}

export default Main;
