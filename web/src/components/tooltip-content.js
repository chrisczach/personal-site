import React from 'react';
import { Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  tooltip: {
    background: theme.palette.primary.main,
    padding: theme.spacing(2, 1),
  },
  tooltipPlacementBottom: {
    margin: '0',
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
  const classes = useStyles(props);
  return (
    <Tooltip
      placement="bottom-start"
      classes={classes}
      interactive
      title={
        <>
          <Typography variant="subtitle2">
            {' '}
            Experience:{' '}
            <Rating
              style={{ transform: 'translateY(25%)' }}
              value={experience}
              readOnly
              precision={0.5}
              size="small"
            />{' '}
            {getFriendlyRating(experience)}
          </Typography>
          {description}

          {title}
        </>
      }
    >
      {children}
    </Tooltip>
  );
};

const getFriendlyRating = num => {
  const ratings = [ 'Learning', 'Beginner', 'Proficient', 'Advanced', 'Expert' ];
  const index = Math.round(ratings.length/5*num)-1;
  return ratings[index]
};
export default TooltipContent;
