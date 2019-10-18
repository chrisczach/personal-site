import React, {useEffect, useState} from 'react'
import {
  TextField,
  Fade,
  Slide,
  makeStyles,
  Button,
  Typography,
  Box,
  LinearProgress
} from '@material-ui/core'
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
    margin: theme.spacing(2, 0, 1, 0),
    background: 'transparent'
  },
  progress: {position: 'absolute', bottom: 0, width: '100%', height: '100%', zIndex: -100}
}))

const ContactForm = props => {
  const classes = useStyles(props)
  const [formValues, setFormValues] = useState({})
  const [sending, setSending] = useState(false)
  const handleChange = ({target: {name, value}}) => {
    setFormValues(state => {
      const newState = {...state}
      newState[name] = value
      return newState
    })
  }

  const handleSubmit = () => {
    setSending(true)
    setTimeout(() => {
      const {name, email, phone} = {...formValues}
      setFormValues({})
      navigate('/contact/thanks/', {state: {name, email, phone}})
      console.log(JSON.stringify(formValues, null, 2))
      setSending(false)
    }, 5000)
  }

  return (
    <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
      <>
        {inputFields.map(toFields({formValues, handleChange, sending}))}
        <Fade in style={{transitionDelay: 550}} timeout={{appear: 600, enter: 600, exit: 200}}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            className={sending ? classes.submitted : classes.submit}
            style={sending ? {pointerEvents: 'none'} : {}}
            endIcon={<SendRounded />}
          >
            <Fade in={sending} style={{transitionDelay: 150}} timeout={300}>
              <LinearProgress color='secondary' className={classes.progress} />
            </Fade>
            {sending ? 'Message Sending' : 'Send Message'}
          </Button>
        </Fade>
      </>
    </ValidatorForm>
  )
}

const toFields = ({formValues, handleChange, sending}) => (
  {label, name, placeholder, rows, validators = [], errorMessages = []},
  index
) => (
  <Fade
    style={{
      transitionDelay: 250,
      opacity: sending ? 0.5 : 1,
      pointerEvents: sending ? 'none' : 'inherit'
    }}
    in
    timeout={900 * index}
    mountOnEnter
  >
    <Slide in direction='up' timeout={index * 150 + 150}>
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

const inputFields = [
  {
    name: 'name',
    label: 'Full Name',
    placeholder: 'Enter Name Here',
    validators: ['required'],
    errorMessages: ['this field is required']
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter Email Here',
    validators: ['required', 'isEmail'],
    errorMessages: ['this field is required', 'email is not valid']
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: 'Enter Phone Number Here'
  },
  {
    name: 'subject',
    label: 'Subject',
    placeholder: 'Enter Message Subject Here'
  },
  {
    name: 'message',
    label: 'Message',
    placeholder: 'Enter Mesage Body Here',
    validators: ['required'],
    errorMessages: ['this field is required'],
    rows: 4
  }
]

const toTitleCase = str =>
  str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export default ContactForm
