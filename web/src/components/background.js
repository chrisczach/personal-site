import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from 'gatsby-background-image';

const useStyles = makeStyles(theme => ({
  top: {
    position: 'absolute',
    top: 0,
    height: '75vh',
    width: '100%',
    background: `linear-gradient(to top left, transparent 50%, ${theme.palette.secondary.light}55), linear-gradient(to top right, transparent 50%, ${theme.palette.primary.light}55)`,
    zIndex: -50,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    height: '75vh',
    width: '100%',
    background: `linear-gradient(to bottom right, transparent 50%, ${theme.palette.secondary.dark}55), linear-gradient(to bottom left, transparent 50%, ${theme.palette.secondary.main}55)`,
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
