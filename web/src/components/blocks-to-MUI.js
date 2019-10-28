import React from 'react';
import { Typography } from '@material-ui/core';

const BlocksToMUI = props => {
  const style = props.node.style || 'normal';
  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '');
    return <Typography variant={`h${level}`}>{props.children}</Typography>;
  }

  return style === 'blockquote' ? (
    <Typography variant="caption">{props.children}</Typography>
  ) : (
    <Typography variant="body1">{props.children}</Typography>
  );
};

export default BlocksToMUI;
