import React, { useState, useEffect } from 'react';

export default function Stats(props) {
  const [currStats, setCurrStats] = useState(null);
  const [prevStats, setPrevStats] = useState(null);
  const [tempStats, setTempStats] = useState(0);

  useEffect(() => {
    if (props.pathLength && props.nodesChecked) {
      setCurrStats({
        algorithmUsed: props.algorithmUsed,
        pathLength: props.pathLength,
        nodesChecked: props.nodesChecked,
      });
    } else {
      if (currStats && !props.clearStats) {
        let algorithmUsed = currStats.algorithmUsed;
        let pathLength = currStats.pathLength;
        let nodesChecked = currStats.nodesChecked;

        setTempStats({
          algorithmUsed: algorithmUsed,
          pathLength: pathLength,
          nodesChecked: nodesChecked,
        });

        setCurrStats(null);
      }
    }
    if (props.clearStats) {
      setCurrStats(null);
      setPrevStats(null);
    }
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
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
}
