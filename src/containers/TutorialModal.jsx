import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import AppLogo from '../images/pathfinder-logo.svg';
import {
  AiOutlineRight,
  AiOutlineLeft,
  AiFillCloseCircle,
} from 'react-icons/ai';

export default function TutorialModal(props) {
  const [pageNum, setPageNum] = useState(1);

  function incrementPage(val) {
    if (val < 0 && pageNum > 1) {
      setPageNum((prevPageNum) => prevPageNum + val);
    }

    if (val > 0 && pageNum < 9) {
      setPageNum((prevPageNum) => prevPageNum + val);
    }
  }

  return ReactDom.createPortal(
    <React.Fragment>
      <div className="modal-overlay">
        <div
          className="modal-styles"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AiFillCloseCircle
            className="close-button"
            onClick={() => props.setModalOpen(false)}
          />
          <div className="page-number">{pageNum}/9</div>
          <AiOutlineRight
            className={
              pageNum === 9 ? 'arrow-icons-disabled right' : 'arrow-icons right'
            }
            onClick={() => incrementPage(1)}
          />
          <AiOutlineLeft
            className={
              pageNum === 1 ? 'arrow-icons-disabled left' : 'arrow-icons left'
            }
            onClick={() => incrementPage(-1)}
          />

          <div className="modal-content">
            {pageNum === 1 ? <PageOne /> : null}
            {pageNum === 2 ? <PageTwo /> : null}
            {pageNum === 3 ? <PageThree /> : null}
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('portal')
  );
}

function PageOne() {
  return (
    <React.Fragment>
      <div className="page-one">
        <h1>Welcome to the Visual Pathfinder Tool! </h1>
        <p>
          This short tutorial will help you get started with the application
          <br />
          <br />
          If at any point this gets too boring to read feel free to close this
          tutorial to jump right in!
        </p>
      </div>
    </React.Fragment>
  );
}

function PageTwo() {
  return (
    <React.Fragment>
      <div className="page-two">
        <h1>About this app </h1>
        <p>
          A pathfinding algorithm is an algorithm that typically attempts to
          find the shortest distance between two points
          <br />
          <br />
          This app provides a playground for such algorithms, to help visualise
          they way they behave and compare
        </p>
        <img src={AppLogo} alt="logo" height="350"></img>
      </div>
    </React.Fragment>
  );
}

function PageThree() {
  return (
    <React.Fragment>
      <div className="page-three">
        <h1>How to Use</h1>
        <p>
          Start and end locations can be changed by clicking and dragging the
          start and end nodes anywhere on the grid
        </p>
      </div>
    </React.Fragment>
  );
}
