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
import {ContainerWithHeading} from '../components/containerWithHeading'

const IndexPage = ({data, ...props}) => {
  const site = (data || {}).site
  const page = (data || {}).page
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <>
      <SEO title={page.title} description={site.description} keywords={site.keywords} />
      <ContainerWithHeading heading={page.title} subHeading={page._rawBody} />
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
    page: sanityPage(slug: {current: {eq: "index"}}) {
      id
      title
      _rawBody
    }
  }
`

export default ErrorHandlerGraphQL(IndexPage)
