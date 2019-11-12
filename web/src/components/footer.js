import React, { useEffect, useState, useContext } from 'react';
import {
  AppBar,
  Fade,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  Slide,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import { PortraitContext, CurrentTooltipContext } from './layout';

const useStyles = makeStyles(theme => ({
  tooltip: {
    position: 'relative',
    background: 'transparent',
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0, 6, 4, 0),
    overflow: 'hidden',
    maxWidth: 'none',
  },
  tipPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(0, 2, 0, 0),
    background: theme.palette.secondary.main,
  },
  pointer: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(3),
  },
  toolTipType: {},
  appBar: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'fixed',
    padding: theme.spacing(0, 2),
    minHeight: 0,
    top: 'auto',
    background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}99, ${theme.palette.secondary.dark}99) !important`,
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)',
    transition: 'all  3s ease !important',
    '&:hover': {
      background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}99, ${theme.palette.secondary.dark}aa) !important`,
      transition: 'all  3s ease !important',
    },
  },
  bottomNavItem: {
    fontSize: '1em',
    padding: theme.spacing(0),
  },
  listItem: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  listIcon: {
    padding: theme.spacing(0, 0, 0, 1),
  },
  button: {
    padding: theme.spacing(0.5, 2),
  },
}));

const footer = ({ menuItems, location: { pathname }, ...props }) => {
  const classes = useStyles(props);
  const portrait = useContext(PortraitContext);
  return (
    <>
      {!portrait && (
        <Slide in direction="up" timeout={500}>
          <Fade in timeout={300}>
            <AppBar color="secondary" className={classes.appBar}>
              {menuItems.map(toBottomNav(classes, pathname))}
            </AppBar>
          </Fade>
        </Slide>
      )}
    </>
  );
};

const toBottomNav = (classes, pathname) => (
  { link, Icon, route, tooltip, ...props },
  index,
) => {
  const [tooltipValue, _] = useContext(CurrentTooltipContext);
  const LinkComponent = ({ children }) =>
    route[0] === '/' ? (
      <Link to={route}>{children}</Link>
    ) : (
      <a href={route} target="_blank">
        {children}
      </a>
    );
  return (
    <LinkComponent key={link}>
      <Tooltip
        placement="top-end"
        open={link === tooltipValue && pathname === '/'}
        title={
          <Paper className={classes.tipPaper}>
            <Typography variant="h5" className={classes.toolTipType}>
              {tooltip}
            </Typography>
            <Fade in timeout={500} mountOnEnter unmountOnExit>
              <Typography variant="h4" className={classes.pointer}>
                👇
              </Typography>
            </Fade>
          </Paper>
        }
        classes={classes}
      >
        <ListItem button className={classes.button}>
          <ListItemIcon className={classes.listIcon}>
            <Icon fontSize="small" />
          </ListItemIcon>

          <ListItemText primary={link} className={classes.listItem} />
        </ListItem>
      </Tooltip>
    </LinkComponent>
  );
};

export default footer;
