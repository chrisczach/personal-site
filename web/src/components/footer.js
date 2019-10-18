import React, {useEffect, useState} from 'react'
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

const useStyles = makeStyles(theme => ({
  appBar: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'fixed',
    padding: theme.spacing(0, 2),
    top: 'auto'
  },
  bottomNavItem: {
    fontSize: '1em'
  },
  listItem: {
    padding: theme.spacing(1, 2),
    fontSize: '0.5em'
  }
}))

const footer = ({menuItems, ...props}) => {
  const classes = useStyles(props)
  const [portrait, setPortrait] = useState(true)
  const updateOrientation = () => {
    setPortrait(window.innerWidth < window.innerHeight)
  }

  useEffect(() => {
    updateOrientation()
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)
    return () => {
      window.removeEventListener('resize', updateOrientation)
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [])
  return (
    <>
      {!portrait && (
        <Slide in={!portrait} direction='up' timeout={500}>
          <Fade in={!portrait} timeout={300}>
            <AppBar color='secondary' className={classes.appBar}>
              {menuItems.map(toBottomNav)}
            </AppBar>
          </Fade>
        </Slide>
      )}
    </>
  )
}

const toBottomNav = ({link, Icon, route, ...props}, index) => {
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
            <ListItemIcon>
              <Icon fontSize='small' />
            </ListItemIcon>
            <Slide direction='up' in style={{transformOrigin: '0 0 0'}} timeout={(index + 1) * 200}>
              <ListItemText primary={link} />
            </Slide>
          </ListItem>
        </Slide>
      </Grow>
    </LinkComponent>
  )
}

export default footer
