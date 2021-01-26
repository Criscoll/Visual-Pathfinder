import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as enumerations from '../constants/enumerations';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Ubuntu',
    fontSize: '2.8vh',
    backgroundColor: '#8F3131',
    boxShadow: '0 0 0.4rem black',
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
      disabled={
        props.algorithmRunning ||
        props.algorithm === enumerations.algorithms.none
      }
    >
      Run Algorithm
    </Button>
  );
}
