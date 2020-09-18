function dikstrasAlgorithm(grid, startNode, endNode) {
  let visitedNodes = [];

  let queue = [];
  startNode.dist = 0;
  for (let i = 0; i < grid.maxRow; i++) {
    for (let j = 0; j < grid.maxCol; j++) {
      queue.push(grid.nodes[i][j]);
    }
  }

  while (!queue.empty) {
    let s = findMinimum(queue);
    visitedNodes.push(s);

    if (s.row == endNode.row && s.col == endNode.col) {
      return visitedNodes;
    }

    for (let i = 0; i < s.adjacentNodes.length; i++) {
      let alt = s.adjacentNodes[i].dist + distance(s, s.adjacentNodes[i]);

      if (alt < s.adjacentNodes[i].dist) {
        s.adjacentNodes[i].dist = alt;
        s.adjacentNodes[i].prev = s;
      }
    }
  }

  return visitedNodes;
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
