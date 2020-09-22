import React, { Component } from "react";
import Node from "./node/node";
import "./grid.css";
import dijkstras from "../../../Algorithms/dijkstras";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleNodePressed = this.handleNodePressed.bind(this);
    this.handleNodeReleased = this.handleNodeReleased.bind(this);
    this.maxRow = 15;
    this.maxCol = 30;
  }

  state = {
    nodes: [],
    startNode: {},
    endNode: {},
    startNodePreviouslySet: false,
    endNodePreviouslySet: false,
    isDragging: false,
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

    let nodes = this.state.nodes;
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
    this.setState({ isDragging: false });
  }

  handleDrag(e) {
    e.preventDefault();
    console.log("prevented a drag");
  }

  // Displays the nods on the grid with their state values
  render() {
    let { nodes } = this.state;
    return (
      <div
        className="grid"
        onMouseLeave={this.handleNodeReleased}
        onDragStart={this.handleDrag}
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
    );
  }

  findPrevNode(type) {
    let rowIndex = -1;
    let colIndex = -1;
    let nodes = this.state.nodes;

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
    let nodes = this.state.nodes;

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
    });
  }

  setAdjacentNodes(node, nodes) {
    let row = node.row;
    let col = node.col;

    if (row !== 0) {
      node.adjacentNodes.push(nodes[row - 1][col]);
    }

    if (row !== this.maxRow - 1) {
      node.adjacentNodes.push(nodes[row + 1][col]);
    }

    if (col !== 0) {
      node.adjacentNodes.push(nodes[row][col - 1]);
    }

    if (col !== this.maxCol - 1) {
      node.adjacentNodes.push(nodes[row][col + 1]);
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

  // ================= PATHFINDING ALGORITHMS =====================
  visualiseDijkstras() {
    let nodes = [...this.state.nodes];
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

    let visitedNodes = result.visitedNodes;

    for (let i = 0; i < visitedNodes.length; i++) {
      if (visitedNodes[i] !== startNode && visitedNodes[i] !== endNode) {
        setTimeout(() => {
          let visited = visitedNodes[i];
          nodes[visited.row][visited.col].nodeType = "visited-node";
          this.setState({ nodes: nodes });
        }, 10 * i);
      }
    }

    if (result.pathFound === false) {
      setTimeout(() => {
        console.log("No path found");
      }, 1000);
      return;
    }

    setTimeout(() => {
      let prev = endNode.prev;
      while (prev.row !== startNode.row || prev.col !== startNode.col) {
        nodes[prev.row][prev.col].nodeType = "path-node";
        prev = prev.prev;
      }
      this.setState({ nodes: nodes });
    }, 10 * visitedNodes.length);

    console.log("Path found!");
  }
}

export default Grid;
