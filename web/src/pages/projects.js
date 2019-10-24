import React from 'react';
import { graphql } from 'gatsby';
import ProjectsList from '../containers/projects-list';

import SEO from '../components/seo';
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL';
import { ContainerWithHeading } from '../components/containerWithHeading';

const Portfolio = ({ data, ...props }) => {
  const { site } = data || {};
  const { page } = data || {};
  const {
    projects: { nodes: projectNodes },
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
      <ContainerWithHeading heading={page.title} subHeading={page._rawBody}>
        <ProjectsList {...{ projectNodes }} />
      </ContainerWithHeading>
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
    projects: allSanityProject {
      nodes {
        title
        mainImage {
          asset {
            fluid(maxWidth: 3840) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
        techList: tech {
          category
          tech {
            title
            id
            experience
            description: _rawDescription
            logo {
              asset {
                fluid(maxWidth: 3840) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
        link
        repo
        excerpt: _rawExcerpt
        body: _rawBody
      }
    }
  }
`;

export default ErrorHandlerGraphQL(Portfolio);
