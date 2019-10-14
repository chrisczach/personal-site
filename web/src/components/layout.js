import React from 'react'
import Header from './header'
import Footer from './footer'
import '../styles/globals.css'

import styles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => (
  <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div>{children}</div>
    <Footer/>
  </>
)

export default Layout
