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
    this.setPathLength = this.setPathLength.bind(this);

    this.gridRef = React.createRef(); // used to handle reseting the grid.

    this.state = {
      algorithm: enumerations.algorithms.none,
      algorithmRunning: false,
      pathLength: null,
    };
  }

  handleResetClick() {
    this.gridRef.current.resetGrid();
  }

  handleGoClick() {
    this.gridRef.current.runVisualiser(this.state.algorithm);
    this.setState({ algorithmRunning: true });
  }

  setAlgorithmRunning(state) {
    this.setState({ algorithmRunning: state });
  }

  setAlgorithm(value) {
    this.setState({ algorithm: value });
  }

  setPathLength(value) {
    this.setState({ pathLength: value });
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar
          handleResetClick={this.handleResetClick}
          handleGoClick={this.handleGoClick}
          algorithm={this.state.algorithm}
          setAlgorithm={this.setAlgorithm}
          algorithmRunning={this.state.algorithmRunning}
        />
        {this.state.pathLength ? (
          <p>Path Length: {this.state.pathLength}</p>
        ) : null}
        <Grid
          ref={this.gridRef}
          setAlgorithmRunning={this.setAlgorithmRunning}
          setPathLength={this.setPathLength}
        />
      </React.Fragment>
    );
  }
}

export default Main;
