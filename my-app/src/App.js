import React, { Component } from 'react';
import Buttons from './components/Buttons';
import Grid from './containers/Grid';
import Toolbar from './containers/Toolbar';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      selectionMode: '',
      buttonPressed: '',
      resetGridCalled: false,
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.handleWallClick = this.handleWallClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);

    this.gridRef = React.createRef(); // used to handle reseting the grid. Need to access the method from here
  }

  handleStartClick() {
    this.setState({ selectionMode: 'start', buttonPressed: 'start' });
  }

  handleEndClick() {
    this.setState({ selectionMode: 'end', buttonPressed: 'end' });
  }

  handleWallClick() {
    this.setState({ selectionMode: 'wall', buttonPressed: 'wall' });
  }

  handleResetClick() {
    this.gridRef.current.resetGrid();
    this.setState({ selectionMode: '', buttonPressed: 'reset' });
  }

  handleGoClick() {
    this.setState({ buttonPressed: 'go' });
    this.gridRef.current.visualiseDijkstras();
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar
          handleResetClick={this.handleResetClick}
          handleGoClick={this.handleGoClick}
        />
        <Buttons
          buttonPressed={this.state.buttonPressed}
          handleStartClick={this.handleStartClick}
          handleEndClick={this.handleEndClick}
          handleWallClick={this.handleWallClick}
          handleResetClick={this.handleResetClick}
          handleGoClick={this.handleGoClick}
        />
        <Grid
          selectionMode={this.state.selectionMode}
          resetGrid={this.state.resetGridCalled}
          ref={this.gridRef}
        />
      </React.Fragment>
    );
  }
}

export default Main;
