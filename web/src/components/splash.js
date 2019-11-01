import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Slide, Box, Fade, Portal } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    zIndex: 1000000,
    position: 'fixed',
    top: 0,
    background: `linear-gradient(to top left, ${theme.palette.primary.dark}, ${theme.palette.secondary.light}), linear-gradient(to top right, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark})`,
    color: 'white',
    height: '100vh',
    width: '100vw',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSvg: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
  },
  topSvg: {
    width: '100vw',
    position: 'fixed',
    top: 0,
    transform: 'rotate(180deg)',
  },
  path: {
    fill: `${theme.palette.secondary.dark}77`,
  },
}));
const Splash = ({ show, hideSplash }) => {
  const classes = useStyles({});
  return (
    <Portal>
      <Slide
        in={show}
        direction="down"
        unmountOnExit
        enter={false}
        appear={false}
      >
        <Fade in enter={false} appear={false}>
          <Box onClick={hideSplash} className={classes.wrapper}>
            <Typography variant="h1">Hello</Typography>
            <svg
              className={classes.topSvg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                className={classes.path}
                fillOpacity="1"
                d="M0,0L80,42.7C160,85,320,171,480,192C640,213,800,171,960,176C1120,181,1280,235,1360,261.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              />
            </svg>
            <svg
              className={classes.bottomSvg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                className={classes.path}
                fillOpacity="1"
                d="M0,0L80,42.7C160,85,320,171,480,192C640,213,800,171,960,176C1120,181,1280,235,1360,261.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              />
            </svg>
          </Box>
        </Fade>
      </Slide>
    </Portal>
  );
};

export default Splash;
