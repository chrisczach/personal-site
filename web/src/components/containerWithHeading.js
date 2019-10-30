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
      color: theme.palette.warning.main,
      opacity: '0.9 !important',
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
      display: 'flex',
      flexDirection: portrait ? 'column' : 'row',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      overflow: 'hidden',
    },
    darkPaper: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: portrait ? 'column' : 'row',
      justifyContent: 'stretch',
      alignItems: 'stretch',

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
    bodyBox: {
      padding: theme.spacing(0, portrait ? 2 : 4),
      width: portrait ? '100%' : '60%',
    },
    techBox: {
      width: portrait ? '100%' : '80%',
      background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}99, ${theme.palette.secondary.dark}55)`,
    },
    skills: {
      padding: theme.spacing(1, 0, 0, 2),
      color: `${theme.palette.secondary.light}55`,
    },
  }));

export const ContainerWithHeading = ({
  heading,
  subHeading,
  TechHeading = false,
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
              <Box className={classes.bodyBox}>
                <BlockContent blocks={subHeading} />
              </Box>
              {TechHeading && (
                <Box className={classes.techBox}>
                  <Typography variant="h4" className={classes.skills}>
                    Key Skills
                  </Typography>
                  {TechHeading}
                </Box>
              )}
            </Paper>
          ) : (
            <Box className={classes.regularWrap}>
              <Box className={classes.bodyBox}>
                <BlockContent blocks={subHeading} />
              </Box>

              {TechHeading && (
                <Box className={classes.techBox}>
                  <Typography variant="h4" className={classes.skills}>
                    Key Skills
                  </Typography>
                  {TechHeading}
                </Box>
              )}
            </Box>
          )}
        </Zoom>
      </Fade>

      {children}
    </Container>
  );
};
