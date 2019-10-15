import React from 'react'
import {SendRounded, CloseRounded} from '@material-ui/icons/'
import {Container, Paper, Typography, TextField, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 2)
  },
  heading: {
    padding: theme.spacing(1, 2)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2)
  },
  input: {
    margin: theme.spacing(2)
  },
  inputFocused: {
    background: 'inherit !important !imporant'
  }
}))

const Contact = props => {
  const classes = useStyles(props)
  return (
    <Container maxWidth='md' className={classes.container}>
      <Typography variant='h2' color='primary' className={classes.heading}>
        Contact Me
      </Typography>
      <Paper component='form' className={classes.paper} autocomplete='off'>
        <TextField
          margin='normal'
          required
          variant='outlined'
          label='Full Name'
          placeholder='Enter Name Here'
          className={classes.input}
          inputProps={{
            'aria-label': 'Full Name'
          }}
        />
        <TextField
          variant='outlined'
          required
          margin='normal'
          className={classes.input}
          label='Email Address'
          placeholder='Enter Email Here'
          inputProps={{
            'aria-label': 'Email'
          }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          label='Subject'
          className={classes.input}
          placeholder='End Subject Here'
          inputProps={{
            'aria-label': 'Subject'
          }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          label='Message Body'
          multiline
          className={classes.input}
          placeholder='Message Body Here'
          inputProps={{
            'aria-label': 'Body'
          }}
        />
        <Button color='primary' size='large' variant='contained' startIcon={<SendRounded />}>
          Send Message
        </Button>
      </Paper>
    </Container>
  )
}

export default Contact
