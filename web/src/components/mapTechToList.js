import React from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  ListItemIcon,
  ListItem,
  ListItemText,
  Zoom,
  Fade,
  Grow,
  Slide,
  Box,
  Button
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Img from 'gatsby-image'

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(1, 3)
  },
  logo: {
    width: '40%'
  },
  listItem: {
    padding: theme.spacing(1),
    margin: 0
  },
  listText: {
    padding: 0,
    margin: 0
  },
  listIcon: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center'
  }
}))
const MapTechToList = ({tech, ...props}) => {
  const classes = useStyles(props)
  return (
    <>
      {tech.map(({category, tech}) => {
        return (
          <Box className={classes.wrapper}>
            <Typography variant='subtitle1'>{category}</Typography>
            {tech.map(({title, description, logo: {asset: {fluid}}}) => {
              return (
                <ListItem className={classes.listItem}>
                  <ListItemIcon className={classes.listIcon}>
                    <Img fluid={fluid} className={classes.logo} />
                  </ListItemIcon>

                  <ListItemText primary={title} className={classes.listText} />
                </ListItem>
              )
            })}
          </Box>
        )
      })}
    </>
  )
}

export default MapTechToList
