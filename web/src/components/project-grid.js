import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProjectCard from './project-card';
import { PortraitContext } from './layout';

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      display: `grid`,
      margin: theme.spacing(2, 0),
      gridTemplateColumns: `repeat(${portrait ? 1 : 3}, 1fr )`,
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
    },
  }));

const ProjectGrid = ({ projects, ...props }) => {
  const portrait = useContext(PortraitContext);
  const classes = useStyles(portrait)(props);
  return (
    <Box className={classes.wrapper}>
      {projects.map(project => (
        <ProjectCard project={project} />
      ))}
    </Box>
  );
};

export default ProjectGrid;