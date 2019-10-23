import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL';
import { ContainerWithHeading } from '../components/containerWithHeading';

const Work = ({ data, ...props }) => {
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
  query ExperiencePageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "experience" } }) {
      id
      title
      _rawBody
    }
  }
`;

export default ErrorHandlerGraphQL(Work);
