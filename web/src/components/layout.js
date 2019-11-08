import React, { useState, useEffect, createContext, useReducer } from 'react';

import '../styles/globals.css';
import {
  FormatListBulletedRounded,
  ContactMailRounded,
  WorkRounded,
  DeveloperModeRounded,
  HomeRounded,
  GitHub,
} from '@material-ui/icons/';

import { CssBaseline, Box, Fade, Slide } from '@material-ui/core';
import Footer from './footer';
import Header from './header';

import Background from './background';

export const PortraitContext = createContext(false);
export const ScrollContext = createContext(0);
export const ShowSplashContext = createContext(false);
export const CurrentTooltipContext = createContext([]);
export const CurrentTooltipDispatchContext = createContext(false);
const Layout = ({
  children,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  showSplash,
  location,
  ...props
}) => {
  const [portrait, setPortrait] = useState(false);
  const [scroll, setScroll] = useState(0);
  const updateOrientation = () => {
    setPortrait(window.innerWidth < window.innerHeight);
  };
  const [tooltipValue, setTooltipValue] = useReducer(
    (state, value) => value,
    '',
  );
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
    <PortraitContext.Provider value={portrait}>
      <ScrollContext.Provider value={scroll}>
        <ShowSplashContext.Provider value={showSplash}>
          <CurrentTooltipContext.Provider
            value={[tooltipValue, setTooltipValue]}
          >
            <CssBaseline />
            <Header
              showSplash={showSplash}
              menuItems={menuItems}
              siteTitle={siteTitle}
              onHideNav={onHideNav}
              onShowNav={onShowNav}
              showNav={showNav}
            />
            <Fade in timeout={150}>
              <Box style={{ background: 'transparent', overflow: 'hidden' }}>
                {children}
              </Box>
            </Fade>
            <Footer menuItems={menuItems} location={location} />
            <Background />
          </CurrentTooltipContext.Provider>
        </ShowSplashContext.Provider>
      </ScrollContext.Provider>
    </PortraitContext.Provider>
  );
};

const menuItems = [
  { link: 'Home', Icon: HomeRounded, route: '/', title: 'Chris Czach' },
  {
    link: 'About',
    Icon: FormatListBulletedRounded,
    route: '/about/',
    title: 'About Me',
    tooltip: 'Find out more about me here!',
  },
  // {
  //   link: 'Experience',
  //   Icon: WorkRounded,
  //   route: '/work/',
  //   title: 'Work Experience',
  // },
  {
    link: 'Projects',
    Icon: DeveloperModeRounded,
    route: '/projects/',
    title: 'Portfolio / Projects',
    tooltip: `See some of the projects that I've done here!`,
  },
  {
    link: 'GitHub',
    Icon: GitHub,
    route: 'https://github.com/chrisczach',
    title: 'GitHub',
    tooltip: 'Checkout my GitHub',
  },
  {
    link: 'Contact',
    Icon: ContactMailRounded,
    route: '/contact/',
    title: 'Contact Me',
    tooltip: `Come here to say hello!`,
  },
];

export default Layout;
