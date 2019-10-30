import React, { useContext, useState, useEffect } from 'react';

import {
  Container,
  Typography,
  Zoom,
  Fade,
  Slide,
  Box,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PortraitContext } from './layout';
import BlockContent from './block-content';

const useStyles = ({ portrait }) =>
  makeStyles(theme => ({
    container: {
      padding: portrait ? theme.spacing(2, 2, 10, 2) : theme.spacing(10, 2),
      minHeight: '100vh',
    },
    heading: {
      padding: theme.spacing(2, 2, 0, 2),
    },
    subHeading: {
      padding: theme.spacing(2, 2, 2, portrait ? 4 : 6),
      fontSize: '1.5em',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(3, 2),
    },
    regularWrap: {
      padding: theme.spacing(0, portrait ? 2 : 4),
    },
    darkPaper: {
      padding: theme.spacing(2),
      background: portrait
        ? `linear-gradient(to bottom right, ${theme.palette.primary.dark}aa, ${theme.palette.secondary.dark}88) !important`
        : `linear-gradient(to bottom right, ${theme.palette.primary.dark}55, ${theme.palette.secondary.dark}33) !important`,
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      // transition: theme.transitions.create('all', {
      //   duration: theme.transitions.duration.shortest,
      // }),
      '&:hover': {
        backdropFilter: 'blur(10px) brightness(.9)',
        webkitBackdropFilter: 'blur(10px)  brightness(.9)',
      },
    },
  }));

export const ContainerWithHeading = ({
  heading,
  subHeading,
  TechHeading,
  darkBody = false,
  avatar = null,
  children = null,
  ...props
}) => {
  const portrait = useContext(PortraitContext);
  const classes = useStyles({ portrait })(props);
  const [width, setWidth] = useState(1920);
  const updateWidth = () => setWidth(window.innerWidth);
  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.addEventListener('resize', updateWidth);
    };
  }, [updateWidth]);
  return (
    <Container
      maxWidth={width < 1500 ? 'md' : width > 2000 ? 'xl' : 'lg'}
      className={classes.container}
      {...props}
    >
      <Fade in timeout={150}>
        <Slide in direction="down" timeout={300}>
          <Typography
            variant="h2"
            color="textSecondary"
            className={classes.heading}
          >
            {heading}
          </Typography>
        </Slide>
      </Fade>
      <Fade in timeout={600}>
        <Zoom in timeout={1200}>
          {darkBody ? (
            <Paper className={classes.darkPaper}>
              {TechHeading}
              <BlockContent blocks={subHeading} />
            </Paper>
          ) : (
            <Box className={classes.regularWrap}>
              {TechHeading}
              <BlockContent blocks={subHeading} />
            </Box>
          )}
        </Zoom>
      </Fade>

      {children}
    </Container>
  );
};
