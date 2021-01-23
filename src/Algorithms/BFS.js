export default function DFS(grid, startNode, endNode) {
  let visitedNodes = [];
  let queue = [];

  queue.push(startNode);
  startNode.visited = true;

  while (queue.length !== 0) {
    let node = queue.shift();

    if (Object.keys(node).length === 0) {
      return { visitedNodes: visitedNodes, pathFound: false };
    }

    visitedNodes.push(node);

    if (node.row === endNode.row && node.col === endNode.col) {
      return { visitedNodes: visitedNodes, pathFound: true };
    }

    for (let i = 0; i < node.adjacentNodes.length; i++) {
      let adjacentRow = node.adjacentNodes[i].row;
      let adjacentCol = node.adjacentNodes[i].col;

      if (
        grid[adjacentRow][adjacentCol].visited === false &&
        document.getElementById(`node-${adjacentRow}-${adjacentCol}`)
          .className !== 'wall-node'
      ) {
        queue.push(grid[adjacentRow][adjacentCol]);
        grid[adjacentRow][adjacentCol].prev = node;
        grid[adjacentRow][adjacentCol].visited = true;
      }
    }
  }
  return { visitedNodes: visitedNodes, pathFound: false };
}
