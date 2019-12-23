import React from 'react';
import { Typography, makeStyles, fade, darken } from '@material-ui/core';
// import hexToRgba from 'hex-to-rgba'

import classes from './blocks-to-MUI.module.css';

const useStyles = makeStyles(theme => ({
  caption: {
    opacity: 0.8,
    // display: 'flex',
    margin: theme.spacing(4, 1),
    padding: theme.spacing(1, 5),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    justifyContent: 'center',
    background: `linear-gradient(to bottom right, ${darken(
      fade(theme.palette.secondary.main, 0.9),
      0.25,
    )}, ${darken(fade(theme.palette.secondary.dark, 0.8), 0.25)}) !important`,
  },
}));
const BlocksToMUI = props => {
  const styledClasses = useStyles(props);
  const style = props.node.style || 'normal';
  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '');
    return (
      <Typography
        variant={`h${parseInt(level)}`}
        className={classes.blockHeading}
      >
        {props.children}
      </Typography>
    );
  }

  return style === 'blockquote' ? (
    <Typography
      variant="body1"
      className={`${styledClasses.caption} ${classes.caption}`}
    >
      {props.children}
    </Typography>
  ) : (
    <Typography variant="body1" className={classes.blockBody}>
      {props.children}
    </Typography>
  );
};

export default BlocksToMUI;
