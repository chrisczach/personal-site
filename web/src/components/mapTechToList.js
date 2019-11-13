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
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      padding: theme.spacing(0, 1, 0, 0),
    },
    logo: {
      width: '40%',
    },
    listItem: {
      width: 'auto',
      padding: theme.spacing(1),
      margin: theme.spacing(0, 0, 1, 0),
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
          <Box className={classes.wrapper} key={category}>
            <Typography
              variant="subtitle1"
              key={'category' + category + 'subtitle'}>
              {category}
            </Typography>
            <Box className={classes.itemWrapper} key={'list' + category}>
              {tech.map(
                (
                  {
                    title,
                    description,
                    experience,
                    id,
                    logo: {
                      asset: { fluid },
                    },
                  },
                  index,
                ) => {
                  return (
                    <TooltipContent
                      key={id}
                      {...{ title, description, experience, fluid }}>
                      <ListItem className={classes.listItem} button key={id}>
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
