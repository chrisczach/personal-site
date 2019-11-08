import React, { useContext } from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
import { Avatar, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import clientConfig from '../../client-config';
import { PortraitContext } from './layout';

// import styles from './figure.module.css';

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      padding: 0,
      margin: theme.spacing(0, 0, portrait ? 2 : 4, 0),
      display: 'flex',
      justifyContent: portrait ? 'center' : 'flex-start',
      alignItems: portrait ? 'center' : 'flex-start',
      flexDirection: portrait ? 'column' : 'row',
    },
    imageWrapper: {
      width: portrait ? '35vw' : '15vh',
      height: portrait ? '35vw' : '15vh',
      borderRadius: theme.spacing(4),
      overflow: 'hidden',
      background: theme.palette.primary.dark,
      transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.shortest,
      }),
      boxShadow: theme.shadows[4],
      '&>div': {
        transition: theme.transitions.create('all', {
          duration: theme.transitions.duration.longest,
        }),
      },
      '&:hover>div': {
        transform: 'scale(1.15) rotate(-4deg)',
      },
    },

    heading: {
      opacity: 0.9,
      margin: theme.spacing(2, portrait ? 0 : 2),
      color: theme.palette.warning.main,
      // fontWeight: '100',
    },
  }));

export default ({ node }) => {
  if (!node.asset) {
    return null;
  }
  const portrait = useContext(PortraitContext);
  const classes = useStyles(portrait)();
  const imageRef = node.asset._ref || node.asset._id;
  const fluidProps = getFluidGatsbyImage(
    imageRef,
    { maxWidth: 1200 },
    clientConfig.sanity,
  );

  return (
    <figure className={classes.wrapper}>
      <div className={classes.imageWrapper}>
        <Img fluid={fluidProps} alt={node.alt} style={{ height: '100%' }} />
      </div>

      {node.caption && (
        <Typography variant="h2" className={classes.heading}>
          <figcaption>{node.caption}</figcaption>
        </Typography>
      )}
    </figure>
  );
};
