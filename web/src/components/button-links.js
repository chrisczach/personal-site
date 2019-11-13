import React from 'react';

const ButtonLinks = ({ node: { link } }) => {
  const links = link.map(
    ({ _type, key, reference = null, href = null, linkName } = {}) => ({
      _type,
      key,
      link: reference ? `/${reference.slug.current}/` : href,
      linkName,
    }),
  );
  // WIP - need to create wrapper container then map links to either internalLink componet or externalLink
  return <div>{JSON.stringify(links, null, 2)}</div>;
};

export default ButtonLinks;
