import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import AppLogo from '../images/pathfinder-logo.svg';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

export default function TutorialModal() {
  const [pageNum, setPageNum] = useState(1);

  return ReactDom.createPortal(
    <React.Fragment>
      <div className="modal-overlay">
        <div
          className="modal-styles"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="page-number">{pageNum}/9</div>
          <AiOutlineRight className="arrow-icons right" />
          <AiOutlineLeft className="arrow-icons left" />

          <div className="modal-content">
            <h1>Welcome to the Visual Pathfinder Tool! </h1>
            <p>
              This short tutorial will help you get started with the application
              <br />
              <br />
              If at any point this gets too boring to read feel free to close
              this tutorial to jump right in!
            </p>
            <img src={AppLogo} alt="logo" height="350"></img>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('portal')
  );
}
