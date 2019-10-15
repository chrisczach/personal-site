import React, {useState, useEffect} from 'react'
import {SendRounded, CloseRounded} from '@material-ui/icons/'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Fade,
  Slide,
  NoSsr
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'

import SEO from '../components/seo'
import ErrorHandlerGraphQL from '../HOF/errorHandlerGraphQL'

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2)
  },
  heading: {
    padding: theme.spacing(2, 2, 1, 2)
  },
  subHeading: {
    padding: theme.spacing(2, 2)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2)
  }
  // input: {
  //   margin: theme.spacing(2)
  // },
  // submit: {
  //   margin: theme.spacing(2, 2, 1, 2)
  // }
}))

const Contact = ({data, ...props}) => {
  const classes = useStyles(props)
  const site = (data || {}).site
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }
  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container maxWidth='md' className={classes.container}>
        <Fade in timeout={300}>
          <Slide in direction='right' timeout={600}>
            <Typography variant='h2' color='secondary' className={classes.heading}>
              Contact Me
            </Typography>
          </Slide>
        </Fade>
        <Fade in timeout={900}>
          <Typography variant='subtitle1' color='primary' className={classes.subHeading}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam deserunt ullam
            blanditiis illo culpa saepe voluptate, reiciendis nisi tempore
          </Typography>
        </Fade>
        <Paper component='form' className={classes.paper}>
          {inputFields.map(({label, placeholder, required, rows}) => (
            <TextField
              variant='outlined'
              {...{label, placeholder, required}}
              inputProps={{
                'aria-label': label
              }}
              margin='normal'
              {...{multiline: rows !== 0}}
            />
          ))
          /* {formElements(classes).map((element, index) => (
            <Fade in timeout={index * 600 + 1000}>
              {element}
            </Fade>
          ))} */
          }
        </Paper>
      </Container>
    </>
  )
}

const inputFields = [
  {label: 'Full Name', placeholder: 'Enter Name Here', required: true},
  {label: 'Email Address', placeholder: 'Enter Email Here', required: true},
  {label: 'Subject', placeholder: 'Enter Message Subject Here', required: false},
  {label: 'Message', placeholder: 'Enter Mesage Body Here', required: true, rows: 4}
]

// const formElements = ({input, submit}) => [
//   <TextField
//     margin='normal'
//     required
//     variant='outlined'
//     label='Full Name'
//     placeholder='Enter Name Here'
//     className={input}
//     inputProps={{
//       'aria-label': 'Full Name'
//     }}
//   />,
//   <TextField
//     variant='outlined'
//     required
//     margin='normal'
//     className={input}
//     label='Email Address'
//     placeholder='Enter Email Here'
//     inputProps={{
//       'aria-label': 'Email'
//     }}
//   />,
//   <TextField
//     variant='outlined'
//     margin='normal'
//     label='Subject'
//     className={input}
//     placeholder='End Subject Here'
//     inputProps={{
//       'aria-label': 'Subject'
//     }}
//   />,
//   <TextField
//     rows={6}
//     variant='outlined'
//     margin='normal'
//     required
//     label='Message Body'
//     multiline
//     className={input}
//     placeholder='Message Body Here'
//     inputProps={{
//       'aria-label': 'Body'
//     }}
//   />,
//   <Button
//     className={submit}
//     color='primary'
//     size='large'
//     variant='contained'
//     startIcon={<SendRounded />}
//   >
//     Send Message
//   </Button>
// ]

export const query = graphql`
  query ContactPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    projects: allSanityProject(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
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
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

export default ErrorHandlerGraphQL(Contact)
