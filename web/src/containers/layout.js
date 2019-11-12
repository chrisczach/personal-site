import { graphql, StaticQuery } from 'gatsby';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../styles/theme';
import Layout from '../components/layout';
import Splash from '../components/splash';

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
  }
`;

const LayoutContainer = props => {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => {
    setShowNav(true);
  };
  const handleHideNav = () => {
    setShowNav(false);
  };

  const [showSplash, setShowSplash] = useState(isWindow());
  const hideSplash = () => setShowSplash(false);

  useEffect(() => {
    if (showSplash) {
      setTimeout(hideSplash, 2000);
      window.addEventListener('scroll', hideSplash);
      return () => window.removeEventListener('scroll', hideSplash);
    }
  }, [showSplash]);

  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data',
          );
        }
        return (
          <ThemeProvider theme={theme}>
            <Layout
              {...props}
              showSplash={showSplash}
              showNav={showNav}
              siteTitle={data.site.title}
              onHideNav={handleHideNav}
              onShowNav={handleShowNav}
            />
            <Splash show={showSplash} hideSplash={hideSplash} />
          </ThemeProvider>
        );
      }}
    />
  );
};

export const isWindow = () => {
  let answer;
  try {
    if (window) answer = true;
  } catch (e) {
    answer = false;
  }
  return answer;
};

export default LayoutContainer;
