import React, { useRef } from 'react';
import {
  Box,
  ClickAwayListener,
  Grow,
  Collapse,
  Popover,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  anchor: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  pop: {
    width: '100%',
  },
  drawer: {
    width: '100%',
    background: `${theme.palette.secondary.main}cc`,
    backdropFilter: 'blur(8px)',
    webkitBackdropFilter: 'blur(8px)',
    margin: theme.spacing(0),
  },
}));
const SlideDrawer = ({ show, handleToggle, children, ...props }) => {
  const classes = useStyles(props);
  const anchor = useRef(null);
  return (
    <>
      <Box ref={anchor} className={classes.anchor} />
      <Popover
        PaperProps={{
          className: classes.pop,
          style: {
            width:
              (anchor && anchor.current && anchor.current.clientWidth) ||
              '100%',
          },
        }}
        open={show}
        anchorEl={anchor.current}
        onClose={handleToggle}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Collapse in={show} mountOnEnter unmountOnExit>
          {/* <ClickAwayListener onClickAway={handleToggle}> */}
          <Box className={classes.drawer}>{children}</Box>
          {/* </ClickAwayListener> */}
        </Collapse>
      </Popover>
    </>
  );
};

export default SlideDrawer;
