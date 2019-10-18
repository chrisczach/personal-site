import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import {makeStyles} from '@material-ui/core/styles'

import BackgroundImage from 'gatsby-background-image'

const useStyles = makeStyles(theme => ({
  background: {
    maxHeight: '75vh',
    backgroundPosition: 'top center',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover'
  },
  fade: {
    height: '100%', 
    width: '100%', 
    background: `radial-gradient(ellipse at top center, transparent 50%, ${theme.palette.primary.dark} 100%), linear-gradient(to bottom, transparent 50%, ${theme.palette.primary.dark}dd 85%, ${theme.palette.primary.dark} 100%)`,
    position: 'absolute', 
    bottom: 0, 
    zIndex: -100
  }
}))

const Background = ({children, ...props}) => {
  const classes = useStyles(props)
  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: {eq: "background-1.jpg"}) {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => {
        // Set ImageData.
        const imageData = data.background.childImageSharp.fluid
        return (
          <BackgroundImage
            Tag='section'
            className={classes.background}
            fluid={imageData}
            backgroundColor={`#040e18`}
          >
            <div className={classes.fade} />
            {children}
            
          </BackgroundImage>
        )
      }}
    />
  )
}

export default Background
