import {Link} from 'gatsby'
import React, {useState, useEffect} from 'react'
import {AppBar, Typography, Toolbar} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import nav from './nav'

const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => {
  const [portrait, setPortrait] = useState(false)
  const updateOrientation = () => {
    setPortrait(window.innerWidth < window.innerHeight)
  }

  const {menuButton, menuDrawer} = nav({portrait})

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
      <AppBar
        color='primary'
        portrait={portrait}
        style={{
          position: portrait ? 'fixed' : 'sticky',
          bottom: portrait ? 0 : 'auto',
          top: portrait ? 'auto' : 0
        }}
      >
        <StyledToolbar disableGutters>
          <Typography variant='h6'>Header</Typography>
          {menuButton}
        </StyledToolbar>
      </AppBar>
      {menuDrawer}
    </>
  )
}

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export default Header
