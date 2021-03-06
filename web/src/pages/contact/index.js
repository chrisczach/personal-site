import React from 'react';
import { Paper, makeStyles, fade, lighten } from '@material-ui/core';
import { graphql } from 'gatsby';
// import hexToRgba from 'hex-to-rgba';
import SEO from '../../components/seo';
import ErrorHandlerGraphQL from '../../HOF/errorHandlerGraphQL';
import ContactForm from '../../components/contact-form';
import { ContainerWithHeading } from '../../components/containerWithHeading';

const useStyles = makeStyles(theme => ({
  paper: {
    background: `linear-gradient(to bottom right, ${lighten(
      fade(theme.palette.primary.dark, 0.65),
      0.1,
    )}, ${lighten(fade(theme.palette.primary.dark, 0.75), 0.15)}, ${fade(
      theme.palette.primary.dark,
      0.85,
    )}), linear-gradient(to bottom left, transparent, ${fade(
      theme.palette.primary.dark,
      0.75,
    )}, ${lighten(fade(theme.palette.primary.dark, 0.65), 0.15)})`,
    margin: theme.spacing(3, 2, 2, 2),
    overflow: 'hidden',
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)',
  },
  submit: {
    margin: theme.spacing(2, 0, 1, 0),
  },
}));

const Contact = ({ data, ...props }) => {
  const classes = useStyles(props);
  const { site } = data || {};
  const { page } = data || {};
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <>
      <SEO
        title={page.title}
        description={site.description}
        keywords={site.keywords}
      />
      <ContainerWithHeading heading={page.title} subHeading={page._rawBody}>
        <Paper className={classes.paper} elevation={24}>
          <ContactForm />
        </Paper>
      </ContainerWithHeading>
    </>
  );
};

export const query = graphql`
  query ContactPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "contact" } }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`;

export default ErrorHandlerGraphQL(Contact);
