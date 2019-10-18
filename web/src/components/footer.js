import React, {useEffect, useState, useContext} from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  Fade,
  Slide,
  ListItemText,
  Divider,
  Grow,
  ListItemIcon,
  ListItem,
  List
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'gatsby'
import {PortraitContext} from './layout'

const useStyles = makeStyles(theme => ({
  appBar: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'fixed',
    padding: theme.spacing(0, 2),
    top: 'auto',
    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}99, ${theme.palette.secondary.main}99) !important`,
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)',
    transition: 'all  3s ease !important',
    '&:hover': {
      background: `linear-gradient(to bottom right, ${theme.palette.primary.main}99, ${theme.palette.secondary.main}aa) !important`,
      transition: 'all  3s ease !important'
    }
  },
  bottomNavItem: {
    fontSize: '1em'
  },
  listItem: {
    padding: theme.spacing(0, 1, 0, 0)
  },
  listIcon: {
    padding: theme.spacing(0, 0, 0, 1)
  }
}))

const footer = ({menuItems, ...props}) => {
  const classes = useStyles(props)
  const portrait = useContext(PortraitContext)
  return (
    <>
      {!portrait && (
        <Slide in={!portrait} direction='up' timeout={500}>
          <Fade in={!portrait} timeout={300}>
            <AppBar color='secondary' className={classes.appBar}>
              {menuItems.map(toBottomNav(classes))}
            </AppBar>
          </Fade>
        </Slide>
      )}
    </>
  )
}

const toBottomNav = classes => ({link, Icon, route, ...props}, index) => {
  const LinkComponent = ({children}) =>
    route[0] === '/' ? (
      <Link to={route}>{children}</Link>
    ) : (
      <a href={route} target='_blank'>
        {children}
      </a>
    )
  return (
    <LinkComponent>
      <Grow in style={{transformOrigin: '0 0 0'}} timeout={(index + 1) * 200}>
        <Slide direction='up' in style={{transformOrigin: '0 0 0'}} timeout={(index + 1) * 400}>
          <ListItem button>
            <ListItemIcon className={classes.listIcon}>
              <Icon fontSize='small' />
            </ListItemIcon>
            <Slide direction='up' in style={{transformOrigin: '0 0 0'}} timeout={(index + 1) * 200}>
              <ListItemText primary={link} className={classes.listItem} />
            </Slide>
          </ListItem>
        </Slide>
      </Grow>
    </LinkComponent>
  )
}

export default footer
