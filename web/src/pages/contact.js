import React, {useState, useEffect} from 'react'
import {SendRounded, CloseRounded} from '@material-ui/icons/'
import {Container, Paper, Typography, Button, Fade, Slide, Zoom, NoSsr} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'

import SEO from '../components/seo'
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL'
import {formInputComponents} from '../components/inputFields'
import {ContainerWithHeading} from '../components/containerWithHeading'
const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2)
  },
  submit: {
    margin: theme.spacing(2, 0, 1, 0)
  }
}))

const Contact = ({data, ...props}) => {
  const classes = useStyles(props)
  const site = (data || {}).site
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }
  const [showSubmit, setShowSubmit] = useState(false)
  useEffect(
    showSubmit => {
      if (!showSubmit) setTimeout(() => setShowSubmit(true), 1000)
    },
    [showSubmit]
  )
  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <ContainerWithHeading
        heading='Contact'
        subHeading='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam deserunt ullam
            blanditiis illo culpa saepe voluptate, reiciendis nisi tempore'
      >
        <Paper component='form' className={classes.paper}>
          {formInputComponents}
          <Fade in={showSubmit} timeout={1000}>
            <Button
              margin='normal'
              variant='contained'
              color='primary'
              size='large'
              className={classes.submit}
              endIcon={<SendRounded />}
            >
              Send
            </Button>
          </Fade>
        </Paper>
      </ContainerWithHeading>
    </>
  )
}

export const query = graphql`
  query ContactPageQuery {
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

export default ErrorHandlerGraphQL(Contact)
