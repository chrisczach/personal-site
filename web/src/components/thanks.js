import React, {useEffect, useState} from 'react'
import {TextField, Fade, Slide, makeStyles, Button, Typography, Box, Paper} from '@material-ui/core'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {SendRounded} from '@material-ui/icons'
import {navigate} from 'gatsby'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2)
  },
  submit: {
    margin: theme.spacing(2, 0, 1, 0)
  },
  submitted: {
    margin: theme.spacing(2, 4, 8, 4)
  }
}))

const ThanksSuccess = ({formValues, ...props}) => {
  const classes = useStyles(props)

  return (
    <Box className={classes.form}>
      <Fade in timeout={1000}>
        <Box className={classes.submitted}>
          <Typography variant='h5'>Thank you, {toTitleCase(formValues.name)}!</Typography>
          <Typography variant='body'>
            I'll respond as soon as possible via email to {formValues.email.toLowerCase()} or by
            phone if a number was provided.{' '}
          </Typography>
        </Box>
      </Fade>
    </Box>
  )
}

const toFields = ({formValues, handleChange, submitted}) => (
  {label, name, placeholder, rows, validators = [], errorMessages = []},
  index
) => (
  <Fade style={{transitionDelay: 500}} in={!submitted} timeout={900 * index} mountOnEnter>
    <Slide in={!submitted} direction='up' timeout={index * 300 + 300}>
      <TextValidator
        // autoComplete={false}
        onChange={handleChange}
        variant='outlined'
        value={formValues[name] || ''}
        {...{label, name, placeholder, validators, errorMessages}}
        inputProps={{
          'aria-label': label
        }}
        margin='normal'
        {...{multiline: rows !== 0}}
      />
    </Slide>
  </Fade>
)

const toTitleCase = str =>
  str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export default ThanksSuccess
