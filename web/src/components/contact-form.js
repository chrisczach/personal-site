import React, {useEffect, useState} from 'react'
import {TextField, Fade, Slide, makeStyles, Button} from '@material-ui/core'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {SendRounded} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2)
  },
  submit: {
    margin: theme.spacing(2, 0, 1, 0)
  }
}))

const ContactForm = props => {
  const classes = useStyles(props)
  const [showSubmit, setShowSubmit] = useState(false)
  const [formValues, setFormValues] = useState({})
  const handleChange = ({target: {name, value}}) => {
    setFormValues(state => {
      const newState = {...state}
      newState[name] = value
      return newState
    })
  }

  const handleSubmit = () => console.log(JSON.stringify(formValues, null, 2))
  useEffect(
    showSubmit => {
      if (!showSubmit) setTimeout(() => setShowSubmit(true), 1000)
    },
    [showSubmit]
  )
  return (
    <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
      {inputFields.map(toFields({formValues, handleChange}))}
      <Fade in={showSubmit} timeout={1000}>
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
    </ValidatorForm>
  )
}

const toFields = ({formValues, handleChange}) => (
  {label, name, placeholder, rows, validators = [], errorMessages = []},
  index
) => (
  <Fade in timeout={900 * index} mountOnEnter unmountOnExit>
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

export default ContactForm
