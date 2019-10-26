import React, { useState, useEffect, createContext } from 'react';

import '../styles/globals.css';
import {
  FormatListBulletedRounded,
  ContactMailRounded,
  WorkRounded,
  DeveloperModeRounded,
  HomeRounded,
  GitHub,
} from '@material-ui/icons/';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Box, Fade } from '@material-ui/core';
import Footer from './footer';
import Header from './header';
import theme from '../styles/theme';
import Background from './background';

export const PortraitContext = createContext(false);
export const ScrollContext = createContext(0);

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => {
  const [portrait, setPortrait] = useState(false);
  const [scroll, setScroll] = useState(0);
  const updateOrientation = () => {
    setPortrait(window.innerWidth < window.innerHeight);
  };

  const updateScroll = () =>
    requestAnimationFrame(() => {
      const posY = window.scrollY;
      if (scroll !== posY) {
        setScroll(posY);
      }
    });

  useEffect(() => {
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);
    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <PortraitContext.Provider value={portrait}>
        <ScrollContext.Provider value={scroll}>
          <CssBaseline />
          <Header
            menuItems={menuItems}
            siteTitle={siteTitle}
            onHideNav={onHideNav}
            onShowNav={onShowNav}
            showNav={showNav}
          />
          {/* <Background scroll={scroll}> */}
          <Fade in timeout={150}>
            <Box component="div">{children}</Box>
          </Fade>
          {/* </Background> */}
          <Footer menuItems={menuItems} />
        </ScrollContext.Provider>
      </PortraitContext.Provider>
    </ThemeProvider>
  );
};

const menuItems = [
  { link: 'Home', Icon: HomeRounded, route: '/', title: 'Chris Czach' },
  {
    link: 'About',
    Icon: FormatListBulletedRounded,
    route: '/about/',
    title: 'About Me',
  },
  {
    link: 'Experience',
    Icon: WorkRounded,
    route: '/work/',
    title: 'Work Experience',
  },
  {
    link: 'Projects',
    Icon: DeveloperModeRounded,
    route: '/projects/',
    title: 'Portfolio / Projects',
  },
  {
    link: 'GitHub',
    Icon: GitHub,
    route: 'https://github.com/chrisczach',
    title: 'GitHub',
  },
  {
    link: 'Contact',
    Icon: ContactMailRounded,
    route: '/contact/',
    title: 'Contact Me',
  },
];
export default Layout;
