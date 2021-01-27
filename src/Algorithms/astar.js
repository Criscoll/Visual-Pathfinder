import * as constants from '../constants/constants';

export default function astar(grid, startNode, endNode, numRows, numCols) {
  let visitedNodes = [];
  let openList = [];
  let closedList = [];

  initialise(grid, numRows, numCols);

  openList.push(startNode);
  startNode.inOpenList = true;

  while (openList.length !== 0) {
    let currentNode = findLowestFCost(openList);

    if (currentNode === null) {
      return { visitedNodes: visitedNodes, pathFound: false };
    }

    visitedNodes.push(currentNode);
    // End case -- result has been found, return the traced path
    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      return { visitedNodes: visitedNodes, pathFound: true };
    }

    // Normal case -- move currentNode from open to closed, process each of its neighbours
    closedList.push(currentNode);
    currentNode.inClosedList = true;
    for (let i = 0; i < currentNode.adjacentNodes.length; i++) {
      let adjacentRow = currentNode.adjacentNodes[i].row;
      let adjacentCol = currentNode.adjacentNodes[i].col;

      let neighbour = grid[adjacentRow][adjacentCol];

      if (
        neighbour.inClosedList ||
        document.getElementById(`node-${neighbour.row}-${neighbour.col}`)
          .className === 'wall-node'
      ) {
        // not a valid node to process, skip to next neighbour
        continue;
      }

      // g score is the shortest distance from start to current node, we need to check if
      //   the path we have arrived at this neighbour is the shortest one we have seen yet

      let neighbourDistance = 1;
      if (
        document.getElementById(`node-${neighbour.row}-${neighbour.col}`)
          .className === 'weight-node'
      ) {
        neighbourDistance = constants.weightValue;
      }

      let gScore = currentNode.g + neighbourDistance; // 1 is the distance from a node to it's neighbour

      let gScoreIsBest = false;

      if (!neighbour.inOpenList) {
        // This the the first time we have arrived at this node, it must be the best
        // Also, we need to take the h (heuristic) score since we haven't done so yet

        gScoreIsBest = true;
        neighbour.h = heuristicValue(neighbour, endNode) * (1.0 + 0.001); // tiebreaker value added
        openList.push(neighbour);
        neighbour.inOpenList = true;
      } else if (gScore < neighbour.g) {
        // We have already seen the node, but last time it had a worse g (distance from start)
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        // Found an optimal (so far) path to this node.   Store info on how we got here and
        //  just how good it really is...
        neighbour.prev = currentNode;
        neighbour.g = gScore;
        neighbour.f = neighbour.g + neighbour.h;
      }
    }
  }

  // No result was found -- empty array signifies failure to find path
  return { visitedNodes: visitedNodes, pathFound: false };
}

function initialise(grid, numRows, numCols) {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let node = grid[i][j];
      node['f'] = null;
      node['h'] = null;
      node['g'] = null;
      node['inOpenList'] = false;
      node['inClosedList'] = false;
    }
  }

  return grid;
}

function findLowestFCost(openList) {
  let lowInd = 0;
  for (let i = 0; i < openList.length; i++) {
    if (openList[i].f < openList[lowInd].f) {
      lowInd = i;
    }
  }
  let minFNode = openList[lowInd];
  openList.splice(lowInd, 1);
  minFNode.inOpenList = false;
  return minFNode;
}

function heuristicValue(pos0, pos1) {
  let d1 = Math.abs(pos1.row - pos0.row);
  let d2 = Math.abs(pos1.col - pos0.col);

  return d1 + d2;
}
