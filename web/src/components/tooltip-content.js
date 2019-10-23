import React, { useContext } from 'react';
import { Tooltip, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Img from 'gatsby-image';

import { PortraitContext } from './layout';
import BlockText from './block-text';

const useStyles = portrait =>
  makeStyles(theme => ({
    tooltip: {
      background: theme.palette.primary.main,
      padding: theme.spacing(2, portrait ? 1 : 2),
      minWidth: portrait ? '50vw' : '25vw',
    },
    tooltipPlacementBottom: {
      margin: '0',
    },
    ratingWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    rating: {
      transform: portrait ? 'translateY(25%)' : '',
    },
    experience: {
      opacity: 0.75,
      padding: portrait ? 0 : theme.spacing(0, 2, 0, 2),
    },
    ratingStacking: {
      padding: portrait ? theme.spacing(0, 1, 0, 1) : theme.spacing(0, 1, 0, 2),
      display: 'inline-flex',
      flexDirection: portrait ? 'column' : 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    description: {
      padding: theme.spacing(2, 0),
    },
    footLogo: {
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'flex-end',
      '&:hover': {
        filter: 'saturate(2)',
      },
    },
    footSize: {
      width: '10%',
      opacity: 0.75,
      filter: 'saturate(.5)',
    },
    footText: {
      opacity: 0.5,
      padding: theme.spacing(2, 1),
    },
  }));

const TooltipContent = ({
  title,
  experience,
  description,
  fluid,
  children,
  ...props
}) => {
  const portrait = useContext(PortraitContext);
  const classes = useStyles(portrait)(props);
  return (
    <Tooltip
      placement="bottom-start"
      classes={classes}
      interactive
      title={
        <>
          <Typography variant="subtitle2" className={classes.ratingWrapper}>
            {' '}
            Experience:{' '}
            <Box className={classes.ratingStacking}>
              <Rating
                className={classes.rating}
                icon={<span>|</span>}
                emptyIcon={
                  <span style={{ opacity: 0.5, filter: 'saturate(0)' }}>|</span>
                }
                max={10}
                value={experience * 2}
                readOnly
                precision={0.5}
                size="small"
              />{' '}
              <span className={classes.experience}>
                {getFriendlyRating(experience)}
              </span>
            </Box>
          </Typography>
          <Typography variant="body2" className={classes.description}>
            <BlockText blocks={description} />
          </Typography>
          <Box className={classes.footLogo}>
            <Typography variant="subtitle1" className={classes.footText}>
              {title}
            </Typography>
            <Img className={classes.footSize} fluid={fluid} />
          </Box>
        </>
      }
    >
      {children}
    </Tooltip>
  );
};

const getFriendlyRating = num => {
  const ratings = [
    'Novice',
    'Advanced Beginner',
    'Intermediate / Competent',
    'Advanced / Proficient',
    'Expert',
  ];
  const index = Math.round((ratings.length / 5) * num) - 1;
  return ratings[index];
};
export default TooltipContent;
