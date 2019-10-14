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

const Layout = ( { children, onHideNav, onShowNav, showNav, siteTitle, location }) => (
  <>
    <Header
      location={ location}
      menuItems={menuItems}
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
    />
    <div>{children}</div>
    <Footer />
  </>
)

const menuItems = [
  {text: 'Home', Icon: HomeRounded, route: '/'},
  {text: 'About', Icon: FormatListBulletedRounded, route: '/about'},
  {text: 'Experience', Icon: WorkRounded, route: '/work'},
  {text: 'Portfolio', Icon: DeveloperModeRounded, route: '/portfolio'},
  {text: 'Contact', Icon: ContactMailRounded, route: '/contact'}
]
export default Layout
