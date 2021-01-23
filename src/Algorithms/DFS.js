export default function DFS(grid, startNode, endNode) {
  let visitedNodes = [];
  let stack = [];

  stack.push(startNode);

  while (stack.length !== 0) {
    let node = stack.pop();

    if (Object.keys(node).length === 0) {
      return { visitedNodes: visitedNodes, pathFound: false };
    }

    visitedNodes.push(node);

    if (node.row === endNode.row && node.col === endNode.col) {
      return { visitedNodes: visitedNodes, pathFound: true };
    }

    if (node.visited === false) {
      node.visited = true;

      for (let i = 0; i < node.adjacentNodes.length; i++) {
        let adjacentRow = node.adjacentNodes[i].row;
        let adjacentCol = node.adjacentNodes[i].col;

        if (
          grid[adjacentRow][adjacentCol].visited === false &&
          document.getElementById(`node-${adjacentRow}-${adjacentCol}`)
            .className !== 'wall-node'
        ) {
          stack.push(grid[adjacentRow][adjacentCol]);
          grid[adjacentRow][adjacentCol].prev = node;
        }
      }
    }
  }
  return { visitedNodes: visitedNodes, pathFound: false };
}
