import React, { useContext, useState } from 'react';
import { AppBar, Typography, Toolbar, Fade, Slide } from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';
import { useTransition, animated, config } from 'react-spring';
import nav from './nav';
import { PortraitContext } from './layout';

const useStyles = portrait =>
  makeStyles(theme => ({
    header: {
      minHeight: 0,
      position: 'fixed',
      bottom: portrait ? 0 : 'auto',
      top: portrait ? 'auto' : 0,
      background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}99, ${theme.palette.primary.main}99) !important`,
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      transition: 'all  1s ease !important',
      '&:hover': {
        background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}aa, ${theme.palette.primary.main}be) !important`,
        transition: 'all  1s ease !important',
      },
    },
  }));

const Header = ({
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  menuItems,
  ...props
}) => {
  const portrait = useContext(PortraitContext);
  const { menuButton, menuDrawer } = nav({ portrait, menuItems });
  const classes = useStyles(portrait)(props);
  const [items, set] = useState([]);
  const transitions = useTransition(items, item => item.key, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 5000,
    config: config.molasses,
  });

  if (items.length === 0)
    set(
      'front end developer'.split('').map((text, key) => ({
        text,
        key,
      })),
    );
  return (
    <>
      <Slide in direction="down" timeout={500}>
        <Fade in timeout={250}>
          <AppBar color="primary" className={classes.header}>
            <StyledToolbar>
              <Fade in mountOnEnter unmountOnExit timeout={500}>
                <Typography variant="h6">
                  Chris Czach{' '}
                  {!portrait && (
                    <span style={{ opacity: 0.5 }}>
                      {transitions.map(({ item, props, key }) => (
                        <AnimatedText
                          variant="inherit"
                          style={{
                            ...props,
                            display: 'inline',
                            margin: 0,
                            padding: 0,
                          }}
                          key={key}
                        >
                          {item.text}
                        </AnimatedText>
                      ))}
                    </span>
                  )}
                </Typography>
              </Fade>
              {menuButton}
            </StyledToolbar>
          </AppBar>
        </Fade>
      </Slide>
      {menuDrawer}
    </>
  );
};

const AnimatedText = animated(Typography);

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  minHeight: 0,
  padding: theme.spacing(0,0,0,2),
  flexDirection: 'row',
  justifyContent: 'space-between',
  background: 'transparent',
  alignItems: 'center',
}));

export default Header;
