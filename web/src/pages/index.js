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
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <ContainerWithHeading
        heading='Home'
        subHeading='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam deserunt ullam
            blanditiis illo culpa saepe voluptate, reiciendis nisi tempore'
      />
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
