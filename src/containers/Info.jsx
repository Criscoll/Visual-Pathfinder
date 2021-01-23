import React, { useState, useEffect } from 'react';
import * as enumerations from '../constants/enumerations';

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
          DFS (Depth First Search) is an{' '}
          <span className="bold">unweighted</span> search.
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
    } else if (props.selectedAlgorithm === enumerations.algorithms.BFS) {
      setRenderedText(
        <p>
          BFS (Breadth First Search) is an{' '}
          <span className="bold">unweighted</span> search.
          <br />
          Weight nodes are <span className="bold">disabled</span>
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
