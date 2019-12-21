import React, { useRef, useEffect } from 'react';
import {
  Box,
  ClickAwayListener,
  Grow,
  Collapse,
  Popover,
  makeStyles,
  fade,
} from '@material-ui/core';
// import hexToRgba from 'hex-to-rgba'

const useStyles = makeStyles(theme => ({
  anchor: {
    width: '100%',
    position: 'absolute',
    height: 0,
    bottom: '4px',
  },
  pop: {
    width: '100%',
  },
  drawer: {
    width: '100%',
    background: `linear-graident(to bottom right, ${fade(
      theme.palette.secondary.main,
      0.2,
    )}, ${fade(theme.palette.secondary.dark, 0.5)})`,
    backdropFilter: 'blur(8px)',
    webkitBackdropFilter: 'blur(8px)',
    margin: theme.spacing(0),
    overflow: 'hidden',
  },
}));
const SlideDrawer = ({ show, handleToggle, children, ...props }) => {
  const classes = useStyles(props);
  const anchor = useRef(null);

  useEffect(() => {
    if (!show) return;

    window.addEventListener('scroll', handleToggle);
    return () => {
      window.removeEventListener('scroll', handleToggle);
    };
  }, [show]);

  return (
    <>
      <Box ref={anchor} className={classes.anchor} />
      <Popover
        disableScrollLock
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
          <Box className={classes.drawer} onClick={handleToggle}>
            {children}
          </Box>
          {/* </ClickAwayListener> */}
        </Collapse>
      </Popover>
    </>
  );
};

export default SlideDrawer;
