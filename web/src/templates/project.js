import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import {
  Container,
  Paper,
  Collapse,
  Typography,
  TextField,
  Zoom,
  Fade,
  Grow,
  Slide,
  Breadcrumbs,
  Box,
  Button,
  makeStyles,
  fade,
  darken,
} from '@material-ui/core';
import Img from 'gatsby-image';
import { LaunchRounded, CodeRounded } from '@material-ui/icons/';
import useResizeAware from 'react-resize-aware';
import BackgroundImage from 'gatsby-background-image';
// import hexToRgba from 'hex-to-rgba'

import SEO from '../components/seo';
import { PortraitContext } from '../components/layout';
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL';
import { ContainerWithHeading } from '../components/containerWithHeading';
import ProjectLinks from '../components/project-links';
import MapTechToList from '../components/mapTechToList';
import BlockContent from '../components/block-content';

const useStyles = ({ portrait, width }) =>
  makeStyles(theme => ({
    paper: {
      display: 'flex',
      overflow: 'hidden',
      flexDirection: portrait ? 'column-reverse' : 'row',
      justifyContent: portrait ? 'flex-start' : 'stretch',
      margin: theme.spacing(2, 0, 4, 0),
      background: portrait
        ? `linear-gradient(to bottom right, ${fade(
            theme.palette.primary.dark,
            0.9,
          )}, ${fade(theme.palette.primary.dark, 0.95)}) !important`
        : `linear-gradient(to bottom right, ${darken(
            fade(theme.palette.primary.dark, 0.3),
            0.15,
          )}, ${darken(
            fade(theme.palette.primary.dark, 0.9),
            0.3,
          )}) !important`,
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      // transition: theme.transitions.create('all', {
      //   duration: theme.transitions.duration.shortest,
      // }),
      '@media (hover:hover)': {
        '&:hover': {
          backdropFilter: 'blur(10px) brightness(.9)',
          webkitBackdropFilter: 'blur(10px)  brightness(.9)',
        },
      },
    },
    breadcrumb: {
      padding: theme.spacing(0, 2),
    },
    heading: {
      color: theme.palette.secondary.light,
      fontSize: '1.5em',
    },
    content: {
      width: '100%',
      padding: theme.spacing(2),
    },
    imageWrap: {
      boxShadow: theme.shadows[3],
    },
    image: {
      position: 'relative',
      margin: portrait ? theme.spacing(12, 0) : theme.spacing(2, 0),
      maxHeight: `${Math.round(portrait ? width : width / 2)}px`,
      overflow: 'hidden',
    },
    hoverOpen: {
      zIndex: 2,
      position: 'absolute',
      top: 0,
      left: 0,
      width: `100%`,
      height: `100%`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      transition: 'all  .3s ease',
      width: `100%`,
      height: `100%`,
      borderRadius: 0,
      fontSize: '1.25em',
      opacity: portrait ? 0.5 : 0,
      '&:hover': {
        opacity: 1,
        background: `linear-gradient(to bottom right, ${fade(
          theme.palette.primary.main,
          0.45,
        )}, ${fade(theme.palette.secondary.main, 0.3)}) !important`,
        backdropFilter: 'blur(8px)',
        webkitBackdropFilter: 'blur(8px)',
      },
    },
    blockWrapper: {
      margin: portrait ? theme.spacing(6, 2) : theme.spacing(4),
    },
    mobileShot: {
      position: 'relative',
      maxHeight: portrait ? '100vw' : '100%',
      minHeight: portrait ? '50vw' : '50vh',
      width: portrait ? '100%' : '50%',
      overflow: 'hidden',
    },
  }));

const ProjectTemplate = ({ data, ...props }) => {
  const project = data && data.project;
  const portrait = useContext(PortraitContext);
  const [resizeListener, { width, height }] = useResizeAware();
  const [
    resizeImageListener,
    { width: imageWidth, height: imageHeight },
  ] = useResizeAware();
  const classes = useStyles({ portrait, width })(props);

  return (
    <>
      <SEO title={project.title} />
      <ContainerWithHeading
        projectPage
        heading={project.title}
        subHeading={project._rawExcerpt}
      >
        <ProjectLinks link={project.link} repo={project.repo} />
        <Fade in timeout={500}>
          <Grow in timeout={500}>
            <Paper className={classes.paper}>
              <Box className={classes.content}>
                <Typography variant="h5" className={classes.heading}>
                  Technical Specs
                </Typography>
                <MapTechToList tech={project.tech} />
              </Box>

              <Box className={classes.mobileShot}>
                {resizeImageListener}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: portrait ? imageHeight : '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Img fluid={project.mobileImage.asset.fluid} />
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  className={classes.hoverOpen}
                >
                  <Button
                    endIcon={<LaunchRounded />}
                    className={classes.button}
                  >
                    Open Site
                  </Button>
                </a>
              </Box>
            </Paper>
          </Grow>
        </Fade>

        <Box className={classes.blockWrapper}>
          <BlockContent blocks={project._rawBody} />
        </Box>
        <Box className={classes.imageWrap}>
          <Paper className={classes.image}>
            <Img fluid={project.mainImage.asset.fluid} />
            <a
              href={project.link}
              target="_blank"
              className={classes.hoverOpen}
            >
              <Button endIcon={<LaunchRounded />} className={classes.button}>
                Open Site
              </Button>
            </a>
            {resizeListener}
          </Paper>
        </Box>
      </ContainerWithHeading>
    </>
  );
};

export const query = graphql`
         query ProjectTemplateQuery($id: String!) {
           project: sanityProject(id: { eq: $id }) {
             id
             link
             repo
             tech {
               category
               tech {
                 title
                 description: _rawDescription(
                   resolveReferences: { maxDepth: 10 }
                 )
                 excerpt: _rawExcerpt(
                   resolveReferences: { maxDepth: 10 }
                 )
                 experience
                 logo {
                   asset {
                     fluid(maxWidth: 3840) {
                       ...GatsbySanityImageFluid
                     }
                   }
                 }
               }
             }
             mainImage {
               asset {
                 fluid(maxWidth: 3840) {
                   ...GatsbySanityImageFluid
                 }
               }
             }
             mobileImage {
               asset {
                 fluid(maxWidth: 3840) {
                   ...GatsbySanityImageFluid
                 }
               }
             }
             title
             slug {
               current
             }
             _rawBody(resolveReferences: { maxDepth: 10 })
             _rawExcerpt(resolveReferences: { maxDepth: 10 })
           }
         }
       `;

export default ErrorHandlerGraphQL(ProjectTemplate);
