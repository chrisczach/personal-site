import React, { useContext, useState, useEffect } from 'react';
import {
  Paper,
  Button,
  Box,
  Tooltip,
  Typography,
  Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMoreRounded } from '@material-ui/icons';
import Div100vh from 'react-div-100vh';
import { Link } from 'gatsby';

import {
  PortraitContext,
  ShowSplashContext,
  CurrentTooltipContext,
} from './layout';

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      background: 'transparent',
      alignItems: 'center',
      backdropFilter: 'brightness(.8) saturate(2.5) blur(2px)',
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
  const [tooltipValue, setTooltipValue] = useContext(CurrentTooltipContext);
  const classes = useStyles(portrait)(props);
  const [animating, setAnimating] = useState(true);
  const [current, setCurrent] = useState();
  const [items, setItems] = useState(animationScreens);
  const stopAnimation = () => {
    setAnimating(false);
    const end = screenFrom({
      name: 'stopped',
      header: 'stopped',
      content: 'animation stopped',
    });
    setCurrent(end);
    setTooltipValue(end.name);
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
        setTooltipValue(next.name);
        return rest;
      });
    } else {
      scrollDown();
    }
  };

  useEffect(() => {
    if (showSpash) return;
    if (!current) nextItem();
    const loop = setInterval(nextItem, 3500);
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
    <Paper
      component={({ inputMode, ...props }) => <Div100vh {...props} />}
      className={classes.wrapper}
    >
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

const screenFrom = ({
  name,
  header,
  content,
  link = null,
  linkText = null,
}) => {
  return {
    name,
    text: (
      <Box>
        <Typography variant="h3">{header}</Typography>
        <Typography variant="body1" style={{ whiteSpace: 'nowrap' }}>
          {content}
        </Typography>
        {link &&
          (link.substring(0, 1) === '/' ? (
            <Link to={link}>{linkText}</Link>
          ) : (
            <a href={link} target="_blank">
              {linkText}
            </a>
          ))}
      </Box>
    ),
  };
};

const animationScreens = [
  screenFrom({
    name: `don't display`,
    header: 'hello',
    content: `I'm Chris Czach a front end developer`,
  }),
  screenFrom({
    name: `About`,
    header: 'About',
    content: `find out more about me`,
    link: '/about/',
    linkText: 'see about me',
  }),
  screenFrom({
    name: `Projects`,
    header: 'Projects',
    content: `see some projects that I've done.`,
    link: '/projects/',
    linkText: 'go to projects',
  }),
  screenFrom({
    name: `GitHub`,
    header: 'GitHub',
    content: `see my code`,
    link: 'https://github.com/chrisczach',
    linkText: 'open github',
  }),
  screenFrom({
    name: `Contact`,
    header: 'Contact',
    content: `come say hello`,
    link: '/contact/',
    linkText: 'go to contact form',
  }),
];

export default Hero;
