import React, { useState } from 'react';
import {
  Box,
  ClickAwayListener,
  Grow,
  Collapse,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Img from 'gatsby-image';
import { useSpring, animated, config } from 'react-spring';

import { getFriendlyRating } from './tooltip-content';

const useStyles = makeStyles(theme => ({
  tooltip: {
    background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}11, ${theme.palette.primary.dark}33) 50%`,
    backdropFilter: 'blur(8px) brightness(.8)',
    webkitBackdropFilter: 'blur(8px) brightness(.8)',
    margin: theme.spacing(2),
    padding: 0,
    boxShadow: theme.shadows[6],
    overflow: 'hidden',
  },
  wrapper: {
    padding: theme.spacing(1, 1, 2, 1),
    overflow: 'hidden',
  },
  innerWrapper: {
    padding: theme.spacing(0, 2),
  },
  heading: {
    color: theme.palette.secondary.light,
    fontSize: '1.25em',
    padding: theme.spacing(1, 0),
  },
  subTitle: {
    fontSize: '1.1em',
    margin: '0 auto',
  },
  iconButton: {
    width: '1em',
    height: '1em',
  },
  imageWrap: {
    width: '1em',
    height: '1em',
  },
  miniTip: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  rating: {
    // transform: 'translateY(25%)',
    margin: '0 auto',
  },
  tipTitle: {
    margin: '0 auto',
    opacity: 0.5,
    color: '#b6da84',
  },
  experience: {
    opacity: 0.75,
    padding: 0,

    margin: '0 auto',
  },
  ratingIcon: {
    fontWeight: 'bold',
    fontSize: '1.5em',
    margin: theme.spacing(0, 0, 1, 0),
    color: '#b6da84',
  },
}));
const MiniTechList = ({ tech, ...props }) => {
  const classes = useStyles(props);
  return (
    <Box className={classes.wrapper}>
      <Typography variant="h5" className={classes.heading}>
        Technical Specs
      </Typography>
      <Box className={classes.innerWrapper}>
        {tech.map(({ category, tech }) => (
          <div key={category}>
            <Typography variant="subtitle1" className={classes.subTitle}>
              {category}
            </Typography>
            <Box className={classes.wrapper}>
              {tech.map(toMiniRatings(classes))}
            </Box>
          </div>
        ))}
      </Box>
    </Box>
  );
};

const toMiniRatings = classes => ({
  title,
  experience,
  description,
  id,
  logo: {
    asset: { fluid },
  },
}) => {
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
      onOpen={handleOpen}
      onClose={handleClose}
      open={open}
      key={id}
      interactive
      classes={classes}
      title={
        <Box className={classes.miniTip}>
          <Typography variant="subtitle1" className={classes.tipTitle}>
            {' '}
            {title}
          </Typography>
          <Rating
            className={classes.rating}
            icon={
              <Typography variant="body2" className={classes.ratingIcon}>
                |
              </Typography>
            }
            emptyIcon={
              <Typography
                variant="body2"
                className={classes.ratingIcon}
                style={{ opacity: 0.5, filter: 'saturate(0)' }}
              >
                |
              </Typography>
            }
            max={10}
            value={ratingValue}
            readOnly
            precision={0.5}
            size="small"
          />
          <Typography variant="body2" className={classes.experience}>
            {getFriendlyRating(experience)}
          </Typography>
          <animated.div>
            {springProps.width.interpolate(x => {
              setRatingValue(x);
            })}
          </animated.div>
        </Box>
      }
    >
      <ClickAwayListener onClickAway={handleClose}>
        <IconButton
          onClick={e => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <Box className={classes.imageWrap}>
            <Img fluid={fluid} />
          </Box>
        </IconButton>
      </ClickAwayListener>
    </Tooltip>
  );
};

export default MiniTechList;
