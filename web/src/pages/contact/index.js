import React, {useState, useEffect} from 'react'
import {SendRounded, CloseRounded} from '@material-ui/icons/'
import {Container, Paper, Typography, Button, Fade, Slide, Zoom, NoSsr} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../../lib/helpers'

import SEO from '../../components/seo'
import ErrorHandlerGraphQL from '../../HOF/errorHandlerGraphQL'
import ContactForm from '../../components/contact-form'
import {ContainerWithHeading} from '../../components/containerWithHeading'

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

const Contact = ({data, ...props}) => {
  const classes = useStyles(props)
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
      <ContainerWithHeading heading={page.title} subHeading={page._rawBody}>
        <Paper className={classes.paper} elevation={24}>
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
    page: sanityPage(slug: {current: {eq: "contact"}}) {
      id
      title
      _rawBody
    }
  }
`

export default ErrorHandlerGraphQL(Contact)