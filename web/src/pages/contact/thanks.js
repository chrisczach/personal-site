import React, {useState, useEffect, useContext} from 'react'
import {Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {graphql} from 'gatsby'

import SEO from '../../components/seo'
import ErrorHandlerGraphQL from '../../HOF/errorHandlerGraphQL'
import ThanksSuccess from '../../components/thanks'
import {ContainerWithHeading} from '../../components/containerWithHeading'
import {navigate} from '@reach/router'
import ContactForm from '../../components/contact-form'
import {PortraitContext} from '../../components/layout'

const useStyles = portrait =>
  makeStyles(theme => ({
    paper: {
      background: `linear-gradient(${theme.palette.primary.main}aa, ${theme.palette.secondary.dark}aa)`,
      margin: theme.spacing(3, portrait ? 1 : 2, 8, portrait ? 1 : 2),
      overflow: 'hidden',
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)'
    },
    submit: {
      margin: theme.spacing(2, 0, 1, 0)
    }
  }))

const Thanks = ({data, location, ...props}) => {
  const portrait = useContext(PortraitContext)
  const hideThanks = !location || !location.state || !location.state.name
  if (hideThanks) {
    navigate('/contact/')
  }
  const classes = useStyles(portrait)(props)
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
        heading={hideThanks ? 'Contact Us!' : 'Message Sent!'}
        subHeading={hideThanks ? 'send us a message' : ''}
      >
        <Paper className={classes.paper} elevation={24}>
          {hideThanks ? <ContactForm /> : <ThanksSuccess formValues={location.state} />}
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
  }
`

export default ErrorHandlerGraphQL(Thanks)
