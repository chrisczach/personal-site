import React from 'react';
import { Box, Typography, Button, Fade, Grow } from '@material-ui/core';
import { ChevronRightRounded } from '@material-ui/icons';
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
      <Grow
        in
        timeout={250}
        style={{ transformOrigin: '0 0 0' }}
        mountOnEnter
        unmountOnExit
      >
        <Fade in timeout={250} mountOnEnter unmountOnExit>
          <Typography variant="h3" className={classes.heading}>
            {header}
          </Typography>
        </Fade>
      </Grow>
      <Fade in timeout={1500} mountOnEnter unmountOnExit>
        <Typography variant="h4" className={classes.content}>
          {content}
        </Typography>
      </Fade>
      <Fade in timeout={750} mountOnEnter unmountOnExit>
        <Box className={classes.linkWrap}>
          {link &&
            (link.substring(0, 1) === '/' ? (
              <Link to={link} className={classes.contentLink}>
                <Button
                  variant="outlined"
                  className={classes.contentButton}
                  endIcon={<ChevronRightRounded />}
                >
                  {linkText}
                </Button>
              </Link>
            ) : (
              <a href={link} target="_blank" className={classes.contentLink}>
                <Button
                  variant="outlined"
                  className={classes.contentButton}
                  endIcon={<ChevronRightRounded />}
                >
                  {linkText}
                </Button>
              </a>
            ))}
        </Box>
      </Fade>
    </Box>
  );
};
