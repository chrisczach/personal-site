import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'

import SEO from '../components/seo'
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL'
import {SendRounded, CloseRounded} from '@material-ui/icons/'
import {Container, Paper, Typography, TextField, Button, Slide, Fade} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2)
  },
  heading: {
    padding: theme.spacing(2, 2, 1, 2)
  },
  subHeading: {
    padding: theme.spacing(2, 2)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2)
  }
}))

const IndexPage = ({data, ...props}) => {
  const site = (data || {}).site
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }
  const classes = useStyles(props)
  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container maxWidth='md' className={classes.container}>
        <Fade in timeout={300}>
          <Slide in direction='right' timeout={600}>
            <Typography variant='h2' color='secondary' className={classes.heading}>
              Home Page
            </Typography>
          </Slide>
        </Fade>
        <Fade in timeout={ 900 }>
        <Typography variant='subtitle1' color='primary' className={classes.subHeading}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam deserunt ullam
          blanditiis illo culpa saepe voluptate, reiciendis nisi tempore
        </Typography>
        </Fade>
      </Container>
    </>
  )
}

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    projects: allSanityProject(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

export default ErrorHandlerGraphQL(IndexPage)
