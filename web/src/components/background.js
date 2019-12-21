import React, { useState } from 'react';
// import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, fade } from '@material-ui/core';
// import BackgroundImage from 'gatsby-background-image';
// import hexToRgba from 'hex-to-rgba'

const useStyles = makeStyles(theme => ({
  top: {
    position: 'absolute',
    top: 0,
    height: '90vh',
    width: '100%',
    background: `linear-gradient(to top left, transparent 50%, ${fade(
      theme.palette.primary.dark,
      0.25,
    )}), linear-gradient(to top right, transparent 50%, ${fade(
      theme.palette.primary.dark,
      0.2,
    )})`,
    zIndex: -50,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    height: '90vh',
    width: '100%',
    background: `linear-gradient(to bottom right, transparent 50%, ${fade(
      theme.palette.secondary.dark,
      0.1,
    )}), linear-gradient(to bottom left, transparent 50%, ${fade(
      theme.palette.primary.dark,
      0.3,
    )})`,
    zIndex: -50,
  },
}));

const Background = props => {
  const classes = useStyles(props);

  return (
    <>
      <div className={classes.top} />
      <div className={classes.bottom} />
    </>
  );
};

export default Background;
