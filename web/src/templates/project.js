import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../components/seo'

import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL'
import {ContainerWithHeading} from '../components/containerWithHeading'
import ProjectLinks from '../components/project-links'

const ProjectTemplate = ({data}) => {
  const project = data && data.project
  console.log(project)
  return (
    <>
      <SEO title={project.title} />
      <ContainerWithHeading heading={project.title} subHeading={project._rawExcerpt}>
        <ProjectLinks link={ project.link } repo={ project.repo } />
        <div>Next Thing</div>
      </ContainerWithHeading>
    </>
  )
}

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: {eq: $id}) {
      id
      link
      repo
      categories {
        _id
        title
      }
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
      slug {
        current
      }
      _rawBody
      _rawExcerpt
    }
  }
`

export default ErrorHandlerGraphQL(ProjectTemplate)
