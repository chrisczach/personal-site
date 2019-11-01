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

  const [showSplash, setShowSplash] = useState(!!window);
  const hideSplash = () => setShowSplash(false);

  useEffect(() => {
    if ( showSplash ) {
      setTimeout( hideSplash, 4000 )
      window.addEventListener( 'scroll', hideSplash )
      return ()=> window.removeEventListener('scroll', hideSplash)
    };
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
            <Splash show={showSplash} hideSplash={hideSplash} />

            <Layout
              {...props}
              showNav={showNav}
              siteTitle={data.site.title}
              onHideNav={handleHideNav}
              onShowNav={handleShowNav}
            />
          </ThemeProvider>
        );
      }}
    />
  );
};

export default LayoutContainer;
