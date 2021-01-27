import React, { useState } from 'react';
import ReactDom from 'react-dom';
import AppLogo from '../images/pathfinder-logo.svg';
import Pathfinding from '../images/pathfinding.gif';
import PlacingObstacles from '../images/placing-obstacles.gif';

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
          This short tutorial will help you get started with the application. If
          at any point this gets too boring to read feel free to close this
          tutorial to jump right in!
        </p>
        <img src={AppLogo} alt="logo" width="30%"></img>
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
          find the shortest distance between two points. This app provides a
          playground for such algorithms, to help visualise the way they behave
          and compare.
        </p>

        <p>
          A quick note: On this grid, these algoritms run very fast! So fast in
          fact I have manually slowed down their searching behaviour to help
          actually visualise what is happening, its not fun seeing everything
          happen in a milisecond or two :)
        </p>
        <img src={Pathfinding} alt="logo" width="30%"></img>
      </div>
    </React.Fragment>
  );
}

function PageThree() {
  return (
    <React.Fragment>
      <div className="page-three">
        <h1>Placing Walls and Weights</h1>
        <p>
          Walls are an impenetrable obstacle that prevents potential paths.
          Weights are also an obstacle, but can be traversed, one weight node is
          equivalent to 10 normal nodes in 'distance'.
        </p>

        <p>
          Walls can be placed by clicking and dragging across the grid. Holding
          the 'W' key while clicking will place weight nodes instead. Click the
          obstacles again to remove them.
        </p>
        <img src={PlacingObstacles} alt="placing walls gif" width="90%" />
      </div>
    </React.Fragment>
  );
}
