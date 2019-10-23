import React from 'react';
import { graphql } from 'gatsby';
import { SendRounded, CloseRounded } from '@material-ui/icons/';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Fade,
  Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from '../lib/helpers';

import SEO from '../components/seo';
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL';
import { ContainerWithHeading } from '../components/containerWithHeading';

const Portfolio = ({ data, ...props }) => {
  const { site } = data || {};
  const { page } = data || {};
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <>
      <SEO
        title={page.title}
        description={site.description}
        keywords={site.keywords}
      />
      <ContainerWithHeading heading={page.title} subHeading={page._rawBody} />
    </>
  );
};

export const query = graphql`
  query PortfolioPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "projects" } }) {
      id
      title
      _rawBody
    }
  }
`;

export default ErrorHandlerGraphQL(Portfolio);
