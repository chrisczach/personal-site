import React, { useContext, useState, useEffect } from 'react';
import { Paper, Button, Box, Tooltip, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMoreRounded } from '@material-ui/icons';
import Div100vh from 'react-div-100vh';

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
      background: 'transparent',
      alignItems: 'center',
      backdropFilter: 'brightness(.8) saturate(2.5) blur(2px)',
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
    },
    heading: {
      display: 'inline-block',
      color: theme.palette.warning.main,
    },
    content: {
      margin: theme.spacing(4),
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
  const showSpash = useContext(ShowSplashContext);
  const [tooltipValue, setTooltipValue] = useContext(CurrentTooltipContext);
  const classes = useStyles(portrait)(props);
  const [animating, setAnimating] = useState(true);
  const [current, setCurrent] = useState();
  const [items, setItems] = useState(animationScreens);
  const stopAnimation = () => {
    if (animating && items.length > 1) {
      setAnimating(false);
      const end = [...items].pop();
      setCurrent(end);
      setTooltipValue(end.name);
    }
  };
  const scrollDown = () => {
    stopAnimation();
    window.scrollTo({ left: 0, top: window.innerHeight, behavior: 'smooth' });
  };
  const nextItem = () => {
    if (items.length > 1) {
      setItems(state => {
        const [next, ...rest] = state;
        setCurrent(next);
        setTooltipValue(next.name);
        return rest;
      });
    } else {
      scrollDown();
    }
  };

  useEffect(() => {
    if (!current) nextItem();
    const loop = setInterval(nextItem, 4000);
    window.addEventListener('scroll', stopAnimation);
    if (showSpash || !animating) {
      return () => {
        clearInterval(loop);
        window.removeEventListener('scroll', stopAnimation);
      };
    }

    return () => {
      clearInterval(loop);
      window.removeEventListener('scroll', stopAnimation);
    };
  }, [nextItem, showSpash, stopAnimation]);
  return (
    <Paper
      component={({ inputMode, ...props }) => <Div100vh {...props} />}
      className={classes.wrapper}
    >
      <Box className={classes.inner} onClick={nextItem}>
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
    content: `I'm Chris Czach a front end developer`,
  },
  {
    name: `About`,
    header: 'About',
    content: `find out more about me`,
    link: '/about/',
    linkText: 'see about me',
  },
  {
    name: `Projects`,
    header: 'Projects',
    content: `see some projects that I've done.`,
    link: '/projects/',
    linkText: 'go to projects',
  },
  {
    name: `GitHub`,
    header: 'GitHub',
    content: `see my code`,
    link: 'https://github.com/chrisczach',
    linkText: 'open github',
  },
  {
    name: `Contact`,
    header: 'Contact',
    content: `come say hello`,
    link: '/contact/',
    linkText: 'go to contact form',
  },
  {
    name: `don't display`,
    header: 'last',
    content: `item`,
  },
];

export default Hero;
