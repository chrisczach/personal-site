import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Button,
  Typography,
  Tooltip,
} from '@material-ui/core';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import {
  LaunchRounded,
  CodeRounded,
  ExpandMoreRounded,
} from '@material-ui/icons/';

import BlockText from './block-text';
import { PortraitContext } from './layout';
import SlideDrawer from './slide-drawer';
import MiniTechList from './mini-tech-list';

const useStyles = (portrait, containerWidth = 1280) =>
  makeStyles(theme => ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      height: '100%',
      background: `radial-gradient(bottom right, ${theme.palette.secondary.dark}bb,${theme.palette.secondary.main}66)`,
      backdropFilter: 'blur(8px)',
      webkitBackdropFilter: 'blur(8px)',
      position: 'relative',
      overflow: 'hidden',
    },
    media: {
      height: portrait ? `50vw` : `${Math.round(containerWidth / 6)}px`,
      overflow: 'hidden',
    },
    projectButton: {
      color: theme.palette.primary.light,
    },
    actionArea: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    tooltip: {
      background: `${theme.palette.primary.dark}88`,
    },
    collapsed: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expanded: {
      transform: 'rotate(180deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    cardMedia: {
      flexGrow: 1,
      padding: 0,
      margin: 0,
    },
    coloredCardHeading: {
      color: theme.palette.warning.main,
      opacity: 0.9,
    },
  }));

const ProjectCard = ({ project, containerWidth, ...props }) => {
  const portrait = useContext(PortraitContext);
  const [showDetails, setShowDetails] = useState(false);
  const handleToggleShow = () => setShowDetails(state => !state);
  const classes = useStyles(portrait, containerWidth)(props);

  const {
    title,
    excerpt,
    body,
    techList,
    mainImage: {
      asset: { fluid },
    },
    slug: { current },
  } = project;
  return (
    <Card className={classes.card} raised {...props}>
      <Link className={classes.cardMedia} to={`/projects/${current}/`}>
        <CardActionArea>
          <CardMedia className={classes.media} title={title}>
            <Img {...{ fluid }} />
          </CardMedia>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.coloredCardHeading}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <BlockText blocks={excerpt} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.actionArea}>
        <Tooltip
          placement="right"
          title={
            <Typography variant="body2" color="textSecondary">
              {showDetails ? 'Hide Details' : 'See Details'}
            </Typography>
          }
          classes={classes}
        >
          <IconButton
            aria-label={showDetails ? 'Hide Details' : 'See Details'}
            size="small"
            style={{ pointerEvents: showDetails ? 'none' : 'auto' }}
            className={showDetails ? classes.expanded : classes.collapsed}
            onClick={handleToggleShow}
          >
            <ExpandMoreRounded />
          </IconButton>
        </Tooltip>

        <Link to={`/projects/${current}/`}>
          <Tooltip
            placement="left"
            title={
              <Typography variant="body2" color="textSecondary">
                Open Project Page
              </Typography>
            }
            classes={classes}
          >
            <Button
              endIcon={<LaunchRounded />}
              size="small"
              className={classes.projectButton}
            >
              Open
            </Button>
          </Tooltip>
        </Link>
      </CardActions>
      <SlideDrawer
        show={showDetails}
        handleToggle={handleToggleShow}
        onClick={handleToggleShow}
      >
        <MiniTechList tech={techList} />
      </SlideDrawer>
    </Card>
  );
};

export default ProjectCard;
