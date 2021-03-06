import React, { Component } from 'react';
import Grid from './containers/Grid';
import Toolbar from './containers/Toolbar';
import Stats from './containers/Stats';
import Info from './containers/Info';
import TutorialModal from './containers/TutorialModal';
import * as enumerations from './constants/enumerations';
class Main extends Component {
  constructor(props) {
    super(props);

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
    this.setAlgorithmRunning = this.setAlgorithmRunning.bind(this);
    this.setStats = this.setStats.bind(this);
    this.setGridModified = this.setGridModified.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
    this.setTutorialModalOpen = this.setTutorialModalOpen.bind(this);

    this.gridRef = React.createRef(); // used to handle reseting the grid.

    this.state = {
      algorithm: enumerations.algorithms.none,
      algorithmRunning: false,
      algorithmName: null,
      algorithmUsed: null,
      pathLength: null,
      nodesChecked: null,
      timeElapsed: null,
      clearStats: false,
      weightsDisabled: false,
      tutorialModalOpen: true,
    };
  }

  handleResetClick() {
    this.gridRef.current.resetGrid();
    this.setState({
      algorithmRunning: false,
      algorithmUsed: null,
      pathLength: null,
      nodesChecked: null,
      timeElapsed: null,
      clearStats: true,
    });
  }

  handleGoClick() {
    this.gridRef.current.runVisualiser(this.state.algorithm);
    this.setState({
      algorithmRunning: true,
      algorithmUsed: this.state.algorithmName,
      pathLength: null,
      nodesChecked: null,
      timeElapsed: null,
    });
  }

  setAlgorithmRunning(state) {
    this.setState({ algorithmRunning: state });
  }

  setAlgorithm(algorithm, algorithmName) {
    this.setState({ algorithm: algorithm, algorithmName: algorithmName });

    if (this.state.algorithm !== enumerations.algorithms.none) {
      this.gridRef.current.clearPaths();
    }
    if (
      [enumerations.algorithms.DFS, enumerations.algorithms.BFS].includes(
        algorithm
      )
    ) {
      this.setState({ weightsDisabled: true });
      const weightsRemoved = this.gridRef.current.removeWeights();
      if (weightsRemoved) {
        this.setGridModified();
      }
    } else {
      this.setState({ weightsDisabled: false });
    }
  }

  setStats(pathLength, nodesChecked, timeElapsed) {
    this.setState({
      pathLength: pathLength,
      nodesChecked: nodesChecked,
      timeElapsed: timeElapsed,
      clearStats: false,
    });
  }

  setGridModified() {
    if (!this.state.clearStats) {
      this.setState({ clearStats: true });
    }
  }

  setTutorialModalOpen(val) {
    this.setState({ tutorialModalOpen: val });
  }

  generateMaze(mazeType) {
    this.setGridModified();
    this.gridRef.current.generateMaze(mazeType);
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
          generateMaze={this.generateMaze}
          setTutorialModalOpen={this.setTutorialModalOpen}
        />
        <Stats
          algorithmUsed={this.state.algorithmUsed}
          pathLength={this.state.pathLength}
          nodesChecked={this.state.nodesChecked}
          timeElapsed={this.state.timeElapsed}
          clearStats={this.state.clearStats}
        />
        <Info selectedAlgorithm={this.state.algorithm} />
        <Grid
          forwardedRef={this.gridRef}
          setAlgorithmRunning={this.setAlgorithmRunning}
          setStats={this.setStats}
          setGridModified={this.setGridModified}
          algorithmRunning={this.state.algorithmRunning}
          weightsDisabled={this.state.weightsDisabled}
        />
        {this.state.tutorialModalOpen ? (
          <div
            onClick={() => {
              this.setState({ tutorialModalOpen: false });
            }}
          >
            <TutorialModal setModalOpen={this.setTutorialModalOpen} />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Main;
