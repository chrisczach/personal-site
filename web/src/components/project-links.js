import React, {useContext} from 'react'

import {WebRounded, GitHub} from '@material-ui/icons/'
import {
  AppBar,
  Typography,
  Toolbar,
  Fade,
  Slide,
  Box,
  ListItemText,
  Divider,
  Grow,
  ListItemIcon,
  ListItem,
  Popover,
  List
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {PortraitContext} from './layout'

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: portrait ? 'center' : 'flex-end',
      margin: portrait ? 0 : theme.spacing(-8, 0)
    },
    listItem: {
      padding: theme.spacing(0, 1, 0, 0)
    },
    listIcon: {
      padding: theme.spacing(0, 0, 0, 1)
    }
  }))

const ProjectLinks = ({link, repo}) => {
  const portrait = useContext(PortraitContext)
  const classes = useStyles(portrait)()
  return (
    <Box className={classes.wrapper}>
      <a href={link} target='_blank'>
        <ListItem button href={link} target='_blank'>
          <ListItemIcon className={classes.listIcon}>
            <WebRounded fontSize='default' />
          </ListItemIcon>

          <ListItemText primary={'Project'} className={classes.listItem} />
        </ListItem>
      </a>
      <a href={repo} target='_blank'>
        <ListItem button>
          <ListItemIcon className={classes.listIcon}>
            <GitHub fontSize='default' />
          </ListItemIcon>

          <ListItemText primary={'Repository'} className={classes.listItem} />
        </ListItem>
      </a>
    </Box>
  )
}

export default ProjectLinks
