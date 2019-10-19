import React, {useEffect, useState, useContext} from 'react'
import {TextField, Fade, Slide, makeStyles, Button, Typography, Box, Paper} from '@material-ui/core'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {SendRounded} from '@material-ui/icons'
import {navigate} from 'gatsby'
import {PortraitContext} from './layout'

const useStyles = portrait =>
  makeStyles(theme => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(3, portrait ? 1 : 2)
    },
    submitted: {
      margin: theme.spacing(2, portrait ? 1 : 4, 12, portrait ? 1 : 4)
    },
    firstLine: {
      margin: theme.spacing(2, portrait ? 1 : 4),
      fontSize: portrait ? '1.5em' : '2em'
    },
    body: {
      margin: theme.spacing(2, portrait ? 1 : 4),
      fontSize: portrait ? '1.25em' : '1.5em'
    },
    thanks: {
      margin: theme.spacing(3, portrait ? 1 : 4),
      fontSize: portrait ? '1.25em' : '1.5em'
    }
  }))

const ThanksSuccess = ({formValues, ...props}) => {
  const portrait = useContext(PortraitContext)
  const classes = useStyles(portrait)(props)
  return (
    <Box className={classes.form}>
      <Fade in timeout={1000}>
        <Box className={classes.submitted}>
          <Typography variant='h5' className={classes.firstLine}>
            Thank you, {toTitleCase(formValues.name)}!
          </Typography>
          <Typography variant='body1' className={classes.body}>
            I'll respond to your message as soon as possible via your email address{' '}
            <span style={{opacity: 0.5, fontStyle: 'italic'}}>
              {formValues.email.toLowerCase()}
            </span>
            {formValues.phone ? ' or by the phone that you provided.' : '.'}
          </Typography>
          <Typography variant='body1' className={classes.thanks}>
            Feel free to give me a call at{' '}
            <a style={{opacity: 0.5, fontStyle: 'italic'}} href='tel:1-714-725-8764'>
              (714) 725-8764
            </a>{' '}
            if that's more your speed.
          </Typography>
          <Typography variant='body1' className={classes.thanks}>
            Thank you,
          </Typography>
          <Typography variant='body1' className={classes.thanks}>
            Chris Czach
          </Typography>
        </Box>
      </Fade>
    </Box>
  )
}

const toTitleCase = str =>
  str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export default ThanksSuccess
