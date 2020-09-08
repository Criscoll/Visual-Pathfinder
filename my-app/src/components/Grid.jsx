import React, { Component } from "react";
import Node from "./node/node";

class Grid extends Component {
  state = {
    nodes: [],
  };

  render() {
    const { nodes } = this.state;
    console.log(nodes);
    return (
      <div className="grid">
        {nodes.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, colIndex) => {
                return <Node keyName={node}></Node>;
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
      for (let col = 0; col < 15; col++) {
        const currentNode = {
          col,
          row,
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });
  }
}

export default Grid;
