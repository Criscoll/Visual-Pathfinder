import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Ubuntu',
    fontSize: '2.8vh',
    color: 'white',
  },
}));

export default function ClearGridButton(props) {
  const classes = useStyles();
  return (
    <Button
      classes={{ root: classes.root }}
      onClick={props.handleResetClick}
      disabled={props.algorithmRunning}
    >
      Clear Grid{' '}
    </Button>
  );
}
