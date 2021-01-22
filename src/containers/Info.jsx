import React, { useState, useEffect } from 'react';
import * as enumerations from '../constants/algorithmEnum';

export default function Info(props) {
  const [renderedText, setRenderedText] = useState('No Algorithm Selected');

  useEffect(() => {
    if (props.selectedAlgorithm === enumerations.algorithms.none) {
      setRenderedText(<p>No Algorithm Selected</p>);
    } else if (props.selectedAlgorithm === enumerations.algorithms.dijkstras) {
      setRenderedText(
        <p>
          Dijkstras algorithm is a <span className="bold">weighted</span>{' '}
          search.
          <br />
          Weight nodes are <span className="bold">enabled</span>
        </p>
      );
    } else if (props.selectedAlgorithm === enumerations.algorithms.DFS) {
      setRenderedText(
        <p>
          DFS is an <span className="bold">unweighted</span> search.
          <br />
          Weight nodes are <span className="bold">disabled</span>
        </p>
      );
    } else if (props.selectedAlgorithm === enumerations.algorithms.AStar) {
      setRenderedText(
        <p>
          A* is a <span className="bold">weighted</span> search.
          <br />
          Weight nodes are <span className="bold">enabled</span>
        </p>
      );
    }
  }, [props]);

  return (
    <React.Fragment>
      <div id="info-container">{renderedText}</div>
    </React.Fragment>
  );
}