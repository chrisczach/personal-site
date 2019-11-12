import React from 'react';
import { Box, Typography, Button, Fade } from '@material-ui/core';
import { Link } from 'gatsby';

export const ScreenFrom = classes => ({
  name,
  header,
  content,
  link = null,
  linkText = null,
  ...props
}) => {
  return (
    <Box>
      <Fade in timeout={500} mountOnEnter unmountOnExit>
        <Typography variant="h3" className={classes.heading}>
          {header}
        </Typography>
      </Fade>
      <Fade in timeout={1000} mountOnEnter unmountOnExit>
        <Typography variant="h4" className={classes.content}>
          {content}
        </Typography>
      </Fade>
      <Fade in timeout={1500} mountOnEnter unmountOnExit>
        <Box className={classes.linkWrap}>
          {link &&
            (link.substring(0, 1) === '/' ? (
              <Link to={link} className={classes.contentLink}>
                <Button variant="outlined" className={classes.contentButton}>
                  {linkText}
                </Button>
              </Link>
            ) : (
              <a href={link} target="_blank" className={classes.contentLink}>
                <Button variant="outlined" className={classes.contentButton}>
                  {linkText}
                </Button>
              </a>
            ))}
        </Box>
      </Fade>
    </Box>
  );
};
