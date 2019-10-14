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
import {styled} from '@material-ui/core/styles'
import {MenuRounded, CloseRounded} from '@material-ui/icons/'

const nav = ({portrait, menuItems}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = setTo => () => setOpen(setTo)
  const size = (() => (portrait ? 'large' : 'default'))()
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
      >
        <StyledList>
          <ListItem divider button autoFocus onClick={handleOpen(!open)}>
            <ListItemText primary='Chris Czach ' secondary='Front End Developer' />
            <ListItemIcon>
              <CloseRounded fontSize='large' endIcon />
            </ListItemIcon>
          </ListItem>
          {menuItems.map(toMenu(open, handleOpen, size))}
        </StyledList>
      </StyledDrawer>
    )
  }
}

const toMenu = (open, handleOpen, size) => ({text, Icon, route}, index) => {
  return (
    <>
      <Link to={route}>
        <Grow
          in={open}
          style={{transformOrigin: '0 0 0'}}
          {...(open ? {timeout: index * 150} : {})}
        >
          <StyledListItem button autoFocus onClick={handleOpen(!open)}>
            <ListItemIcon>
              <Icon fontSize={size} />
            </ListItemIcon>
            <Slide
              direction='left'
              in={open}
              style={{transformOrigin: '0 0 0'}}
              {...(open ? {timeout: index * 150 + 50} : {})}
            >
              <ListItemText primary={text} />
            </Slide>
          </StyledListItem>
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
const StyledList = styled(List)({
  minHeight: '50vh',
  minWidth: '25vw',
  overflow: 'hidden'
})

const StyledListItem = styled(ListItem)({overflow: 'hidden'})

export default nav
