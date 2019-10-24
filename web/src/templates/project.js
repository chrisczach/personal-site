import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Zoom,
  Fade,
  Grow,
  Slide,
  Breadcrumbs,
  Box,
  Button,
} from '@material-ui/core';
import Img from 'gatsby-image';
import { makeStyles } from '@material-ui/core/styles';
import { LaunchRounded, CodeRounded } from '@material-ui/icons/';
import SEO from '../components/seo';
import { PortraitContext } from '../components/layout';
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL';
import { ContainerWithHeading } from '../components/containerWithHeading';
import ProjectLinks from '../components/project-links';
import MapTechToList from '../components/mapTechToList';

const useStyles = ({ portrait }) =>
  makeStyles(theme => ({
    paper: {
      display: 'flex',
      flexDirection: portrait ? 'column-reverse' : 'column',
      justifyContent: portrait ? 'flex-start' : 'stretch',
      margin: theme.spacing(1, 0, 4, 0),
      background: portrait
        ? `linear-gradient(to bottom right, ${theme.palette.primary.main}66, ${theme.palette.secondary.main}44) !important`
        : `linear-gradient(to bottom right, ${theme.palette.primary.main}33, ${theme.palette.secondary.main}22) !important`,
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      transition: 'all  3s ease !important',
      // '&:hover': {
      //   background: `linear-gradient(to bottom right, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22) !important`,
      //   transition: 'all  3s ease !important'
      // }
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
    image: {
      position: 'relative',
      width: '100%',
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
      opacity: 0,
      '&:hover': {
        opacity: 1,
        background: `linear-gradient(to bottom right, ${theme.palette.primary.main}99, ${theme.palette.secondary.main}66) !important`,
        backdropFilter: 'blur(8px)',
        webkitBackdropFilter: 'blur(8px)',
      },
    },
  }));

const ProjectTemplate = ({ data, ...props }) => {
  const project = data && data.project;
  const portrait = useContext(PortraitContext);
  const classes = useStyles({ portrait })(props);
  return (
    <>
      <SEO title={project.title} />
      <ContainerWithHeading
        heading={project.title}
        subHeading={project._rawExcerpt}
      >
        <ProjectLinks link={project.link} repo={project.repo} />
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
          <Link to="/">Home</Link>
          <Link to="/projects/">Projects</Link>
          <Link to={`/projects/${project.slug.current}/`}>{project.title}</Link>
        </Breadcrumbs>
        <Paper className={classes.paper}>
          <Box className={classes.content}>
            <Typography variant="h5" className={classes.heading}>
              Technical Specs
            </Typography>
            <MapTechToList tech={project.tech} />
          </Box>
          <Box className={classes.image}>
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
          </Box>
        </Paper>

        <div>Body Text</div>
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
          description: _rawDescription
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
      title
      slug {
        current
      }
      _rawBody
      _rawExcerpt
    }
  }
`;

export default ErrorHandlerGraphQL(ProjectTemplate);
