import React, { Component, useState, useEffect } from 'react';
import dijkstras from '../Algorithms/dijkstras';
import DFS from '../Algorithms/DFS';
import astar from '../Algorithms/astar';
import Node from '../components/Node';
import '../styles/main.css';
import * as enumerations from '../constants/algorithmEnum';

function useKeyPressed(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
}

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const hookValue = useKeyPressed('w');
    const { forwardedRef, ...rest } = props;
    return (
      <Component ref={forwardedRef} {...rest} weightKeyPressed={hookValue} />
    );
  };
}

class Grid extends Component {
  constructor(props) {
    super(props);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleNodePressed = this.handleNodePressed.bind(this);
    this.handleNodeReleased = this.handleNodeReleased.bind(this);
    this.maxRow = 21;
    this.maxCol = 54;
  }

  state = {
    nodes: [],
    startNode: {},
    endNode: {},
    isDragging: false,
    dragNode: 'wall',
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
    console.log(`row: ${row}, col: ${col}`);
    this.props.setGridModified();

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
      } else if (
        document.getElementById(`node-${row}-${col}`).className ===
          'wall-node' ||
        document.getElementById(`node-${row}-${col}`).className ===
          'weight-node'
      ) {
        document.getElementById(`node-${row}-${col}`).className = 'normal-node';
      } else {
        if (this.props.weightKeyPressed && !this.props.weightsDisabled) {
          document.getElementById(`node-${row}-${col}`).className =
            'weight-node';
        } else {
          document.getElementById(`node-${row}-${col}`).className = 'wall-node';
        }
      }
    }
    let audio = document.getElementById('click_sound').cloneNode(true);
    audio.volume = 0.1;
    audio.play();
  }

  handleNodePressed(row, column) {
    if (this.props.algorithmRunning) {
      return;
    }

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
      </React.Fragment>
    );
  }

  resetGrid() {
    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        if (
          [
            'wall-node',
            'visited-node',
            'path-node',
            'weight-node',
            'weight-node-visited',
            'weight-node-path',
          ].includes(document.getElementById(`node-${row}-${col}`).className)
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            'normal-node';
        }
      }
    }

    document.getElementById(
      `node-${this.state.startNode.row}-${this.state.startNode.col}`
    ).className = 'start-node';

    document.getElementById(
      `node-${this.state.endNode.row}-${this.state.endNode.col}`
    ).className = 'end-node';
  }

  setAdjacentNodes(node) {
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
        visited: false,
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
        visited: false,
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
        visited: false,
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

  removeWeights() {
    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        if (
          ['weight-node', 'weight-node-visited', 'weight-node-path'].includes(
            document.getElementById(`node-${row}-${col}`).className
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            'normal-node';
        }
      }
    }
  }

  clearPaths() {
    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        if (
          ['path-node', 'visited-node'].includes(
            document.getElementById(`node-${row}-${col}`).className
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            'normal-node';
        } else if (
          ['weight-node-visited', 'weight-node-path'].includes(
            document.getElementById(`node-${row}-${col}`).className
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            'weight-node';
        } else if (
          ['start-node-path'].includes(
            document.getElementById(`node-${row}-${col}`).className
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            'start-node';
        } else if (
          ['end-node-found'].includes(
            document.getElementById(`node-${row}-${col}`).className
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = 'end-node';
        }
      }
    }
  }

  generateMaze(mazeType) {
    this.resetGrid();

    if (mazeType === enumerations.mazes.random) {
      for (let row = 0; row < this.maxRow; row++) {
        for (let col = 0; col < this.maxCol; col++) {
          if (
            Math.random() * 100 > 65 &&
            !['start-node', 'end-node'].includes(
              document.getElementById(`node-${row}-${col}`).className
            )
          ) {
            setTimeout(() => {
              document.getElementById(`node-${row}-${col}`).className =
                'wall-node';
            }, 25 * col);
          }
        }
      }
    } else if (mazeType === enumerations.mazes.maze) {
      // for (let col = 0; col < this.maxCol; col++) {
      //   setTimeout(() => {
      //     document.getElementById(`node-${0}-${col}`).className = 'wall-node';
      //     document.getElementById(`node-${this.maxRow - 1}-${col}`).className =
      //       'wall-node';
      //   }, 25 * col);
      // }
      // for (let row = 0; row < this.maxRow; row++) {
      //   setTimeout(() => {
      //     document.getElementById(`node-${row}-${0}`).className = 'wall-node';
      //     document.getElementById(`node-${row}-${this.maxCol - 1}`).className =
      //       'wall-node';
      //   }, 25 * row);
      // }
      this.recursiveDivision({ row: 0, col: 0 }, this.maxCol, this.maxRow, 0);
    }
  }

  recursiveDivision(origin, width, height, globalCounter) {
    // Recursion termination
    if (width < 4 || height < 4) {
      return;
    }

    let isHorizontal = Math.floor((Math.random() * 100) % 2);
    // let isHorizontal = 0;

    let wallIdx = isHorizontal
      ? Math.floor(
          Math.random() * (height + origin.row - 2 - (origin.row + 1) + 1)
        ) +
        (origin.row + 1)
      : Math.floor(
          Math.random() * (width + origin.col - 2 - (origin.col + 1) + 1)
        ) +
        (origin.col + 1);
    // console.log(origin);
    // console.log(`wallIdx: ${wallIdx}, height: ${height}`);

    if (isHorizontal) {
      if (wallIdx >= this.maxRow) {
        return;
      }
      globalCounter = this.mazeBuildWall(
        origin,
        wallIdx,
        width,
        height,
        isHorizontal,
        globalCounter
      );
      this.recursiveDivision(
        origin,
        width,
        Math.abs(wallIdx - origin.row),
        globalCounter
      );
      this.recursiveDivision(
        { row: wallIdx + 1, col: origin.col },
        width,
        height - wallIdx - 1,
        globalCounter
      );
    } else {
      if (wallIdx >= this.maxCol) {
        return;
      }
      globalCounter = this.mazeBuildWall(
        origin,
        wallIdx,
        width,
        height,
        isHorizontal,
        globalCounter
      );
      this.recursiveDivision(
        origin,
        Math.abs(wallIdx - origin.col),
        height,
        globalCounter
      );
      this.recursiveDivision(
        { row: origin.row, col: wallIdx + 1 },
        width - wallIdx - 1,
        height,
        globalCounter
      );
    }
  }

  mazeBuildWall(origin, wallIdx, width, height, isHorizontal, globalCounter) {
    if (isHorizontal) {
      const wallHole = Math.floor(Math.random() * (width - 1)) + origin.col;
      for (let col = origin.col; col < width + origin.col; col++) {
        if (
          !['start-node', 'end-node'].includes(
            document.getElementById(`node-${wallIdx}-${col}`).className
          ) &&
          col !== wallHole
        ) {
          setTimeout(() => {
            document.getElementById(`node-${wallIdx}-${col}`).className =
              'wall-node';
          }, 50 * globalCounter);
          globalCounter++;
        }
      }
    } else {
      const wallHole = Math.floor(Math.random() * (height - 1)) + origin.row;
      for (let row = origin.row; row < height + origin.row; row++) {
        if (
          !['start-node', 'end-node'].includes(
            document.getElementById(`node-${row}-${wallIdx}`).className
          ) &&
          row !== wallHole
        ) {
          setTimeout(() => {
            document.getElementById(`node-${row}-${wallIdx}`).className =
              'wall-node';
          }, 50 * globalCounter);
          globalCounter++;
        }
      }
    }
    return globalCounter;
  }

  // ================= PATHFINDING ALGORITHMS =====================

  runVisualiser(algorithm) {
    let nodes = this.copyNodes();
    let startNode = nodes[this.state.startNode.row][this.state.startNode.col];
    let endNode = nodes[this.state.endNode.row][this.state.endNode.col];
    let pathFound = true;
    let result;

    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        if (
          ['weight-node-visited', 'weight-node-path'].includes(
            document.getElementById(`node-${row}-${col}`).className
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            'weight-node';
        } else if (
          ['visited-node', 'path-node'].includes(
            document.getElementById(`node-${row}-${col}`).className
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            'normal-node';
        } else if (
          document.getElementById(`node-${row}-${col}`).className ===
          'end-node-found'
        ) {
          document.getElementById(`node-${row}-${col}`).className = 'end-node';
        }
      }
    }

    if (algorithm === enumerations.algorithms.dijkstras) {
      result = dijkstras(
        nodes,
        startNode,
        endNode,
        this.maxRow,
        this.maxCol,
        pathFound
      );
    } else if (algorithm === enumerations.algorithms.DFS) {
      result = DFS(
        nodes,
        startNode,
        endNode,
        this.maxRow,
        this.maxCol,
        pathFound
      );
    } else if (algorithm === enumerations.algorithms.AStar) {
      result = astar(
        nodes,
        startNode,
        endNode,
        this.maxRow,
        this.maxCol,
        pathFound
      );
    } else {
      console.log('No algorithm selected');
    }

    this.visualisePath(result, startNode, endNode);
  }

  visualisePath(result, startNode, endNode) {
    let visitedNodes = result.visitedNodes;

    // visualise visited nodes
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        let visited = visitedNodes[i];

        if (visited === startNode) {
          document.getElementById(
            `node-${visited.row}-${visited.col}`
          ).className = 'start-node-visited';
        } else if (visited === endNode) {
          document.getElementById(
            `node-${visited.row}-${visited.col}`
          ).className = 'end-node-visited';
        } else if (
          document.getElementById(`node-${visited.row}-${visited.col}`)
            .className === 'weight-node'
        ) {
          document.getElementById(
            `node-${visited.row}-${visited.col}`
          ).className = 'weight-node-visited';
        } else {
          document.getElementById(
            `node-${visited.row}-${visited.col}`
          ).className = 'visited-node';
        }

        let audio = document.getElementById('loading_sound');
        audio.volume = 0.5;
        audio.play();
      }, 25 * i);
    }

    // visualise shortest path
    setTimeout(() => {
      if (result.pathFound === false) {
        document.getElementById('loading_sound').pause();
        document.getElementById('loading_sound').currentTime = 0;
        this.props.setAlgorithmRunning(false);
        return;
      }

      let prev = endNode.prev;

      let pathNodes = [];
      while (prev.row !== startNode.row || prev.col !== startNode.col) {
        pathNodes.push({ row: prev.row, col: prev.col });
        prev = prev.prev;
      }

      pathNodes.push({ row: startNode.row, col: startNode.col });

      let i = 1;
      pathNodes.reverse().forEach((node) => {
        setTimeout(
          (row, col, startNode) => {
            if (row === startNode.row && col === startNode.col) {
              document.getElementById(`node-${row}-${col}`).className =
                'start-node-path';
            } else if (
              document.getElementById(`node-${row}-${col}`).className ===
              'weight-node-visited'
            ) {
              document.getElementById(`node-${row}-${col}`).className =
                'weight-node-path';
            } else {
              document.getElementById(`node-${row}-${col}`).className =
                'path-node';
            }

            let audio = document.getElementById('path_sound').cloneNode(true);
            audio.volume = 0.3;
            audio.play();
          },
          40 * i,
          node.row,
          node.col,
          startNode
        );
        i++;
      });

      setTimeout(() => {
        document.getElementById(
          `node-${this.state.endNode.row}-${this.state.endNode.col}`
        ).className = 'end-node-found';
      }, 40 * i + 1);

      document.getElementById('loading_sound').pause();
      document.getElementById('loading_sound').currentTime = 0;
      this.props.setAlgorithmRunning(false);
      this.props.setStats(pathNodes.length, visitedNodes.length);
    }, 25 * visitedNodes.length);
  }
}

export default withMyHook(Grid);
