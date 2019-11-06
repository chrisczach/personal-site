import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, meta, keywords, title }) {
  const [animatedTitle, setAnimatedTitle] = useState();

  const scroll = () => {
    // change this
    setAnimatedTitle(state => {
      const [first, ...rest] = state.split(' | ');
      return [...rest, first].join(' | ');
    });
  };

  useEffect(() => {
    const animate = setInterval(scroll, 2000);
    return () => {
      clearInterval(animate);
    };
  }, [scroll]);
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || (data.site && data.site.description) || '';
        const siteTitle = (data.site && data.site.title) || '';
        const siteAuthor =
          (data.site && data.site.author && data.site.author.name) || '';

        if (!animatedTitle)
          setAnimatedTitle(
            title === siteTitle ? title : `👋 ${title} | ${siteTitle} `,
          );

        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={animatedTitle}
            titleTemplate="%s"
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: siteAuthor,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : [],
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      author {
        name
      }
    }
  }
`;
