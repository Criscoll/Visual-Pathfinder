import React, { useState, useEffect } from 'react';

export default function Stats(props) {
  const [currStats, setCurrStats] = useState(null);
  const [prevStats, setPrevStats] = useState(null);
  const [tempStats, setTempStats] = useState(0);

  const currStatsStable = currStats;

  useEffect(() => {
    if (props.pathLength && props.nodesChecked && props.timeElapsed) {
      setCurrStats({
        algorithmUsed: props.algorithmUsed,
        pathLength: props.pathLength,
        nodesChecked: props.nodesChecked,
        timeElapsed: props.timeElapsed,
      });
    } else {
      if (currStatsStable && !props.clearStats) {
        let algorithmUsed = currStatsStable.algorithmUsed;
        let pathLength = currStatsStable.pathLength;
        let nodesChecked = currStatsStable.nodesChecked;
        let timeElapsed = currStatsStable.timeElapsed;

        setTempStats({
          algorithmUsed: algorithmUsed,
          pathLength: pathLength,
          nodesChecked: nodesChecked,
          timeElapsed: timeElapsed,
        });

        setCurrStats(null);
      }
    }
    if (props.clearStats) {
      setCurrStats(null);
      setPrevStats(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    setPrevStats(tempStats);
  }, [tempStats]);

  return (
    <React.Fragment>
      <div className="stats-container">
        {currStats ? (
          <React.Fragment>
            <p className="label">Current Run: </p>
            <p>Algorithm used: {currStats.algorithmUsed}</p>
            <p>Path Length: {currStats.pathLength}</p>
            <p>Nodes Visited: {currStats.nodesChecked - 1}</p>
            <p>Time Elapsed: {currStats.timeElapsed / 1000}s</p>
          </React.Fragment>
        ) : null}
      </div>

      <div className="prev-stats-container">
        {prevStats ? (
          <React.Fragment>
            <p className="label">Previous Run: </p>
            <p>Algorithm used: {prevStats.algorithmUsed}</p>
            <p>Path Length: {prevStats.pathLength}</p>
            <p>Nodes Visited: {prevStats.nodesChecked - 1}</p>
            <p>Time Elapsed: {prevStats.timeElapsed / 1000}s</p>
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
}
