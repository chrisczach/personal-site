import React from 'react';
import { Box, ClickAwayListener, Grow, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '100%',
    transform: 'translateY(calc(100% - 2px)) !important',
    background: `${theme.palette.secondary.main}cc`,
    backdropFilter: 'blur(8px)',
    webkitBackdropFilter: 'blur(8px)',
    position: 'absolute',
    bottom: 0,
  },
}));
const SlideDrawer = ({ show, handleToggle, children, ...props }) => {
  const classes = useStyles(props);
  return (
    <Collapse in={show} mountOnEnter unmountOnExit>
      <ClickAwayListener onClickAway={handleToggle}>
        <Box className={classes.drawer}>{children}</Box>
      </ClickAwayListener>
    </Collapse>
  );
};

export default SlideDrawer;
