import {Link} from 'gatsby'
import React, {useState, useEffect} from 'react'
import {AppBar, Typography, Toolbar, Fade} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import nav from './nav'

const Header = ({onHideNav, onShowNav, showNav, siteTitle, menuItems, location: {pathname}}) => {
  const [portrait, setPortrait] = useState(false)
  console.log()
  const updateOrientation = () => {
    setPortrait(window.innerWidth < window.innerHeight)
  }
  const currentPage = menuItems.find(({route}) => route === pathname)
  const {menuButton, menuDrawer} = nav({portrait, menuItems})

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
        color='secondary'
        portrait={portrait}
        style={{
          position: portrait ? 'fixed' : 'sticky',
          bottom: portrait ? 0 : 'auto',
          top: portrait ? 'auto' : 0
        }}
      >
        <StyledToolbar>
          <Fade in mountOnEnter unmountOnExit timeout={500}>
            <Typography variant='h6'>
              {(currentPage && currentPage.title) || 'Missing Title'}
            </Typography>
          </Fade>
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
