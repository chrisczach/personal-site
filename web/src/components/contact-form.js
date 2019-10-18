import React, {useEffect, useState} from 'react'
import {TextField, Fade, Slide, makeStyles, Button, Typography, Box} from '@material-ui/core'
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

const ContactForm = props => {
  const classes = useStyles(props)
  const [formValues, setFormValues] = useState({})
  const handleChange = ({target: {name, value}}) => {
    setFormValues(state => {
      const newState = {...state}
      newState[name] = value
      return newState
    })
  }

  const handleSubmit = () => {
    navigate('/contact/thanks/', {state: formValues})
    console.log(JSON.stringify(formValues, null, 2))
  }

  return (
    <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
      <>
        {inputFields.map(toFields({formValues, handleChange}))}
        <Fade in style={{transitionDelay: 1000}} timeout={{appear: 1000, enter: 1000, exit: 0}}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            className={classes.submit}
            endIcon={<SendRounded />}
          >
            Send
          </Button>
        </Fade>
      </>
    </ValidatorForm>
  )
}

const toFields = ({formValues, handleChange}) => (
  {label, name, placeholder, rows, validators = [], errorMessages = []},
  index
) => (
  <Fade style={{transitionDelay: 500}} in timeout={900 * index} mountOnEnter>
    <Slide in direction='up' timeout={index * 300 + 300}>
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
