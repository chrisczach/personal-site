import React from 'react';
import { Typography } from '@material-ui/core';
import classes from './blocks-to-MUI.module.css';

const BlocksToMUI = props => {
  const style = props.node.style || 'normal';
  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '');
    return <Typography variant={`h${level}`} className={classes.blockHeading}>{props.children}</Typography>;
  }

  return style === 'blockquote' ? (
    <Typography variant="caption" className={classes.caption}>{props.children}</Typography>
  ) : (
    <Typography variant="body1" className={classes.blockBody}>
      {props.children}
    </Typography>
  );
};

export default BlocksToMUI;
