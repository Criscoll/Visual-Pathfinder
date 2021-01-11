import React, { Component } from 'react';
import dijkstras from '../Algorithms/dijkstras';
import Node from '../components/Node';
import Results from '../components/Results';

import '../styles/main.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleNodePressed = this.handleNodePressed.bind(this);
    this.handleNodeReleased = this.handleNodeReleased.bind(this);
    this.maxRow = 20;
    this.maxCol = 50;
  }

  state = {
    nodes: [],
    startNode: {},
    endNode: {},
    isDragging: false,
    dragNode: 'wall',
    pathStatus: '',
  };

  componentDidMount() {
    let nodes = [];
    for (let row = 0; row < this.maxRow; row++) {
      let currentRow = [];
      for (let col = 0; col < this.maxCol; col++) {
        let currentNode = this.createNode(row, col);
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }

    // !!! Maybe set this just before the algorithm runs in case you set walls etc
    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        this.setAdjacentNodes(nodes[row][col], nodes);
      }
    }
    this.setState({ nodes });
  }

  handleNodeClick(row, col) {
    let nodes = this.copyNodes();
    let nodeType = 'wall-node';

    if (this.state.dragNode === 'start') {
      nodeType = 'start-node';
    } else if (this.state.dragNode === 'end') {
      nodeType = 'end-node';
    }

    if (nodeType !== 'wall-node') {
      let rowColIndices = [-1, -1];
      let oldRow = -1;
      let oldCol = -1;

      if (nodeType === 'start-node') {
        rowColIndices[0] = this.state.startNode.row;
        rowColIndices[1] = this.state.startNode.col;
      } else {
        rowColIndices[0] = this.state.endNode.row;
        rowColIndices[1] = this.state.endNode.col;
      }

      oldRow = rowColIndices[0];
      oldCol = rowColIndices[1];

      if (oldRow !== -1 && oldCol !== -1) {
        document.getElementById(`node-${oldRow}-${oldCol}`).className =
          'normal-node';

        document.getElementById(`node-${row}-${col}`).className = nodeType;

        if (nodeType === 'start-node') {
          this.setState({
            startNode: nodes[row][col],
          });
        } else {
          this.setState({
            endNode: nodes[row][col],
          });
        }
      }
    } else {
      if (
        this.state.startNode.row === row &&
        this.state.startNode.col === col
      ) {
        return;
      } else if (
        this.state.endNode.row === row &&
        this.state.endNode.col === col
      ) {
        return;
      } else {
        document.getElementById(`node-${row}-${col}`).className = 'wall-node';
      }
    }
    let audio = document.getElementById('click_sound').cloneNode(true);
    audio.volume = 0.1;
    audio.play();
  }

  handleNodePressed(row, column) {
    let dragNode = 'wall';
    if (
      this.state.startNode.row === row &&
      this.state.startNode.col === column
    ) {
      dragNode = 'start';
    } else if (
      this.state.endNode.row === row &&
      this.state.endNode.col === column
    ) {
      dragNode = 'end';
    }

    this.setState({ isDragging: true, dragNode: dragNode }, () => {
      this.handleNodeClick(row, column);
    });
  }

  handleNodeReleased() {
    if (this.state.isDragging) {
      this.setState({ isDragging: false });
    }
    this.setState({ dragNode: 'wall' });
  }

  handleDragBug(e) {
    e.preventDefault();
    console.log('prevented a drag');
  }

  // Displays the nodes on the grid with their state values
  render() {
    let { nodes } = this.state;
    return (
      <React.Fragment>
        <div
          className="grid"
          onMouseLeave={this.handleNodeReleased}
          onDragStart={this.handleDragBug}
        >
          {nodes.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, colIndex) => {
                  return (
                    <Node
                      key={colIndex}
                      node={node}
                      isDragging={this.state.isDragging}
                      handleNodeClick={this.handleNodeClick}
                      handleNodePressed={this.handleNodePressed}
                      handleNodeReleased={this.handleNodeReleased}
                      row={rowIndex}
                      col={colIndex}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Results pathStatus={this.state.pathStatus} />
      </React.Fragment>
    );
  }

  resetGrid() {
    let nodes = this.copyNodes();
    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        if (
          ['wall-node', 'visited-node', 'path-node'].includes(
            document.getElementById(`node-${row}-${col}`).className
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            'normal-node';
        }
      }
    }

    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        this.setAdjacentNodes(nodes[row][col], nodes);
      }
    }
  }

  setAdjacentNodes(node, nodes) {
    let row = node.row;
    let col = node.col;

    if (row !== 0) {
      node.adjacentNodes.push({ row: row - 1, col: col });
    }

    if (row !== this.maxRow - 1) {
      node.adjacentNodes.push({ row: row + 1, col: col });
    }

    if (col !== 0) {
      node.adjacentNodes.push({ row: row, col: col - 1 });
    }

    if (col !== this.maxCol - 1) {
      node.adjacentNodes.push({ row: row, col: col + 1 });
    }
  }

  createNode(row, col) {
    if (row === 8 && col === 10) {
      const nodeObject = {
        row: row,
        col: col,
        nodeType: 'start-node',
        adjacentNodes: [],
        isVisited: false,
        dist: Infinity,
        prev: {},
      };

      this.setState({ startNode: nodeObject });
      return nodeObject;
    } else if (row === 8 && col === 38) {
      const nodeObject = {
        row: row,
        col: col,
        nodeType: 'end-node',
        adjacentNodes: [],
        isVisited: false,
        dist: Infinity,
        prev: {},
      };
      this.setState({ endNode: nodeObject });
      return nodeObject;
    } else {
      return {
        row: row,
        col: col,
        nodeType: 'normal-node',
        adjacentNodes: [],
        isVisited: false,
        dist: Infinity,
        prev: {},
      };
    }
  }

  // performs a deep copy of the grid so that the state is not altered directly by accident.
  copyNodes() {
    let clone = [];
    this.state.nodes.forEach((x) => {
      let currentRow = [];
      x.forEach((nodes) => {
        let node = JSON.parse(JSON.stringify(nodes));
        node.dist = Infinity; // JSON.parse for some reason sets INFINITY to NULL in a deep copy
        currentRow.push(node);
      });

      clone.push(currentRow);
    });

    return clone;
  }

  // ================= PATHFINDING ALGORITHMS =====================
  visualiseDijkstras() {
    let nodes = this.copyNodes();
    let startNode = nodes[this.state.startNode.row][this.state.startNode.col];
    let endNode = nodes[this.state.endNode.row][this.state.endNode.col];
    let pathFound = true;

    let result = dijkstras(
      nodes,
      startNode,
      endNode,
      this.maxRow,
      this.maxCol,
      pathFound
    );

    this.setState({ pathStatus: 'searching' });
    let visitedNodes = result.visitedNodes;

    // Below is the chunk of code that deals with incrementally updating the node colour to show which nodes the algorithm
    // took in search of the goal node. To get this to work I utilise how the setTimeout function works with respect to react.
    // In react, setState is normally run asynchronously with multiple setState calls typically batched together into one single
    // setState call update for performance reasons. However, if setState is called within setTimeout, these calls now run synchronously.
    // The reason for this is due to how setTimeout() works, it doesn't guarantee that the callback function will run after whatever delay
    // you give it, it is only guaranteed to QUEUE UP the callback in a 'message queue' after that delay period. This message queue is a queue
    // of callback functions which are run AFTER ALL OTHER CODE IS RUN and which are run one after the other in the order in which they
    // were queued. I set a delay of 0 here because all I need to do is get this chunk of code into that queue and it will be run
    // synchronously, the delay just controls when the code is sent to that queue, all other code below must run first regardless so it
    // doesn't really matter.
    for (let i = 0; i < visitedNodes.length; i++) {
      if (visitedNodes[i] !== startNode && visitedNodes[i] !== endNode) {
        setTimeout(() => {
          let visited = visitedNodes[i];
          document.getElementById(
            `node-${visited.row}-${visited.col}`
          ).className = 'visited-node';

          let audio = document.getElementById('loading_sound');
          audio.volume = 0.5;
          audio.play();
        }, 25 * i);
      }
    }

    if (result.pathFound === false) {
      setTimeout(() => {
        this.setState({ pathStatus: 'none' });
      }, 1000);
      return;
    }

    setTimeout(() => {
      let prev = endNode.prev;
      while (prev.row !== startNode.row || prev.col !== startNode.col) {
        document.getElementById(`node-${prev.row}-${prev.col}`).className =
          'path-node';
        prev = prev.prev;
      }
      let audio = document.getElementById('path_sound').cloneNode(true);
      audio.volume = 0.5;
      audio.play();
      this.setState({ pathStatus: 'found' }, () => {
        document.getElementById('loading_sound').pause();
        document.getElementById('loading_sound').currentTime = 0;
      });
    }, 25 * visitedNodes.length);
  }
}

export default Grid;
