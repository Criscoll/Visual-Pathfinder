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

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [algorithm, setAlgorithm] = useState('Algorithms');

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
          {algorithm}
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
                        setAlgorithm('Dijkstras');
                        props.setAlgorithm(
                          enumerations.algorithms.dijkstras,
                          'Dijkstras'
                        );
                      }}
                    >
                      Dijkstras
                    </MenuItem>

                    <MenuItem
                      classes={{ root: classes.dropDownText }}
                      onClick={(e) => {
                        handleClose(e);
                        setAlgorithm('A*');
                        props.setAlgorithm(enumerations.algorithms.AStar, 'A*');
                      }}
                    >
                      A*
                    </MenuItem>
                    <MenuItem
                      classes={{ root: classes.dropDownText }}
                      onClick={(e) => {
                        handleClose(e);
                        setAlgorithm('BFS');
                        props.setAlgorithm(enumerations.algorithms.BFS, 'BFS');
                      }}
                    >
                      BFS
                    </MenuItem>
                    <MenuItem
                      classes={{ root: classes.dropDownText }}
                      onClick={(e) => {
                        handleClose(e);
                        setAlgorithm('DFS');
                        props.setAlgorithm(enumerations.algorithms.DFS, 'DFS');
                      }}
                    >
                      DFS
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
