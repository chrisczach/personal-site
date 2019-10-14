import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../components/seo'
import {mapEdgesToNodes, filterOutDocsWithoutSlugs} from '../lib/helpers'
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL'

const ArchivePage = ({data}) => {
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
  return (
    <>
      <SEO title='Archive' />
      Archive Page
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
