import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: ['Share Tech', 'Sans Serif'],
    fontSize: 25,
    backgroundColor: 'rgb(212, 23, 58)',
    borderColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgb(189, 15, 47)',
    },
  },
}));

export default function ClearGridButton(props) {
  const classes = useStyles();
  return (
    <Button
      classes={{ root: classes.root }}
      onClick={props.handleGoClick}
      disabled={props.algorithmRunning}
    >
      Run Algorithm
    </Button>
  );
}
