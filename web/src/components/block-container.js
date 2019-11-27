import React from 'react';
import classes from './block-container.module.css'

const BlockContainer = ({ children }) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default BlockContainer;
