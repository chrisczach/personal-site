import {Link} from 'gatsby'
import React, {useState, useEffect} from 'react'
import {AppBar} from '@material-ui/core'
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
      <StyledAppBar
        color='primary'
        portrait={portrait}
        style={{
          position: portrait ? 'fixed' : 'sticky',
          bottom: portrait ? 0 : 'auto',
          top: portrait ? 'auto' : 0
        }}
      >
        Header {menuButton}
      </StyledAppBar>
      {menuDrawer}
    </>
  )
}

const StyledAppBar = styled(AppBar)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export default Header
