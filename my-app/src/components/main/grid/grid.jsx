import React, { Component } from "react";
import Node from "./node/node";
import "./grid.css";
import dijkstras from "../../../Algorithms/dijkstras";
import Results from "./results/results";

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
    startNodePreviouslySet: false,
    endNodePreviouslySet: false,
    isDragging: false,
    pathStatus: "",
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

  handleNodeClick(newRow, newColumn) {
    // console.log(
    //   newRow,
    //   newColumn,
    //   this.state.nodes[newRow][newColumn].adjacentNodes
    // );

    if (this.props.selectionMode === "") {
      return;
    }

    let nodes = this.copyNodes();
    let nodeSetMode = "wall-node";
    let nodePreviouslySet = false;

    if (this.props.selectionMode === "start") {
      nodeSetMode = "start-node";
      nodePreviouslySet = this.state.startNodePreviouslySet;
    } else if (this.props.selectionMode === "end") {
      nodeSetMode = "end-node";
      nodePreviouslySet = this.state.endNodePreviouslySet;
    }

    if (nodeSetMode !== "wall-node") {
      let rowColIndices = [-1, -1];
      let oldRow = -1;
      let oldCol = -1;
      if (nodePreviouslySet === false) {
        nodes[newRow][newColumn].nodeType = nodeSetMode;
        if (nodeSetMode === "start-node") {
          this.setState({
            nodes: nodes,
            startNode: nodes[newRow][newColumn],
            startNodePreviouslySet: true,
          });
        } else if (nodeSetMode === "end-node") {
          this.setState({
            nodes: nodes,
            endNode: nodes[newRow][newColumn],
            endNodePreviouslySet: true,
          });
        }
      } else {
        rowColIndices = this.findPrevNode(nodeSetMode);
        oldRow = rowColIndices[0];
        oldCol = rowColIndices[1];
      }

      if (oldRow !== -1 && oldCol !== -1) {
        nodes[oldRow][oldCol].nodeType = "normal-node";
        nodes[newRow][newColumn].nodeType = nodeSetMode;

        if (nodeSetMode === "start-node") {
          this.setState({
            nodes: nodes,
            startNode: nodes[newRow][newColumn],
          });
        } else {
          this.setState({
            nodes: nodes,
            endNode: nodes[newRow][newColumn],
          });
        }
      }
    } else {
      nodes[newRow][newColumn].nodeType = "wall-node";
      this.setState({ nodes });
    }
  }

  handleNodePressed(row, column) {
    this.setState({ isDragging: true });
    this.handleNodeClick(row, column);
  }

  handleNodeReleased() {
    if (this.state.isDragging) {
      this.setState({ isDragging: false });
    }
  }

  handleDragBug(e) {
    e.preventDefault();
    console.log("prevented a drag");
  }

  // Displays the nods on the grid with their state values
  render() {
    console.log("GRID RENDERED");
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

  findPrevNode(type) {
    let rowIndex = -1;
    let colIndex = -1;
    let nodes = this.copyNodes();

    for (let i = 0; i < nodes.length; i++) {
      colIndex = nodes[i].findIndex((currentColumn) => {
        return currentColumn.nodeType === type;
      });

      if (colIndex !== -1) {
        rowIndex = i;
        return [rowIndex, colIndex];
      }
    }

    return [-1, -1];
  }

  resetGrid() {
    let nodes = this.copyNodes();

    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].length; j++) {
        nodes[i][j] = {
          row: i,
          col: j,
          nodeType: "normal-node",
          adjacentNodes: [],
          isVisited: false,
          dist: Infinity,
          prev: {},
        };
      }
    }

    // !!! Maybe set this just before the algorithm runs in case you set walls etc
    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        this.setAdjacentNodes(nodes[row][col], nodes);
      }
    }

    this.setState({
      nodes: nodes,
      startNodePreviouslySet: false,
      endNodePreviouslySet: false,
      pathStatus: "",
    });
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
    return {
      row: row,
      col: col,
      nodeType: "normal-node",
      adjacentNodes: [],
      isVisited: false,
      dist: Infinity,
      prev: {},
    };
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

    this.setState({ pathStatus: "searching" });
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
          nodes[visited.row][visited.col].nodeType = "visited-node";
          this.setState({ nodes: nodes });
        }, 0);
      }
    }

    if (result.pathFound === false) {
      setTimeout(() => {
        this.setState({ pathStatus: "none" });
      }, 1000);
      return;
    }

    setTimeout(() => {
      let prev = endNode.prev;
      while (prev.row !== startNode.row || prev.col !== startNode.col) {
        nodes[prev.row][prev.col].nodeType = "path-node";
        prev = prev.prev;
      }
      this.setState({ nodes: nodes, pathStatus: "found" });
    }, 10 * visitedNodes.length);
  }
}

export default Grid;
