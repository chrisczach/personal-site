import React from 'react';
import {
  Box,
  ClickAwayListener,
  Grow,
  Collapse,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';

const useStyles = makeStyles(theme => ({
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
                  <div style={{ width: '1em', height: '1em' }}>
                      <Img fluid={ fluid } />
                      {/* NEED TO WORK ON THIS */}
                  </div>
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
