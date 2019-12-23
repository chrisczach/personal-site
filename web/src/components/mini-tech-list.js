import React, { useState, useContext } from 'react';
import {
  Box,
  ClickAwayListener,
  Grow,
  Collapse,
  Button,
  IconButton,
  Tooltip,
  Typography,
  makeStyles,
  fade,
  darken,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Img from 'gatsby-image';
import { useSpring, animated, config } from 'react-spring';
// import hexToRgba from 'hex-to-rgba';

import { getFriendlyRating } from './tooltip-content';
import { PortraitContext } from './layout';

const useStyles = makeStyles(theme => ({
  popper: {
    margin: theme.spacing(1),
    background: `linear-gradient(to bottom right, ${darken(
      fade(theme.palette.primary.dark, 0.95),
      0.5,
    )}, ${darken(theme.palette.primary.dark, 0.5)}) 50%`,
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
    marg: theme.spacing(1),
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
    fontWeight: 400,
    fontSize: '1.5em',
    letterSpacing: theme.spacing(-1),
    margin: theme.spacing(0, 0, 1, 0),
    color: '#b6da84',
  },
}));
const MiniTechList = ({ tech, ...props }) => {
  const portrait = useContext(PortraitContext);
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
              {tech.map(toMiniRatings(portrait, classes))}
            </Box>
          </div>
        ))}
      </Box>
    </Box>
  );
};

const toMiniRatings = (portrait, classes) => ({
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
      enterDelay={50}
      // leaveDelay={50}
      disableTouchListener
      onOpen={handleOpen}
      onClose={handleClose}
      interactive={portrait}
      open={open}
      key={id}
      classes={{ tooltip: classes.tooltip, popper: classes.popper }}
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
      {portrait ? (
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
      ) : (
        <IconButton
        // onClick={e => {
        //   e.stopPropagation();
        //   handleOpen();
        // }}
        >
          <Box className={classes.imageWrap}>
            <Img fluid={fluid} />
          </Box>
        </IconButton>
      )}
    </Tooltip>
  );
};

export default MiniTechList;
