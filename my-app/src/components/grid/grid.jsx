import React, { Component } from "react";
import Node from "./node/node";
import "./grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.maxRow = 15;
    this.maxCol = 30;
  }

  state = {
    nodes: [],
    startNodePreviouslySet: false,
    endNodePreviouslySet: false,
  };

  componentDidMount() {
    let nodes = [];
    for (let row = 0; row < this.maxRow; row++) {
      let currentRow = [];
      for (let col = 0; col < this.maxCol; col++) {
        let currentNode = {
          row: row,
          col: col,
          nodeType: "normal-node",
          adjacent: [],
        };
        this.setAdjacentNodes(
          currentNode.row,
          currentNode.col,
          currentNode.adjacent
        );
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });
  }

  handleNodeClick(newRow, newColumn) {
    console.log(
      newRow,
      newColumn,
      this.state.nodes[newRow][newColumn].adjacent
    );
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
          this.setState({ nodes: nodes, startNodePreviouslySet: true });
        } else if (nodeSetMode === "end-node") {
          this.setState({ nodes: nodes, endNodePreviouslySet: true });
        }
      } else {
        rowColIndices = this.findPrevNode(nodeSetMode);
        oldRow = rowColIndices[0];
        oldCol = rowColIndices[1];
      }

      if (oldRow !== -1 && oldCol !== -1) {
        nodes[oldRow][oldCol].nodeType = "normal-node";
        nodes[newRow][newColumn].nodeType = nodeSetMode;

        this.setState({ nodes });
      }
    } else {
      nodes[newRow][newColumn].nodeType = "wall-node";
      this.setState({ nodes });
    }
  }

  render() {
    let { nodes } = this.state;
    return (
      <div className="grid">
        {nodes.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, colIndex) => {
                return (
                  <Node
                    key={colIndex}
                    node={node}
                    handleNodeClick={this.handleNodeClick}
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
        nodes[i][j].nodeType = "normal-node";
      }
    }

    this.setState({
      nodes: nodes,
      startNodePreviouslySet: false,
      endNodePreviouslySet: false,
    });
  }

  setAdjacentNodes(row, col, arr) {
    if (row !== 0) {
      arr.push({ row: row - 1, col: col });
    }

    if (row !== this.maxRow - 1) {
      arr.push({ row: row + 1, col: col });
    }

    if (col !== 0) {
      arr.push({ row: row, col: col - 1 });
    }

    if (col !== this.maxCol - 1) {
      arr.push({ row: row, col: col + 1 });
    }
  }
}

export default Grid;
