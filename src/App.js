import React, { Component } from 'react';
import Grid from './containers/Grid';
import Toolbar from './containers/Toolbar';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      algorithmRunning: false,
    };

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
    this.setAlgorithmRunning = this.setAlgorithmRunning.bind(this);

    this.gridRef = React.createRef(); // used to handle reseting the grid.
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

  render() {
    return (
      <React.Fragment>
        <Toolbar
          handleResetClick={this.handleResetClick}
          handleGoClick={this.handleGoClick}
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
