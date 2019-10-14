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
    return () => {
      window.removeEventListener('resize', updateOrientation)
    }
  }, [])
  return (
    <>
      <StyledAppBar color='primary' portrait={portrait}>
        Header {menuButton}
      </StyledAppBar>
      {menuDrawer}
    </>
  )
}

const StyledAppBar = styled(({portrait, ...others}) => <AppBar {...others} />)({
  display: 'flex',
  position: ({portrait}) => (portrait ? 'fixed' : 'sticky'),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  bottom: ({portrait}) => (portrait ? 0 : 'auto'),
  top: ({portrait}) => (portrait ? 'auto' : 0),
})

export default Header
