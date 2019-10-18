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
          <Fade in={!portrait} timeout={250}>
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
  return (
    <Link to={route}>
      <Grow in style={{transformOrigin: '0 0 0'}} timeout={index * 150}>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <Slide direction='up' in style={{transformOrigin: '0 0 0'}} timeout={index * 150 + 50}>
            <ListItemText primary={link} />
          </Slide>
        </ListItem>
      </Grow>
    </Link>
  )
}

export default footer
