import React from 'react';
import ReactDom from 'react-dom';

export default function TutorialModal() {
  return ReactDom.createPortal(
    <React.Fragment>
      <div className="modal-overlay">
        <div
          className="modal-styles"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1>Welcome to the Visual Pathfinder Tool! </h1>
          <h2>What is the goal of this tool? </h2>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('portal')
  );
}
