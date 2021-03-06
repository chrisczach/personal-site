import React, { useContext, useState, useEffect } from 'react';
import hexToRgba from 'hex-to-rgba';
import { Link as GatsbyLink } from 'gatsby';
import {
  Container,
  Typography,
  Zoom,
  Fade,
  Slide,
  Box,
  Link,
  Paper,
  fade,
  lighten,
  darken,
} from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import { PortraitContext } from './layout';
import BlockContent from './block-content';

const useStyles = ({ portrait, wrapHeading }) =>
  makeStyles(theme => ({
    container: {
      padding: portrait
        ? theme.spacing(4, 2, 7, 2)
        : theme.spacing(wrapHeading && !portrait ? 20 : 9, 2, 7, 2),
      minHeight: '100vh',
    },
    heading: {
      padding: theme.spacing(2, 2, 0, 2),
      color: theme.palette.warning.main,
      opacity: 0.9,
    },
    wrappedHeading: {
      color: theme.palette.warning.main,
      margin:
        wrapHeading && !portrait
          ? theme.spacing(-12, 0, 0, 0)
          : theme.spacing(0, 2),
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
      // overflow: 'hidden',
    },
    darkPaper: {
      // overflow: 'hidden',
      display: 'flex',
      flexDirection: portrait ? 'column' : 'row',
      justifyContent: 'stretch',
      alignItems: 'stretch',

      background: portrait
        ? `linear-gradient(to bottom right, ${lighten(
            fade(theme.palette.primary.dark, 0.7),
            0.15,
          )}, ${hexToRgba('#2224')}) !important`
        : `linear-gradient(to bottom right, ${lighten(
            fade(theme.palette.primary.dark, 0.85),
            0.15,
          )}, ${hexToRgba('#2223')}) !important`,
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      // transition: theme.transitions.create('all', {
      //   duration: theme.transitions.duration.shortest,
      // }),
      '@media (hover:hover)': {
        '&:hover': {
          backdropFilter: 'blur(10px) brightness(.9)',
          webkitBackdropFilter: 'blur(10px)  brightness(.9)',
        },
      },
    },
    bodyBox: {
      padding: theme.spacing(2, portrait ? 2 : 4),
      width: '100%',
    },
    ogBodyBox: {
      padding: theme.spacing(0, portrait ? 2 : 4),
      width: portrait ? '100%' : '60%',
    },
    techBox: {
      width: portrait ? '100%' : '80%',
      background: `linear-gradient(to bottom right, ${fade(
        theme.palette.primary.dark,
        0.8,
      )}, ${darken(fade(theme.palette.primary.dark, 0.9), 0.25)})`,
    },
    skills: {
      padding: theme.spacing(1, 0, 0, 2),
      color: `${fade(theme.palette.secondary.main, 0.6)}`,
    },
    backLink: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: theme.spacing(-1, 0, 1, 1),
      color: fade(theme.palette.text.primary, 0.6),
      '@media (hover:hover)': {
        '&:hover': {
          color: fade(theme.palette.text.primary, 0.75),
        },
      },
    },
  }));

export const ContainerWithHeading = ({
  heading,
  subHeading,
  TechHeading = false,
  darkBody = false,
  avatar = null,
  projectPage = false,
  direction = 'down',
  children = null,
  wrapHeading = false,
  ...props
}) => {
  const portrait = useContext(PortraitContext);
  const classes = useStyles({ portrait, wrapHeading })(props);
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
      {(!wrapHeading || portrait) && (
        <>
          {projectPage && (
            <Link component={GatsbyLink} to="projects" underline="none">
              <Fade in timeout={1500}>
                <Typography variant="body1" className={classes.backLink}>
                  <ArrowBackRounded fontSize="inherit" /> back to projects
                </Typography>
              </Fade>
            </Link>
          )}
          <Fade in timeout={150}>
            <Slide in direction={direction} timeout={300}>
              <Typography
                variant="h2"
                color="textSecondary"
                className={classes.wrappedHeading}
              >
                {heading}
              </Typography>
            </Slide>
          </Fade>
        </>
      )}
      <Fade in timeout={600}>
        <Zoom in timeout={1200}>
          {darkBody ? (
            <Paper className={classes.darkPaper}>
              <Box className={classes.bodyBox}>
                {wrapHeading && !portrait && (
                  <Fade in timeout={150}>
                    <Slide in direction="down" timeout={300}>
                      <Typography
                        variant="h2"
                        color="textSecondary"
                        className={classes.wrappedHeading}
                      >
                        {heading}
                      </Typography>
                    </Slide>
                  </Fade>
                )}
                {typeof subHeading !== 'string' ? (
                  <BlockContent blocks={subHeading} />
                ) : (
                  <Typography variant="body1">{subHeading}</Typography>
                )}
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
              <Box
                className={projectPage ? classes.ogBodyBox : classes.bodyBox}
              >
                {wrapHeading && !portrait && (
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
                )}
                {typeof subHeading !== 'string' ? (
                  <BlockContent blocks={subHeading} />
                ) : (
                  <Typography variant="body1">{subHeading}</Typography>
                )}
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
