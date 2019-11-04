import React, { useContext } from 'react';
import { Box, Fade, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useDimensions from 'react-use-dimensions';
import { useTransition, animated, config } from 'react-spring';

import ProjectCard from './project-card';
import { PortraitContext } from './layout';

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      display: `grid`,
      // Change bottom margin later
      margin: theme.spacing(2, 0, 6, 0),
      gridTemplateColumns: `repeat(${portrait ? 1 : 3}, 1fr )`,
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
    },
  }));

const ProjectGrid = ({ projects, ...props }) => {
  const portrait = useContext(PortraitContext);
  const classes = useStyles(portrait)(props);
  const [ref, { width }] = useDimensions();
  const projectCards = projects.map(project => (
    <ProjectCard key={project.id} project={project} containerWidth={width} />
  ));
  console.log(projectCards);
  const transitions = useTransition(projectCards, item => item.key, {
    from: {
      opacity: 0.5,
      transform: 'translate3d(0,50%,0) scale(0)',
      filter: 'saturate(0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0,0,0)  scale(1)',
      filter: 'saturate(1)',
    },
    leave: {
      opacity: 0.5,
      transform: 'translate3d(0,50%,0)  scale(0)',
      filter: 'saturate(0)',
    },
    delay: 500,
    trail: 250,
    config: portrait ? config.slow : config.stiff,
  });

  return portrait ? (
    <Fade in timeout={1000}>
      <Slide in direction="up" timeout={500}>
        <Box ref={ref} className={classes.wrapper}>
          {projectCards}
        </Box>
      </Slide>
    </Fade>
  ) : (
    <Box ref={ref} className={classes.wrapper}>
      {transitions.map(({ item, props, key }) => (
        <animated.div style={{ margin: 0, padding: 0, ...props }} key={key}>
          {item}
        </animated.div>
      ))}
    </Box>
  );
};

export default ProjectGrid;
