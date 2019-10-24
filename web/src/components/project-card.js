import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import BlockText from './block-text';
import { PortraitContext } from './layout';

const useStyles = (portrait, containerWidth = 1280) =>
  makeStyles(theme => ({
    card: {
      background: `${theme.palette.secondary.dark}aa`,
      backdropFilter: 'blur(8px)',
      webkitBackdropFilter: 'blur(8px)',
    },
    media: {
      height: portrait ? `50vw` : `${Math.round(containerWidth / 6)}px`,
      overflow: 'hidden',
    },
  }));

const ProjectCard = ({ project, containerWidth, ...props }) => {
  const portrait = useContext(PortraitContext);
  const classes = useStyles(portrait, containerWidth)(props);
  const {
    title,
    excerpt,
    body,
    mainImage: {
      asset: { fluid },
    },
    slug: { current },
  } = project;
  return (
    <Card className={classes.card} raised>
      <Link to={`/projects/${current}/`}>
        <CardActionArea>
          <CardMedia className={classes.media} title={title}>
            <Img {...{ fluid }} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <BlockText blocks={excerpt} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
