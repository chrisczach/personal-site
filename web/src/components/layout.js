import React from 'react'
import Header from './header'
import Footer from './footer'
import '../styles/globals.css'
import {
  FormatListBulletedRounded,
  ContactMailRounded,
  WorkRounded,
  DeveloperModeRounded,
  HomeRounded
} from '@material-ui/icons/'
import styles from './layout.module.css'

import {ThemeProvider} from '@material-ui/core/styles'
import {CssBaseline, Box, Grow} from '@material-ui/core'
import theme from '../styles/theme'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle, location}) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header
      location={location}
      menuItems={menuItems}
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
    />
    <Grow in style={{transformOrigin: '0 0 0'}} timeout={200}>
      <Box component='div'>
        {children}
        <Footer />
      </Box>
    </Grow>
  </ThemeProvider>
)

const menuItems = [
  {text: 'Home', Icon: HomeRounded, route: '/'},
  {text: 'About', Icon: FormatListBulletedRounded, route: '/about'},
  {text: 'Experience', Icon: WorkRounded, route: '/work'},
  {text: 'Portfolio', Icon: DeveloperModeRounded, route: '/portfolio'},
  {text: 'Contact', Icon: ContactMailRounded, route: '/contact'}
]
export default Layout
