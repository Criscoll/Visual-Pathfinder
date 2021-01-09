import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Share Tech',
    fontSize: 25,
  },
}));

export default function ClearGridButton() {
  const classes = useStyles();
  return <Button classes={{ root: classes.root }}>Clear Grid </Button>;
  
}