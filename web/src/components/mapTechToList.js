import React, { useContext } from 'react';
import {
  Typography,
  ListItemIcon,
  ListItem,
  ListItemText,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';

import { PortraitContext } from './layout';
import TooltipContent from './tooltip-content';

const useStyles = portrait =>
  makeStyles(theme => ({
    wrapper: {
      padding: theme.spacing(1, 3, 2, 3),
    },
    itemWrapper: {
      display: 'inline-flex',
      flexDirection: portrait ? 'column' : 'row',
      justifyContent: 'flex-start',
      padding: theme.spacing(0, 1, portrait ? 1 : 2, 0),
    },
    logo: {
      width: '40%',
    },
    listItem: {
      padding: theme.spacing(1),
      margin: 0,
    },
    listText: {
      whiteSpace: 'nowrap',
      padding: theme.spacing(0, 2, 0, 0),
    },
    listIcon: {
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    tooltip: {},
  }));
const MapTechToList = ({ tech, ...props }) => {
  const portrait = useContext(PortraitContext);
  const classes = useStyles(portrait)(props);
  return (
    <>
      {tech.map(({ category, tech }) => {
        return (
          <Box className={classes.wrapper}>
            <Typography variant="subtitle1">{category}</Typography>
            <Box className={classes.itemWrapper}>
              {tech.map(
                ({
                  title,
                  description,
                  experience,
                  logo: {
                    asset: { fluid },
                  },
                }) => {
                  return (
                    <TooltipContent { ...{ title, description, experience, fluid }}>
                      <ListItem className={classes.listItem} button>
                        <ListItemIcon className={classes.listIcon}>
                          <Img fluid={fluid} className={classes.logo} />
                        </ListItemIcon>

                        <ListItemText
                          primary={title}
                          className={classes.listText}
                        />
                      </ListItem>
                    </TooltipContent>
                  );
                },
              )}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default MapTechToList;
