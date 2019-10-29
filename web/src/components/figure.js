import React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
import clientConfig from '../../client-config';

import styles from './figure.module.css';

export default ({ node }) => {
  if (!node.asset) {
    return null;
  }

  const fluidProps = getFluidGatsbyImage(
    node.asset._ref,
    { maxWidth: 1200 },
    clientConfig.sanity,
  );

  return (
    <figure style={{ margin: 0, padding: 0 }}>
      <Img fluid={fluidProps} alt={node.alt} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </figure>
  );
};
