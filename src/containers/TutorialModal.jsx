import React, { useState } from 'react';
import ReactDom from 'react-dom';
import AppLogo from '../images/pathfinder-logo.svg';
import Pathfinding from '../images/pathfinding.gif';
import PlacingObstacles from '../images/placing-obstacles.gif';
import MovingNodes from '../images/moving-nodes.gif';

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

    if (val > 0 && pageNum < 5) {
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
          <div className="page-number">{pageNum}/5</div>
          <AiOutlineRight
            className={
              pageNum === 5 ? 'arrow-icons-disabled right' : 'arrow-icons right'
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
            {pageNum === 4 ? <PageFour /> : null}
            {pageNum === 5 ? <PageFive /> : null}
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
          tutorial to jump right in! Click on the logo in the top left to open
          up this tutorial at any time.
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

function PageFour() {
  return (
    <React.Fragment>
      <div className="page-four">
        <h1>Moving Start and End Nodes</h1>
        <p>
          The Start and End nodes are your starting position and destination.
          They can be re-positioned by clicking and dragging, then releasing
          them anywhere on the grid.
        </p>

        <img src={MovingNodes} alt="placing walls gif" width="90%" />
      </div>
    </React.Fragment>
  );
}

function PageFive() {
  return (
    <React.Fragment>
      <div className="page-five">
        <h1>Algorithms</h1>
        <p>
          <span className="algorithm-bold"> Dijkstras</span> - a very popular
          weighted search. Will find the shortest path.
        </p>
        <p>
          <span className="algorithm-bold"> A* (A star)</span> - the most
          effective algorithm in the list, is also a weighted search and uses a
          heuristic value in its search. Will find the shortest path.
        </p>
        <p>
          <span className="algorithm-bold"> BFS</span> - also known as Breadth
          First Search is an unweighted search, meaning it does not factor in
          distances in its choice for which nodes to visit. Will find the
          shortest path for an unweighted graph / grid. Weight nodes are
          disabled for this type of search.
        </p>
        <p>
          <span className="algorithm-bold"> DFS</span> - Depth First Search. A
          poor algorithm choice for pathfinding, this is also an unweighted
          search and so weight nodes are disabled. Is not guaranteed to find the
          shortest path.
        </p>
      </div>
    </React.Fragment>
  );
}
