import React, { useState, useEffect, useContext } from 'react';
import { Paper, makeStyles, fade } from '@material-ui/core';
import { graphql } from 'gatsby';
import { navigate } from '@reach/router';
// import hexToRgba from 'hex-to-rgba'

import SEO from '../../components/seo';
import ErrorHandlerGraphQL from '../../HOF/errorHandlerGraphQL';
import ThanksSuccess from '../../components/thanks';
import { ContainerWithHeading } from '../../components/containerWithHeading';
import ContactForm from '../../components/contact-form';
import { PortraitContext } from '../../components/layout';

const useStyles = portrait =>
  makeStyles(theme => ({
    paper: {
      background: `linear-gradient(to bottom right, ${fade(
        theme.palette.secondary.main,
        0.25,
      )}, ${hexToRgba(theme.palette.primary.main + '44')}, ${fade(
        theme.palette.primary.dark,
        0.5,
      )}), linear-gradient(to bottom left, transparent, ${fade(
        theme.palette.primary.main,
        0.25,
      )}, ${fade(theme.palette.primary.dark, 0.5)})`,
      margin: theme.spacing(3, portrait ? 1 : 2, 8, portrait ? 1 : 2),
      overflow: 'hidden',
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
    },
    submit: {
      margin: theme.spacing(2, 0, 1, 0),
    },
  }));

const Thanks = ({ data, location, ...props }) => {
  const portrait = useContext(PortraitContext);
  const hideThanks = !location || !location.state || !location.state.name;
  if (hideThanks) {
    navigate('/contact/');
  }
  const classes = useStyles(portrait)(props);
  const { site } = data || {};
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <ContainerWithHeading
        heading={hideThanks ? 'Contact Us!' : 'Message Sent!'}
        subHeading={hideThanks ? 'send us a message' : ''}
      >
        <Paper className={classes.paper} elevation={24}>
          {hideThanks ? (
            <ContactForm />
          ) : (
            <ThanksSuccess formValues={location.state} />
          )}
        </Paper>
      </ContainerWithHeading>
    </>
  );
};

export const query = graphql`
  query ThanksPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
  }
`;

export default ErrorHandlerGraphQL(Thanks);
