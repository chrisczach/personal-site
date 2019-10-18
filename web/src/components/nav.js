import React, {useState} from 'react'
import {Link} from 'gatsby'
import {
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  Divider,
  Grow,
  Slide
} from '@material-ui/core'
import {styled, useTheme, makeStyles} from '@material-ui/core/styles'
import {MenuRounded, CloseRounded} from '@material-ui/icons/'

const useStyles = makeStyles(theme => ({
  drawer: {
    overflow: 'hidden',
    background: `${ theme.palette.secondary.dark }88`,
    backdropFilter: 'blur(3px)',
    webkitBackdropFilter: 'blur(3px)'
  },
  navBar: {
    overflow: 'hidden',
    padding: theme.spacing(0, 0, 18, 0),
    background: theme.palette.secondary.dark,
    height: '100%'
  },
  close: {
    justifyContent: 'flex-end'
  }
}))

const nav = ({portrait, menuItems, ...props}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = setTo => () => setOpen(setTo)
  const size = (() => (portrait ? 'large' : 'default'))()
  const theme = useTheme()
  const classes = useStyles(props)
  return {
    menuButton: (
      <Button variant='text' onClick={handleOpen(!open)} fullWidth={false} endIcon>
        <MenuRounded fontSize='large' />
      </Button>
    ),
    menuDrawer: (
      <SwipeableDrawer
        className={classes.drawer}
        anchor={portrait ? 'bottom' : 'right'}
        open={open}
        onOpen={handleOpen(true)}
        onClose={handleOpen(false)}
        swipeAreaWidth={50}
      >
        <List className={classes.navBar}>
          <FirstItem
            divider
            button
            autoFocus
            onClick={handleOpen(!open)}
            background={theme.palette.secondary.dark}
          >
            <ListItemText primary='Chris Czach ' secondary='Front End Developer' />
            <ListItemIcon className={classes.close}>
              <CloseRounded fontSize='large' />
            </ListItemIcon>
          </FirstItem>
          {menuItems.map(toMenu(open, handleOpen, size))}
        </List>
      </SwipeableDrawer>
    )
  }
}

const toMenu = (open, handleOpen, size) => ({link, Icon, route}, index) => {
  const LinkComponent = ({children}) =>
    route[0] === '/' ? (
      <Link to={route}>{children}</Link>
    ) : (
      <a href={route} target='_blank'>
        {children}
      </a>
    )
  return (
    <>
      <LinkComponent>
        <Grow
          in={open}
          style={{transformOrigin: '0 0 0'}}
          {...(open ? {timeout: index * 150} : {})}
        >
          <ListItem button autoFocus onClick={handleOpen(!open)}>
            <ListItemIcon>
              <Icon fontSize={size} />
            </ListItemIcon>
            <Slide
              direction='left'
              in={open}
              style={{transformOrigin: '0 0 0'}}
              {...(open ? {timeout: index * 150 + 50} : {})}
            >
              <ListItemText primary={link} />
            </Slide>
          </ListItem>
        </Grow>
      </LinkComponent>
      <Slide
        direction='left'
        in={open}
        style={{transformOrigin: '0 0 0'}}
        {...(open ? {timeout: index * 200 + 150} : {})}
      >
        <Divider variant='inset' component='li' />
      </Slide>
    </>
  )
}

const FirstItem = styled(({background, ...otherProps}) => <ListItem {...otherProps} />)({
  overflow: 'hidden',
  background: ({background}) => background
})

export default nav
