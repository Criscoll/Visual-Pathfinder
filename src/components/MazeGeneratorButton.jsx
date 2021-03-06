import React, { useState } from 'react';
import '../styles/main.css';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as enumerations from '../constants/enumerations';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 1000,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  button: {
    fontFamily: 'Ubuntu',
    fontSize: '2.8vh',
    color: 'white',
  },
  dropDownMenu: {
    alignItems: 'center',
    zIndex: 1000,
    width: '25vh',
    backgroundColor: '#3775A0',
    color: 'white',
  },
  dropDownText: {
    fontFamily: 'Ubuntu',
    fontSize: '2.5vh',
  },
}));

export default function MazeGeneratorButton(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [maze] = useState('Maze Generator');

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          classes={{ root: classes.button }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          disabled={props.algorithmRunning}
        >
          {maze}
          <ArrowDropDownIcon classes={{ root: classes.button }} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    classes={{ root: classes.dropDownMenu }}
                  >
                    <MenuItem
                      classes={{ root: classes.dropDownText }}
                      onClick={(e) => {
                        handleClose(e);
                        props.generateMaze(enumerations.mazes.randomWalls);
                      }}
                    >
                      Random Walls
                    </MenuItem>
                    <MenuItem
                      classes={{ root: classes.dropDownText }}
                      onClick={(e) => {
                        handleClose(e);
                        props.generateMaze(enumerations.mazes.randomWeights);
                      }}
                      disabled={
                        [
                          enumerations.algorithms.BFS,
                          enumerations.algorithms.DFS,
                        ].includes(props.algorithm)
                          ? true
                          : null
                      }
                    >
                      Random Weights
                    </MenuItem>
                    <MenuItem
                      classes={{ root: classes.dropDownText }}
                      onClick={(e) => {
                        handleClose(e);
                        props.generateMaze(enumerations.mazes.randomMixed);
                      }}
                      disabled={
                        [
                          enumerations.algorithms.BFS,
                          enumerations.algorithms.DFS,
                        ].includes(props.algorithm)
                          ? true
                          : null
                      }
                    >
                      Random Mixed
                    </MenuItem>
                    <MenuItem
                      classes={{ root: classes.dropDownText }}
                      onClick={(e) => {
                        handleClose(e);
                        props.generateMaze(enumerations.mazes.maze);
                      }}
                    >
                      Maze
                    </MenuItem>
                    <MenuItem
                      classes={{ root: classes.dropDownText }}
                      onClick={(e) => {
                        handleClose(e);
                        props.generateMaze(enumerations.mazes.mazeWithWeights);
                      }}
                      disabled={
                        [
                          enumerations.algorithms.BFS,
                          enumerations.algorithms.DFS,
                        ].includes(props.algorithm)
                          ? true
                          : null
                      }
                    >
                      Maze with Weights
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
