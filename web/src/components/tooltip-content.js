import React, { useContext, useState } from 'react';
import { Tooltip, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Img from 'gatsby-image';
import { useSpring, animated, config } from 'react-spring';

import { PortraitContext } from './layout';
import BlockText from './block-text';

const AnimatedRating = animated(Rating);
const useStyles = portrait =>
  makeStyles(theme => ({
    tooltip: {
      background: `${theme.palette.secondary.dark}cc`,
      backdropFilter: 'blur(8px)',
      webkitBackdropFilter: 'blur(8px)',
      padding: theme.spacing(2, portrait ? 1 : 2),
      minWidth: portrait ? '75vw' : '50vw',
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
      padding: portrait ? 0 : theme.spacing(0, 2, 0, 2),
    },
    ratingIcon: {
      fontWeight: 'bold',
      color: theme.palette.success.main,
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
  const [{ value }, setValue] = useSpring(() => ({
    value: 0,
    config: config.molasses,
  }));
  const handleOpen = () => {
    setValue({ value: experience * 2 });
    setOpen(true);
  };
  const handleClose = () => {
    setValue({ value: 0 });
    setOpen(false);
  };
  const handleToggle = () => setOpen(state => !state);

  return (
    <Tooltip
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      disableTouchListener
      placement="bottom-start"
      classes={classes}
      interactive
      title={
        <div onClick={handleClose} style={{ userSelect: 'none' }}>
          <Typography variant="subtitle2" className={classes.ratingWrapper}>
            {' '}
            Experience:{' '}
            <Box className={classes.ratingStacking}>
              <AnimatedRating
                className={classes.rating}
                icon={<span className={classes.ratingIcon}>|</span>}
                emptyIcon={
                  <span
                    className={classes.ratingIcon}
                    style={{ opacity: 0.5, filter: 'saturate(0)' }}
                  >
                    |
                  </span>
                }
                max={10}
                value={value.interpolate(value => Number(value))}
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
        </div>
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
