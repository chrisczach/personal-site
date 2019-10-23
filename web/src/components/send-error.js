import React from 'react';

import {
  TextField,
  Fade,
  Slide,
  makeStyles,
  Button,
  Typography,
  Box,
  Modal,
  Paper,
  LinearProgress,
} from '@material-ui/core';

import { SendRounded, EmailRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    background: `linear-gradient(${theme.palette.primary.main}aa, ${theme.palette.secondary.dark}aa)`,
    padding: theme.spacing(4),
    outline: 'none',
    overflow: 'hidden',
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  body: {
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(4, 1, 1, 1),
  },
}));
const SendError = ({ open, onClose, formValues, retrySend, ...props }) => {
  const classes = useStyles(props);
  return (
    <Modal className={classes.modal} {...{ open, onClose, formValues }}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.header}>
          Send Error
        </Typography>
        <Typography variant="body1" className={classes.body}>
          Sorry {toTitleCase(formValues.name)}, an unexpected error has occured!
        </Typography>
        <Typography variant="body1" className={classes.body}>
          Please try submitting again or send form in via email.
        </Typography>
        <Button
          onClick={retrySend}
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SendRounded />}
        >
          Retry Send
        </Button>
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<EmailRounded />}
          href={`mailto:contact@chrisczach.com?subject=${formValues.subject ||
            'Chris Czach - Contact Form Submission'}&body=${
            formValues.message
          }`}
        >
          Send Via Email
        </Button>
      </Paper>
    </Modal>
  );
};

const toTitleCase = (str = '') =>
  str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
export default SendError;
