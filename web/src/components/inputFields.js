import React from 'react'
import { TextField, Fade, Slide } from '@material-ui/core'

const inputFields = [
  {label: 'Full Name', placeholder: 'Enter Name Here', required: true},
  {label: 'Email Address', placeholder: 'Enter Email Here', required: true},
  {label: 'Phone Number', placeholder: 'Enter Phone Number Here', required: false},
  {label: 'Subject', placeholder: 'Enter Message Subject Here', required: false},
  {label: 'Message', placeholder: 'Enter Mesage Body Here', required: true, rows: 4}
]

const toFields = ({label, placeholder, required, rows}, index) => (
  <Fade in timeout={900 * index} mountOnEnter unmountOnExit>
    <Slide in direction='up' timeout={index * 300 + 300}>
      <TextField
        variant='outlined'
        {...{label, placeholder, required}}
        inputProps={{
          'aria-label': label
        }}
        margin='normal'
        {...{multiline: rows !== 0}}
      />
    </Slide>
  </Fade>
)

export const formInputComponents = inputFields.map(toFields)
