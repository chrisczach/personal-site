import {Link} from 'gatsby'
import React, {useState, useEffect, useContext} from 'react'
import {AppBar, Typography, Toolbar, Fade, Slide} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import nav from './nav'
import {PortraitContext} from './layout'
const Header = ({onHideNav, onShowNav, showNav, siteTitle, menuItems, location: {pathname}}) => {
  const portrait = useContext( PortraitContext )
  const currentPage = menuItems.find(({route}) => route === pathname)
  const {menuButton, menuDrawer} = nav({portrait, menuItems})
  
  return (
    <>
      <Slide in direction='down' timeout={500}>
        <Fade in timeout={250}>
          <AppBar
            color='secondary'
            style={{
              position: 'fixed',
              bottom: portrait ? 0 : 'auto',
              top: portrait ? 'auto' : 0
            }}
          >
            <StyledToolbar>
              <Fade in mountOnEnter unmountOnExit timeout={500}>
                <Typography variant='h6'>
                  Chris Czach {!portrait && <span style={{opacity: 0.5}}>Front End Developer</span>}
                </Typography>
              </Fade>
              {menuButton}
            </StyledToolbar>
          </AppBar>
        </Fade>
      </Slide>
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
