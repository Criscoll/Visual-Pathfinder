import React from 'react';
import '../styles/main.css';
import AlgorithmsButton from '../components/AlgorithmsButton';
import MazeGeneratorButton from '../components/MazeGeneratorButton';
import ClearGridButton from '../components/ClearGridButton';
import StartButton from '../components/StartButton';

export default function Toolbar(props) {
  return (
    <React.Fragment>
      <div id="toolbar">
        <div
          className="app-heading-name"
          onClick={() => {
            props.setTutorialModalOpen(true);
          }}
          style={{ opacity: '1' }}
        >
          Visual Pathfinder
        </div>
        <div className="buttons">
          <AlgorithmsButton
            setAlgorithm={props.setAlgorithm}
            algorithmRunning={props.algorithmRunning}
          />
          <MazeGeneratorButton
            generateMaze={props.generateMaze}
            algorithm={props.algorithm}
            algorithmRunning={props.algorithmRunning}
          />
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
