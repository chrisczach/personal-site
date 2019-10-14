import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import {mapEdgesToNodes, filterOutDocsWithoutSlugs} from '../lib/helpers'
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL'

const ArchivePage = ({data}) => {
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
  return (
    <>
      <SEO title='Archive' />
      <Container>
        <h1>Projects</h1>
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
      </Container>
    </>
  )
}

export const query = graphql`
  query ArchivePageQuery {
    projects: allSanityProject(
      limit: 12
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
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

export default ErrorHandlerGraphQL(ArchivePage)
