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
      if (grid[i][j].nodeType !== "wall-node") {
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
      if (s.adjacentNodes[i].nodeType !== "wall-node") {
        let alt = s.dist + distance(s, s.adjacentNodes[i]);
        if (alt < s.adjacentNodes[i].dist) {
          s.adjacentNodes[i].dist = alt;
          s.adjacentNodes[i].prev = s;
        }
      }
    }
  }

  return { visitedNodes: visitedNodes, pathFound: false };
}

// change this when weights are implemented
function distance(u, v) {
  return 1;
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
