import React, { Component } from "react";
import Node from "./node/node";
import "./grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);

    this.handleStartNodeSet = this.handleStartNodeSet.bind(this);
  }

  state = {
    nodes: [],
    startNodeSet: false,
    endNodeSet: false,
  };

  handleStartNodeSet() {
    this.setState({ startNodeSet: true });
  }

  render() {
    const { nodes } = this.state;

    return (
      <div className="grid">
        {nodes.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, colIndex) => {
                return (
                  <Node
                    key={colIndex}
                    nodeType={node.nodeType}
                    selectionMode={this.props.selectionMode}
                    startNodeSet={this.state.startNodeSet}
                    handleStartNodeSet={this.handleStartNodeSet}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    let nodes = [];
    for (let row = 0; row < 15; row++) {
      let currentRow = [];
      for (let col = 0; col < 30; col++) {
        let currentNode = {
          row: row,
          col: col,
          nodeType: "normal-node",
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });
  }
}

export default Grid;
