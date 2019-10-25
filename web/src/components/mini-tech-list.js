import React from 'react';
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

import { getFriendlyRating } from './tooltip-content';

const useStyles = makeStyles(theme => ({
  tooltip: {
    background: `${theme.palette.primary.main}cc`,
    backdropFilter: 'blur(8px)',
    webkitBackdropFilter: 'blur(8px)',
    margin: theme.spacing(2),
  },
  wrapper: {
    padding: theme.spacing(1),
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
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  rating: {
    // transform: 'translateY(25%)',
  },
  experience: {
    opacity: 0.75,
    padding: 0,
  },
  ratingIcon: {
    fontWeight: 'bold',
    color: theme.palette.success.main,
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
          <>
            <Typography variant="subtitle1" className={classes.subTitle}>
              {category}
            </Typography>
            <Box className={classes.wrapper}>
              {tech.map(
                ({
                  title,
                  experience,
                  description,
                  logo: {
                    asset: { fluid },
                  },
                }) => (
                  <Tooltip
                    classes={classes}
                    title={
                      <Box className={classes.miniTip}>
                        {title}
                        <Rating
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
                          value={experience * 2}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                        <span className={classes.experience}>
                          {getFriendlyRating(experience)}
                        </span>
                      </Box>
                    }
                  >
                    <IconButton>
                      <Box className={classes.imageWrap}>
                        <Img fluid={fluid} />
                        {/* NEED TO WORK ON THIS */}
                      </Box>
                    </IconButton>
                  </Tooltip>
                ),
              )}
            </Box>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default MiniTechList;
