import * as constants from '../constants/constants';

export default function dikstrasAlgorithm(
  grid,
  startNode,
  endNode,
  numRows,
  numCols
) {
  let visitedNodes = [];
  let queue = [];

  startNode.dist = 0;
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (document.getElementById(`node-${i}-${j}`).className !== 'wall-node') {
        queue.push(grid[i][j]);
      }
    }
  }

  while (queue.length !== 0) {
    let s = findMinimum(queue);

    if (Object.keys(s).length === 0) {
      return { visitedNodes: visitedNodes, pathFound: false };
    }

    visitedNodes.push(s);

    if (s.row === endNode.row && s.col === endNode.col) {
      return { visitedNodes: visitedNodes, pathFound: true };
    }

    for (let i = 0; i < s.adjacentNodes.length; i++) {
      if (
        document.getElementById(
          `node-${s.adjacentNodes[i].row}-${s.adjacentNodes[i].col}`
        ).className !== 'wall-node'
      ) {
        let adjacentRow = s.adjacentNodes[i].row;
        let adjacentCol = s.adjacentNodes[i].col;
        let alt = s.dist + distance(s, s.adjacentNodes[i]);

        if (alt < grid[adjacentRow][adjacentCol].dist) {
          grid[adjacentRow][adjacentCol].dist = alt;
          grid[adjacentRow][adjacentCol].prev = s;
        }
      }
    }
  }

  return { visitedNodes: visitedNodes, pathFound: false };
}

// change this when weights are implemented
function distance(u, v) {
  if (
    document.getElementById(`node-${v.row}-${v.col}`).className == 'weight-node'
  ) {
    return constants.weightValue;
  } else {
    return 1;
  }
}

function findMinimum(queue) {
  let min = Infinity;
  let minIdx = 0;
  let minItem = {};

  for (let i = 0; i < queue.length; i++) {
    if (queue[i].dist < min) {
      min = queue[i].dist;
      minIdx = i;
      minItem = queue[i];
    }
  }

  queue.splice(minIdx, 1);
  return minItem;
}
