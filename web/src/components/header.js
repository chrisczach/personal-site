import {Link} from 'gatsby'
import React, {useState, useEffect, useContext} from 'react'
import {AppBar, Typography, Toolbar, Fade, Slide} from '@material-ui/core'
import {styled, makeStyles} from '@material-ui/core/styles'
import nav from './nav'
import {PortraitContext} from './layout'

const useStyles = portrait =>
  makeStyles(theme => ({
    header: {
      position: 'fixed',
      bottom: portrait ? 0 : 'auto',
      top: portrait ? 'auto' : 0,
      background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}99, ${theme.palette.primary.main}99) !important`,
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      transition: 'all  1s ease !important',
      '&:hover': {
        background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}aa, ${theme.palette.primary.main}be) !important`,
        transition: 'all  1s ease !important'
      }
    }
  }))

const Header = ({
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  menuItems,
  location: {pathname},
  ...props
}) => {
  const portrait = useContext(PortraitContext)
  const currentPage = menuItems.find(({route}) => route === pathname)
  const {menuButton, menuDrawer} = nav({portrait, menuItems})
  const classes = useStyles(portrait)(props)
  return (
    <>
      <Slide in direction='down' timeout={500}>
        <Fade in timeout={250}>
          <AppBar color='primary' className={classes.header}>
            <StyledToolbar>
              <Fade in mountOnEnter unmountOnExit timeout={500}>
                <Typography variant='h6'>
                  Chris Czach {!portrait && <TransitionedTitle title={'Front End Developer'} />}
                </Typography>
              </Fade>
              {menuButton}
            </StyledToolbar>
          </AppBar>
        </Fade>
      </Slide>
      {menuDrawer}
    </>
  )
}

const TransitionedTitle = ({title, ...props}) => {
  const characters = title.split('')
  return (
    <span style={{opacity: 0.5}}>
      {characters.map((char, index) => (
        <Fade in timeout={500 * (index + 1)} style={{transitionDelay: 1500}}>
          <Typography style={{display: 'inline'}} variant='inherit'>
            {char}
          </Typography>
        </Fade>
      ))}
    </span>
  )
}

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  background: 'transparent',
  alignItems: 'center'
}))

export default Header
