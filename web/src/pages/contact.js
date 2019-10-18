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
import ContactForm from '../components/contact-form'
import {ContainerWithHeading} from '../components/containerWithHeading'

const useStyles = makeStyles(theme => ({
  paper: {
    background: theme.palette.secondary.dark,
    margin: theme.spacing(3, 2, 8, 2)
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

  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <ContainerWithHeading heading='Contact' subHeading='Send a message!'>
        <Paper className={classes.paper}>
          <ContactForm />
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
