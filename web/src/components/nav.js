import React, {useState} from 'react'
import {
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import {MenuRounded, CloseRounded} from '@material-ui/icons/'

const nav = ({portrait}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = setTo => () => setOpen(setTo)
  const size = (() => (portrait ? 'large' : 'default'))()
  return {
    menuButton: (
      <Button variant='text' onClick={handleOpen(!open)} fullWidth={false}>
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
        <div>
          Close
          <Button variant='text' onClick={handleOpen(!open)} fullWidth>
            <CloseRounded fontSize='large' />
          </Button>
        </div>
        <StyledList>
          <ListItem button autoFocus onClick={handleOpen(!open)}>
            <ListItemIcon>
              <MenuRounded fontSize={size} />
            </ListItemIcon>
            <ListItemText primary={'text'} />
          </ListItem>
          <ListItem button autoFocus onClick={handleOpen(!open)}>
            <ListItemIcon>
              <MenuRounded fontSize={size} />
            </ListItemIcon>
            <ListItemText primary={'text'} />
          </ListItem>
        </StyledList>
      </StyledDrawer>
    )
  }
}

const StyledDrawer = styled(({portrait, ...others}) => <SwipeableDrawer {...others} />)({})
const StyledList = styled(({portrait, ...others}) => <List {...others} />)({
  minHeight: ({portrait}) => ({portrait} ? '50vh' : 'auto')
})

export default nav
