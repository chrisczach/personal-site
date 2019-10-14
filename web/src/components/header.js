import {Link} from 'gatsby'
import React, {useState, useEffect} from 'react'
import {AppBar} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import Nav from './nav'

const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => {
  const [portrait, setPortrait] = useState(false)
  const updateOrientation = () => {
    setPortrait(window.innerWidth < window.innerHeight)
  }

  useEffect(() => {
    updateOrientation()
    window.addEventListener('resize', updateOrientation)
    return () => {
      window.removeEventListener('resize', updateOrientation)
    }
  }, [])
  return (
    <StyledAppBar position='fixed' color='primary' portrait={portrait}>
      Header <Nav portrait={portrait} />
    </StyledAppBar>
  )
}

const StyledAppBar = styled(({portrait, ...others}) => <AppBar {...others} />)({
  bottom: ({portrait}) => (portrait ? 0 : 'auto'),
  top: ({portrait}) => (portrait ? 'auto' : 0)
})

export default Header
