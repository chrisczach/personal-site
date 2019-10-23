import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

import BackgroundImage from 'gatsby-background-image';

const useStyles = makeStyles(theme => ({
  background: {
    maxHeight: '75vh',
    backgroundPosition: 'top center',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover',
  },
  fade: {
    height: '100%',
    width: '100%',
    background: `radial-gradient(ellipse at top center, transparent 50%, ${theme.palette.primary.dark} 100%), linear-gradient(to bottom, transparent 50%, ${theme.palette.primary.dark}dd 85%, ${theme.palette.primary.dark} 100%)`,
    position: 'absolute',
    bottom: 0,
    zIndex: -100,
  },
}));

const Background = ({ children, ...props }) => {
  const classes = useStyles(props);
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            childImageSharp {
              fluid(quality: 100, maxWidth: 3840) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);
  // Set ImageData.
  // maybe implement image selector?
  const [background, setBackground] = useState(0);
  const imageData = edges[background].node.childImageSharp.fluid;
  return (
    <BackgroundImage
      Tag="section"
      className={classes.background}
      fluid={imageData}
      backgroundColor="#322A38"
    >
      <div className={classes.fade} />
      {children}
    </BackgroundImage>
  );
};

export default Background;
