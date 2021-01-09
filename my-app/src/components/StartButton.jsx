import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: ['Share Tech', 'Sans Serif'],
    fontSize: 25,
    backgroundColor: 'rgb(79, 201, 117)',
    // borderColor: 'rgb(79, 201, 117)',
    borderColor: 'red',
  },
}));

export default function ClearGridButton() {
  const classes = useStyles();
  return <Button classes={{ root: classes.root }}>Run Algorithm</Button>;
}
