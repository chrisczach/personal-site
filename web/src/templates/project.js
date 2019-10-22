import React, {useContext} from 'react'
import {graphql} from 'gatsby'
import {Container, Paper, Typography, TextField, Zoom, Grow, Slide, Box} from '@material-ui/core'
import SEO from '../components/seo'
import {PortraitContext} from '../components/layout'
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL'
import {ContainerWithHeading} from '../components/containerWithHeading'
import ProjectLinks from '../components/project-links'
import Img from 'gatsby-image'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = ({portrait}) =>
  makeStyles(theme => ({
    paper: {
      display: 'flex',
      flexDirection: portrait ? 'column-reverse' : 'row',
      justifyContent: portrait ? 'flex-start' : 'stretch',
      margin: theme.spacing(4, 0),
      background: portrait
        ? `linear-gradient(to bottom right, ${theme.palette.primary.main}66, ${theme.palette.secondary.main}44) !important`
        : `linear-gradient(to bottom right, ${theme.palette.primary.main}33, ${theme.palette.secondary.main}22) !important`,
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      transition: 'all  3s ease !important'
      // '&:hover': {
      //   background: `linear-gradient(to bottom right, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22) !important`,
      //   transition: 'all  3s ease !important'
      // }
    },
    content: {
      width: '100%',
      padding: theme.spacing(2)
    },
    image: {
      width: '100%'
    }
  }))

const ProjectTemplate = ({data, ...props}) => {
  const project = data && data.project
  const portrait = useContext(PortraitContext)
  const classes = useStyles({portrait})(props)
  return (
    <>
      <SEO title={project.title} />
      <ContainerWithHeading heading={project.title} subHeading={project._rawExcerpt}>
        <ProjectLinks link={project.link} repo={project.repo} />
        <Paper className={classes.paper}>
          <Box className={classes.content}>
            <ul>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
            </ul>
          </Box>
          <Box className={classes.image}>
            <Img fluid={project.mainImage.asset.fluid} />
          </Box>
        </Paper>
      </ContainerWithHeading>
    </>
  )
}

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: {eq: $id}) {
      id
      link
      repo
      categories {
        _id
        title
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
`

export default ErrorHandlerGraphQL(ProjectTemplate)
