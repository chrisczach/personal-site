import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Paper,
  Button,
  Box,
  Tooltip,
  Fade,
  makeStyles,
  fade,
  darken,
} from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';
import Div100vh from 'react-div-100vh';
// import hexToRgba from 'hex-to-rgba';

import {
  PortraitContext,
  ShowSplashContext,
  CurrentTooltipContext,
} from './layout';
import { ScreenFrom } from './ScreenFrom';

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: `${darken(fade(theme.palette.primary.dark, 0.5), 0.25)}`,
      alignItems: 'center',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      boxShadow: theme.shadows[8],
      positon: 'relative',
      padding: theme.spacing(2),
    },
    inner: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollButton: {
      flexGrow: 0,
      margin: theme.spacing(2, 2, 6, 2),
      padding: theme.spacing(1, 4),
      fontSize: '1.25em',
      opacity: 0.25,
    },
    heading: {
      display: 'inline-block',
      color: theme.palette.warning.main,
    },
    content: {
      margin: theme.spacing(6, 2),
      fontSize: '2em',
    },
    linkWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    contentLink: {
      justifySelf: 'flex-end',
    },
    contentButton: {},
  }));
const Hero = props => {
  const portrait = useContext(PortraitContext);
  const showSplash = useContext(ShowSplashContext);
  const [tooltipValue, setTooltipValue] = useContext(CurrentTooltipContext);
  const classes = useStyles(portrait)(props);
  const [animating, setAnimating] = useState(null);
  const [current, setCurrent] = useState();
  const [items, setItems] = useState(animationScreens);
  const defaultDelay = 5000;
  const [delay, setDelay] = useState(defaultDelay);
  const stopAnimation = () => {
    if (animating) {
      setAnimating(false);
      const end = {
        name: `don't display`,
        header: 'Chris Czach',
        content: `full stack developer`,
      };

      setCurrent(end);
      setTooltipValue(end.name);
    }
  };
  const scrollDown = () => {
    stopAnimation();
    window.scrollTo({
      left: 0,
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  const nextItem = () => {
    if (items.length) {
      setItems(state => {
        const [next, ...rest] = state;
        setCurrent(next);
        setDelay(next.delay || defaultDelay);
        setTooltipValue(next.name);
        return rest;
      });
    } else {
      stopAnimation();
      scrollDown();
    }
  };
  useInterval(nextItem, animating ? delay : null);

  const handleScroll = ({ currentTarget: { scrollY } }) => {
    if (scrollY > 100) stopAnimation();
  };
  useEffect(() => {
    if (!showSplash && animating === null) setAnimating(true);
    if (!current) nextItem();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextItem, showSplash, handleScroll, animating, setAnimating]);
  return (
    <Paper
      component={({ inputMode, ...props }) => <Div100vh {...props} />}
      className={classes.wrapper}
    >
      <Box
        className={classes.inner}
        // onClick={ nextItem }
      >
        {current && ScreenFrom(classes)(current)}
      </Box>
      <Button
        onClick={scrollDown}
        className={classes.scrollButton}
        endIcon={<ExpandMoreRounded />}
      >
        Scroll
      </Button>
    </Paper>
  );
};

const animationScreens = [
  {
    name: `don't display`,
    header: 'hello',
    content: `I'm Chris Czach a software engineer`,
    delay: 3000,
  },
  {
    name: `About`,
    header: 'about',
    content: `find out more about me`,
    link: '/about/',
    linkText: 'see about me',
  },
  {
    name: `Projects`,
    header: 'projects',
    content: `see some projects that I've done`,
    link: '/projects/',
    linkText: 'go to projects',
    delay: 7000,
  },
  {
    name: `GitHub`,
    header: 'github',
    content: `see my code`,
    link: 'https://github.com/chrisczach',
    linkText: 'open github',
    delay: 7000,
  },
  {
    name: `Contact`,
    header: 'contact',
    content: `come say hello`,
    link: '/contact/',
    linkText: 'go to contact form',
  },
];

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Hero;
