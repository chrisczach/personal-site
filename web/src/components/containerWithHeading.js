import React, {useContext} from 'react'

import {Container, Paper, Typography, TextField, Zoom, Fade, Slide} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {PortraitContext} from './layout'
const useStyles = ({portrait}) =>
  makeStyles(theme => ({
    container: {
      padding: portrait ? theme.spacing(2) : theme.spacing(10, 2, 2, 2),
      minHeight: '100vh',
    },
    heading: {
      padding: theme.spacing(2, 2, 1, 2)
    },
    subHeading: {
      padding: theme.spacing(2, 2)
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(3, 2)
    }
  }))

export const ContainerWithHeading = ({heading, subHeading, children = null, ...props}) => {
  const portrait = useContext(PortraitContext)
  const classes = useStyles({portrait})(props)
  return (
    <Container maxWidth='md' className={classes.container}>
      <Fade in timeout={150}>
        <Slide in direction='down' timeout={300}>
          <Typography variant='h2' color='textSecondary' className={classes.heading}>
            {heading}
          </Typography>
        </Slide>
      </Fade>
      <Fade in timeout={600}>
        <Zoom in timeout={1200}>
          <Typography variant='subtitle1' color='textPrimary' className={classes.subHeading}>
            {subHeading}
          </Typography>
        </Zoom>
      </Fade>

      {children}
    </Container>
  )
}
