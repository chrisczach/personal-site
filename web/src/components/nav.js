import React, {useState} from 'react'
import {SwipeableDrawer, Button} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'

const Nav = ({portrait}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = setTo => () => setOpen(setTo)
  return (
    <>
      <Button variant='contained' onClick={handleOpen(!open)}>
        Menu
      </Button>
      <StyledDrawer
        anchor={portrait ? 'bottom' : 'right'}
        open={open}
        onOpen={handleOpen(true)}
        onClose={handleOpen(false)}
      >
        <div>Test</div>
      </StyledDrawer>
    </>
  )
}

const StyledDrawer = styled(SwipeableDrawer)({})

export default Nav
