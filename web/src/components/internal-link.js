import React from 'react';
import { Link } from 'gatsby';
import { Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  popper: {
    margin: theme.spacing(1),
    background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}11, ${theme.palette.primary.dark}33) 50%`,
    backdropFilter: 'blur(8px) brightness(.8)',
    webkitBackdropFilter: 'blur(8px) brightness(.8)',
    boxShadow: theme.shadows[6],
  },
  tooltip: {
    background: 'transparent',
    margin: theme.spacing(2),
    padding: 0,

    overflow: 'hidden',
  },
  text: {
    opacity: 0.75,
    padding: 0,
    margin: '0 auto',
  },
  link: {
    textDecoration: 'underline',
  },
}));

const InternalLink = ({ mark, children, ...props }) => {
  const {
    reference: {
      slug: { current: slug },
      title,
    },
  } = mark;
  const classes = useStyles(props);
  return (
    <Tooltip
      placement="bottom-start"
      classes={classes}
      title={
        <Typography variant="body2" className={classes.text}>
          {title}
        </Typography>
      }
    >
      <Link to={`/${slug}/`} className={classes.link}>
        {children}
      </Link>
    </Tooltip>
  );
};

export default InternalLink;
