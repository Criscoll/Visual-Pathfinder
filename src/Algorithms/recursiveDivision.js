import * as constants from '../constants/constants';

export default function recursiveDivision(
  origin,
  width,
  height,
  wallInfo,
  timer,
  withWeight
) {
  // Recursion termination
  if (width < 2 || height < 2) {
    return timer;
  }

  let isHorizontal = Boolean(width < height);
  if (width === height) {
    isHorizontal = randomIntFromInterval(0, 100) > 50;
  }
  // let isHorizontal = 0;

  let wallIdx = isHorizontal
    ? randomIntFromInterval(origin.row + 1, height + origin.row - 2)
    : randomIntFromInterval(origin.col + 1, width + origin.col - 2);

  while (wallIdx % 2 === 0) {
    wallIdx = isHorizontal
      ? randomIntFromInterval(origin.row + 1, height + origin.row - 2)
      : randomIntFromInterval(origin.col + 1, width + origin.col - 2);
  }

  let holeIdx = isHorizontal
    ? Math.floor(Math.random() * (width - 1)) + origin.col
    : Math.floor(Math.random() * (height - 1)) + origin.row;

  while (holeIdx % 2 === 1) {
    holeIdx = isHorizontal
      ? Math.floor(Math.random() * (width - 1)) + origin.col
      : Math.floor(Math.random() * (height - 1)) + origin.row;
  }
  wallInfo.isHorizontal = isHorizontal;
  wallInfo.holeIdx = holeIdx;

  let mazeDelay;
  if (isHorizontal) {
    if (wallIdx >= constants.maxRow) {
      return;
    }
    timer = buildHorizontalWall(
      origin,
      wallIdx,
      wallInfo,
      width,
      timer,
      withWeight
    );
    let mazeDelayOne = recursiveDivision(
      origin,
      width,
      Math.abs(wallIdx - origin.row),
      wallInfo,
      timer,
      withWeight
    );
    let mazeDelayTwo = recursiveDivision(
      { row: wallIdx + 1, col: origin.col },
      width,
      height + origin.row - wallIdx - 1,
      wallInfo,
      timer,
      withWeight
    );

    mazeDelay = mazeDelayOne > mazeDelayTwo ? mazeDelayOne : mazeDelayTwo;
  } else {
    if (wallIdx >= constants.maxCol) {
      return;
    }
    timer = buildVerticalWall(
      origin,
      wallIdx,
      wallInfo,
      height,
      timer,
      withWeight
    );
    let mazeDelayOne = recursiveDivision(
      origin,
      Math.abs(wallIdx - origin.col),
      height,
      wallInfo,
      timer,
      withWeight
    );
    let mazeDelayTwo = recursiveDivision(
      { row: origin.row, col: wallIdx + 1 },
      width + origin.col - wallIdx - 1,
      height,
      wallInfo,
      timer,
      withWeight
    );

    mazeDelay = mazeDelayOne > mazeDelayTwo ? mazeDelayOne : mazeDelayTwo;
  }

  return mazeDelay;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildHorizontalWall(
  origin,
  wallIdx,
  wallInfo,
  width,
  timer,
  withWeight
) {
  for (let col = origin.col; col < width + origin.col; col++) {
    if (
      !['start-node', 'end-node'].includes(
        document.getElementById(`node-${wallIdx}-${col}`).className
      ) &&
      col !== wallInfo.holeIdx
    ) {
      setTimeout(() => {
        if (
          withWeight &&
          Math.floor(Math.random() * 100) > 90 &&
          col % 2 === 0
        ) {
          document.getElementById(`node-${wallIdx}-${col}`).className =
            'weight-node';
        } else {
          document.getElementById(`node-${wallIdx}-${col}`).className =
            'wall-node';
        }
      }, 70 * timer);
      timer++;
    }
  }

  return timer;
}

function buildVerticalWall(
  origin,
  wallIdx,
  wallInfo,
  height,
  timer,
  withWeight
) {
  for (let row = origin.row; row < height + origin.row; row++) {
    if (
      !['start-node', 'end-node'].includes(
        document.getElementById(`node-${row}-${wallIdx}`).className
      ) &&
      row !== wallInfo.holeIdx
    ) {
      setTimeout(() => {
        if (
          withWeight &&
          Math.floor(Math.random() * 100) > 90 &&
          row % 2 === 0
        ) {
          document.getElementById(`node-${row}-${wallIdx}`).className =
            'weight-node';
        } else {
          document.getElementById(`node-${row}-${wallIdx}`).className =
            'wall-node';
        }
      }, 70 * timer);
      timer++;
    }
  }

  return timer;
}
