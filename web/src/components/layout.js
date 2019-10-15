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
    <Grow in style={{transformOrigin: '0 0 0'}} timeout={150}>
      <Box component='div'>{children}</Box>
    </Grow>
    <Footer />
  </ThemeProvider>
)

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
  {link: 'Contact', Icon: ContactMailRounded, route: '/contact/', title: 'Contact Me'}
]
export default Layout
