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
  navBar: {
    overflow: 'hidden',
    padding: theme.spacing(0, 0, 18, 0)
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
      <StyledDrawer
        anchor={portrait ? 'bottom' : 'right'}
        open={open}
        onOpen={handleOpen(true)}
        onClose={handleOpen(false)}
        portrait={portrait}
        swipeAreaWidth={50}
      >
        <List className={classes.navBar}>
          <FirstItem
            divider
            button
            autoFocus
            onClick={handleOpen(!open)}
            background={theme.palette.primary.dark}
          >
            <ListItemText primary='Chris Czach ' secondary='Front End Developer' />
            <ListItemIcon className={classes.close}>
              <CloseRounded fontSize='large' />
            </ListItemIcon>
          </FirstItem>
          {menuItems.map(toMenu(open, handleOpen, size))}
        </List>
      </StyledDrawer>
    )
  }
}

const toMenu = (open, handleOpen, size) => ({link, Icon, route}, index) => {
  return (
    <>
      <Link to={route}>
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
      </Link>
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

const StyledDrawer = styled(({portrait, ...others}) => <SwipeableDrawer {...others} />)({
  overflow: 'hidden'
})

const FirstItem = styled(({background, ...otherProps}) => <ListItem {...otherProps} />)({
  overflow: 'hidden',
  background: ({background}) => background
})
const StyledListItem = styled(ListItem)({overflow: 'hidden'})

export default nav
