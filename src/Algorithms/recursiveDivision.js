import * as constants from '../constants/constants';

export default function recursiveDivision(origin, width, height, timer) {
  // Recursion termination
  if (width < 2 || height < 2) {
    return;
  }

  let isHorizontal = Boolean(width < height);
  if (width === height) {
    isHorizontal = randomIntFromInterval(0, 100) > 50;
  }
  // let isHorizontal = 0;

  let wallIdx = isHorizontal
    ? randomIntFromInterval(origin.row + 1, height + origin.row - 2)
    : randomIntFromInterval(origin.col + 1, width + origin.col - 2);

  // console.log(origin);
  // console.log(`wallIdx: ${wallIdx}, height: ${height}`);

  if (isHorizontal) {
    if (wallIdx >= constants.maxRow) {
      return;
    }
    timer = buildHorizontalWall(origin, wallIdx, width, timer);
    recursiveDivision(origin, width, Math.abs(wallIdx - origin.row), timer);
    recursiveDivision(
      { row: wallIdx + 1, col: origin.col },
      width,
      height - wallIdx - 1,
      timer
    );
  } else {
    if (wallIdx >= constants.maxCol) {
      return;
    }
    timer = buildVerticalWall(origin, wallIdx, height, timer);
    recursiveDivision(origin, Math.abs(wallIdx - origin.col), height, timer);
    recursiveDivision(
      { row: origin.row, col: wallIdx + 1 },
      width - wallIdx - 1,
      height,
      timer
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildHorizontalWall(origin, wallIdx, width, timer) {
  const wallHole = Math.floor(Math.random() * (width - 1)) + origin.col;
  for (let col = origin.col; col < width + origin.col; col++) {
    if (
      !['start-node', 'end-node'].includes(
        document.getElementById(`node-${wallIdx}-${col}`).className
      ) &&
      col !== wallHole
    ) {
      setTimeout(() => {
        document.getElementById(`node-${wallIdx}-${col}`).className =
          'wall-node';
      }, 50 * timer);
      timer++;
    }
  }
  return timer;
}

function buildVerticalWall(origin, wallIdx, height, timer) {
  const wallHole = Math.floor(Math.random() * (height - 1)) + origin.row;
  for (let row = origin.row; row < height + origin.row; row++) {
    if (
      !['start-node', 'end-node'].includes(
        document.getElementById(`node-${row}-${wallIdx}`).className
      ) &&
      row !== wallHole
    ) {
      setTimeout(() => {
        document.getElementById(`node-${row}-${wallIdx}`).className =
          'wall-node';
      }, 50 * timer);
      timer++;
    }
  }
  return timer;
}
