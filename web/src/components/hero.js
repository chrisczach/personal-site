import React, { useContext, useState, useEffect } from 'react';
import { Paper, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMoreRounded } from '@material-ui/icons';

import { PortraitContext, ShowSplashContext } from './layout';

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      background: 'transparent',
      alignItems: 'center',
      backdropFilter: 'brightness(.85) blur(8px)',
      boxShadow: theme.shadows[8],
      positon: 'relative',
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
  }));
const Hero = props => {
  const portrait = useContext(PortraitContext);
  const showSpash = useContext(ShowSplashContext);
  const classes = useStyles(portrait)(props);
  const [animating, setAnimating] = useState(true);
  const [current, setCurrent] = useState();
  const [items, setItems] = useState(animationScreens);
  const stopAnimation = () => {
    setAnimating(false);
    setCurrent(item('stopped', 'animation stopped'));
  };
  const scrollDown = () => {
    stopAnimation();
    window.scrollTo({ left: 0, top: window.innerHeight, behavior: 'smooth' });
  };
  const nextItem = () => {
    if (items.length) {
      setItems(state => {
        const [next, ...rest] = state;
        setCurrent(next);
        return rest;
      });
    } else {
      scrollDown();
    }
  };

  useEffect(() => {
    if (showSpash) return;
    if (!current) nextItem();
    const loop = setInterval(nextItem, 3000);
    if (!animating) {
      return clearInterval(loop);
    }
    window.addEventListener('scroll', stopAnimation);
    return () => {
      clearInterval(loop);
      window.removeEventListener('scroll', stopAnimation);
    };
  }, [nextItem, showSpash, stopAnimation]);

  return (
    <Paper className={classes.wrapper}>
      <Box className={classes.inner} onClick={nextItem}>
        {current && current.text}
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
const item = (name, text) => ({ name, text });

const animationScreens = [
  item('home', `Hello I'm Chris`),
  item('about', 'Find out about me'),
  item('projects', `See what I've done`),
  item('github', 'See some code'),
  item('contact', 'say hello'),
];

export default Hero;
