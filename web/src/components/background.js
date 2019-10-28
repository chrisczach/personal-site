import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from 'gatsby-background-image';

const useStyles = makeStyles(theme => ({
  background: {
    position: 'absolute', 
  bottom: 0, 
  height: '50vh', 
  width: '100%', 
  background: `linear-gradient(to bottom, transparent, #0f0d0abb)`, 
  zIndex: -50
}
}));

const Background = (props) => {
  const classes = useStyles(props);
 
  return <div className={classes.background}/>

};

export default Background;
