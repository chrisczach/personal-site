import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL';
import { ContainerWithHeading } from '../components/containerWithHeading';
import AvatarWrapper from '../components/avatar-wrapper';
import MapTechToList from '../components/mapTechToList';

const About = ({ data }) => {
  const { site } = data || {};
  const { page } = data || {};
  const {
    techList: { group: tech },
  } = data || {};
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
      <ContainerWithHeading
        heading={<AvatarWrapper node={page.mainImage} />}
        darkBody
        TechHeading={
          <MapTechToList
            tech={tech
              .sort(
                ({ tech: a }, { tech: b }) =>
                  a[0].category.sort - b[0].category.sort,
              )
              .map(({ category, tech }) => ({
                category,
                tech: tech
                  .filter(({ sort }) => sort)
                  .sort(({ sort: a }, { sort: b }) => a - b),
              }))}
          />
        }
        subHeading={page._rawBody}
      />
    </>
  );
};

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "about" } }) {
      id
      title
      mainImage {
        asset {
          _id
        }
        caption
      }
      _rawBody
    }

    techList: allSanityTech {
      group(field: category___title) {
        category: fieldValue
        tech: nodes {
          sort
          title
          category {
            sort
          }
          description: _rawDescription
          experience
          logo {
            asset {
              fluid(maxWidth: 3840) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default ErrorHandlerGraphQL(About);
