import React, {useEffect, useState} from 'react'
import {AppBar, Typography, Toolbar, Fade, Slide} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing( 1, 2 ),
    top: 'auto'
  }
}))

const footer = props => {
  const classes = useStyles(props)
  const [portrait, setPortrait] = useState(true)
  const updateOrientation = () => {
    setPortrait(window.innerWidth < window.innerHeight)
  }

  useEffect(() => {
    updateOrientation()
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)
    return () => {
      window.removeEventListener('resize', updateOrientation)
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [])
  return (
    <>
      {!portrait && (
        <Slide in={!portrait} direction='up' timeout={500}>
          <Fade in={!portrait} timeout={250}>
            <AppBar fixed color='secondary' className={classes.appBar}>
              <Typography variant='body1'> Footer Here</Typography>
            </AppBar>
          </Fade>
        </Slide>
      )}
    </>
  )
}

export default footer
