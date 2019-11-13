import React, { useContext, useState } from 'react';
import { Tooltip, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Img from 'gatsby-image';
import { useSpring, animated, config } from 'react-spring';

import { PortraitContext } from './layout';
import BlockContent from './block-content';

const useStyles = portrait =>
  makeStyles(theme => ({
    popper: {
      background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}33, ${theme.palette.primary.dark}) 50%`,
      backdropFilter: 'blur(8px) brightness(.8)',
      webkitBackdropFilter: 'blur(8px) brightness(.8)',
      boxShadow: theme.shadows[6],
    },
    tooltip: {
      background: 'transparent',
      minWidth: portrait ? '75vw' : '50vw',
    },
    tipWrapper: {
      padding: theme.spacing(2, portrait ? 1 : 2),
    },
    tooltipPlacementBottom: {
      margin: theme.spacing(0, portrait ? 0 : 2, 0, 0),
    },
    ratingWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: portrait ? 'space-around' : 'flex-start',
      alignItems: 'center',
    },
    rating: {
      transform: portrait ? 'translateY(25%)' : '',
    },
    experience: {
      opacity: 0.75,
      color: '#cfe7ad',
      padding: portrait ? 0 : theme.spacing(0, 2, 0, 2),
    },
    ratingIcon: {
      fontWeight: 400,
      fontSize: '1.5em',
      letterSpacing: theme.spacing(-1),
      margin: theme.spacing(0, 0, 1, 0),
      color: '#b6da84',
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
      justifyContent: portrait ? 'space-between' : 'flex-end',
      flexDirection: 'row',
      alignItems: portrait ? 'flex-start' : 'flex-end',
      '&:hover': {
        filter: 'saturate(2)',
      },
    },
    footSize: {
      width: portrait ? '15%' : '5%',
      opacity: 0.75,
      filter: 'saturate(.5)',
    },
    footText: {
      opacity: portrait ? 0.5 : 0.25,
      padding: portrait ? 0 : theme.spacing(1),
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const springProps = useSpring({
    width: open ? experience * 2 : 0,
  });

  const [ratingValue, setRatingValue] = useState(0);

  return (
    <Tooltip
      enterDelay={50}
      // leaveDelay={50}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      disableTouchListener
      placement="bottom-start"
      classes={{ tooltip: classes.tooltip, popper: classes.popper }}
      interactive
      title={
        <div
          onClick={handleClose}
          style={{ userSelect: 'none' }}
          className={classes.tipWrapper}>
          <Typography variant="subtitle2" className={classes.ratingWrapper}>
            {' '}
            Experience:{' '}
            <Box className={classes.ratingStacking}>
              <Rating
                className={classes.rating}
                icon={<span className={classes.ratingIcon}>|</span>}
                emptyIcon={
                  <span
                    className={classes.ratingIcon}
                    style={{ opacity: 0.5, filter: 'saturate(0)' }}>
                    |
                  </span>
                }
                max={10}
                value={ratingValue}
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
            <BlockContent blocks={description} />
          </Typography>
          <Box className={classes.footLogo}>
            <animated.div>
              {springProps.width.interpolate(x => {
                setRatingValue(x);
              })}
            </animated.div>{' '}
            <Typography variant="subtitle1" className={classes.footText}>
              {title}
            </Typography>
            <Img className={classes.footSize} fluid={fluid} />
          </Box>
        </div>
      }>
      {children}
    </Tooltip>
  );
};

export const getFriendlyRating = num => {
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
