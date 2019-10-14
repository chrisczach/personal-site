import React, {useState} from 'react'
import {
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  Grow
} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import {MenuRounded, CloseRounded} from '@material-ui/icons/'

const nav = ({portrait}) => {
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
          <ListItem button autoFocus onClick={handleOpen(!open)}>
            <ListItemText primary='Chris Czach ' secondary='Front End Developer' />

            <CloseRounded disableGutters fontSize='large' />
          </ListItem>
          <Grow in={open}>
            <ListItem button autoFocus onClick={handleOpen(!open)}>
              <ListItemIcon>
                <MenuRounded fontSize={size} />
              </ListItemIcon>
              <ListItemText primary={'About'} />
            </ListItem>
          </Grow>
          <Grow in={open} style={{transformOrigin: '0 0 0'}} {...(open ? {timeout: 500} : {})}>
            <ListItem button autoFocus onClick={handleOpen(!open)}>
              <ListItemIcon>
                <MenuRounded fontSize={size} />
              </ListItemIcon>
              <ListItemText primary={'Experience'} />
            </ListItem>
          </Grow>
          <Grow in={open} style={{transformOrigin: '0 0 0'}} {...(open ? {timeout: 1000} : {})}>
            <ListItem button autoFocus onClick={handleOpen(!open)}>
              <ListItemIcon>
                <MenuRounded fontSize={size} />
              </ListItemIcon>
              <ListItemText primary={'Portfolio'} />
            </ListItem>
          </Grow>
          <Grow in={open} style={{transformOrigin: '0 0 0'}} {...(open ? {timeout: 1500} : {})}>
            <ListItem button autoFocus onClick={handleOpen(!open)}>
              <ListItemIcon>
                <MenuRounded fontSize={size} />
              </ListItemIcon>
              <ListItemText primary={'Contact'} />
            </ListItem>
          </Grow>
        </StyledList>
      </StyledDrawer>
    )
  }
}

const StyledDrawer = styled(({portrait, ...others}) => <SwipeableDrawer {...others} />)({})
const StyledList = styled(List)({
  minHeight: '50vh',
  minWidth: '25vw'
})

export default nav
