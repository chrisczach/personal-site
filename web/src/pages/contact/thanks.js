import React, {useState, useEffect} from 'react'
import {Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {graphql} from 'gatsby'

import SEO from '../../components/seo'
import ErrorHandlerGraphQL from '../../HOF/errorHandlerGraphQL'
import ThanksSuccess from '../../components/thanks'
import {ContainerWithHeading} from '../../components/containerWithHeading'
import {navigate} from '@reach/router'

const useStyles = makeStyles(theme => ({
  paper: {
    background: `linear-gradient(${theme.palette.primary.main}aa, ${theme.palette.secondary.dark}aa)`,
    margin: theme.spacing(3, 2, 8, 2),
    overflow: 'hidden',
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)'
  },
  submit: {
    margin: theme.spacing(2, 0, 1, 0)
  }
}))

const Thanks = ({data, location, ...props}) => {
  if (!location || !location.state) {
    navigate('/contact/')
  }
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
        <Paper className={classes.paper} elevation={24}>
          {location && location.state && <ThanksSuccess formValues={location.state} />}
        </Paper>
      </ContainerWithHeading>
    </>
  )
}

export const query = graphql`
  query ThanksPageQuery {
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

export default ErrorHandlerGraphQL(Thanks)
