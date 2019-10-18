import React, {useState, useEffect, createContext} from 'react'
import Header from './header'
import Footer from './footer'

import '../styles/globals.css'
import {
  FormatListBulletedRounded,
  ContactMailRounded,
  WorkRounded,
  DeveloperModeRounded,
  HomeRounded,
  GitHub
} from '@material-ui/icons/'
import styles from './layout.module.css'

import {ThemeProvider} from '@material-ui/core/styles'
import {CssBaseline, Box, Grow} from '@material-ui/core'
import theme from '../styles/theme'
import Background from './background'

export const PortraitContext = createContext(false)

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => {
  const [portrait, setPortrait] = useState(false)
  const updateOrientation = () => {
    setPortrait(window.innerWidth < window.innerHeight)
  }

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
    <ThemeProvider theme={theme}>
      <PortraitContext.Provider value={portrait}>
        <CssBaseline />
        <Header
          menuItems={menuItems}
          siteTitle={siteTitle}
          onHideNav={onHideNav}
          onShowNav={onShowNav}
          showNav={showNav}
        />
        <Background>
          <Grow in style={{transformOrigin: '0 0 0'}} timeout={150}>
            <Box component='div'>{children}</Box>
          </Grow>
        </Background>
        <Footer menuItems={menuItems} />
      </PortraitContext.Provider>
    </ThemeProvider>
  )
}

const menuItems = [
  {link: 'Home', Icon: HomeRounded, route: '/', title: 'Chris Czach'},
  {link: 'About', Icon: FormatListBulletedRounded, route: '/about/', title: 'About Me'},
  {link: 'Experience', Icon: WorkRounded, route: '/work/', title: 'Work Experience'},
  {
    link: 'Portfolio',
    Icon: DeveloperModeRounded,
    route: '/portfolio/',
    title: 'Portfolio / Projects'
  },
  {
    link: 'GitHub',
    Icon: GitHub,
    route: 'https://github.com/chrisczach',
    title: 'GitHub'
  },
  {link: 'Contact', Icon: ContactMailRounded, route: '/contact/', title: 'Contact Me'}
]
export default Layout
