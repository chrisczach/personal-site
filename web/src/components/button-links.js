import React from 'react';
import { Link } from 'gatsby';
import { Button } from '@material-ui/core';
const ButtonLinks = ({ node: { link } }) => {
  const links = link.map(
    ({ _type, key, reference = null, href = null, linkName }) => ({
      _type,
      key,
      link: reference ? reference.slug.current : href,
      linkName,
    }),
  );
  // WIP - need to create wrapper container then map links to either internalLink componet or externalLink
  return (
    <div>
      {links.map(({ _type, key, link, linkName }) => {
        const LinkComponent = ({ children }) =>
          _type === 'internalLink' ? (
            <Link to={`${_type === 'project' ? '/projects' : ''}/${link}/`}>
              {children}
            </Link>
          ) : (
            <a target="_blank" href={link}>
              {children}
            </a>
          );
        return (
          <LinkComponent>
            <Button key={key}>{linkName}</Button>
          </LinkComponent>
        );
      })}
    </div>
  );
};

export default ButtonLinks;
