import React from 'react';
import '../styles/main.css';
import AlgorithmsButton from '../components/AlgorithmsButton';
import ClearGridButton from '../components/ClearGridButton';
import StartButton from '../components/StartButton';

export default function Toolbar(props) {
  return (
    <React.Fragment>
      <div id="toolbar">
        <div className="app-heading-name">Visual Pathfinder</div>
        <div className="buttons">
          <AlgorithmsButton setAlgorithm={props.setAlgorithm} />
          <ClearGridButton
            handleResetClick={props.handleResetClick}
            algorithmRunning={props.algorithmRunning}
          />
          <StartButton
            handleGoClick={props.handleGoClick}
            algorithm={props.algorithm}
            algorithmRunning={props.algorithmRunning}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
