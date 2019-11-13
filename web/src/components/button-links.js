import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LaunchRounded, ChevronRightRounded } from '@material-ui/icons/';

import { PortraitContext } from './layout';

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      display: 'flex',
      flexDirection: portrait ? 'column' : 'row',
      justifyContent: 'stretch',
      alignItems: 'center',
      margin: theme.spacing(portrait ? 2 : 4, 0, portrait ? 8 : 10, 0),
    },
    link: {
      margin: theme.spacing(1),
    },
    button: {
      minWidth: portrait ? '50vw' : 'unset',
      padding: theme.spacing(1, 4),
      whiteSpace: 'nowrap',
    },
  }));

const ButtonLinks = ({ node: { link }, ...props }) => {
  const portrait = useContext(PortraitContext);
  const classes = useStyles(portrait)(props);
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
    <Box className={classes.wrapper}>
      {!portrait && <Box style={{ width: '66%' }} />}
      {links.map(({ _type, key, link, linkName }, index) => {
        const isInternal = _type === 'internalLink';
        const LinkComponent = ({ children, ...props }) =>
          isInternal ? (
            <Link
              to={`${_type === 'project' ? '/projects' : ''}/${link}/`}
              {...props}>
              {children}
            </Link>
          ) : (
            <a target="_blank" href={link} {...props}>
              {children}
            </a>
          );
        return (
          <LinkComponent className={classes.link} key={'' + link + index}>
            <Button
              variant={isInternal ? 'contained' : 'outlined'}
              color={isInternal ? 'secondary' : 'default'}
              key={key}
              className={classes.button}
              endIcon={
                isInternal ? <ChevronRightRounded /> : <LaunchRounded />
              }>
              {linkName}
            </Button>
          </LinkComponent>
        );
      })}
      {!portrait && <Box style={{ width: '33%' }} />}
    </Box>
  );
};

export default ButtonLinks;
