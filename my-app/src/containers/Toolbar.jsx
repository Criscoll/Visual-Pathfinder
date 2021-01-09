import React from 'react';
import '../styles/main.css';
import AlgorithmsButton from '../components/AlgorithmsButton';
import ClearGridButton from '../components/ClearGridButton';
import StartButton from '../components/StartButton';

export default function Toolbar() {
  return (
    <React.Fragment>
      <div id="toolbar">
        <div className="app-heading-name">Visual Pathfinder</div>
        <div className="buttons">
          <AlgorithmsButton />
          <ClearGridButton />
          <StartButton />
        </div>
      </div>
    </React.Fragment>
  );
}
