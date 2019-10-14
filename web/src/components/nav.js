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
      <Grow in={open} style={{transformOrigin: '0 0 0'}} {...(open ? {timeout: index * 350} : {})}>
        <Link to={route}>
          <ListItem button autoFocus onClick={handleOpen(!open)}>
            <ListItemIcon>
              <Icon fontSize={size} />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </Link>
      </Grow>
      <Divider variant='inset' component='li' />
    </>
  )
}

const StyledDrawer = styled(({portrait, ...others}) => <SwipeableDrawer {...others} />)({})
const StyledList = styled(List)({
  minHeight: '50vh',
  minWidth: '25vw'
})

export default nav
