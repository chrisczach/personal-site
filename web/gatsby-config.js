// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});
const proxy = require('http-proxy-middleware');
const clientConfig = require('./client-config');

const token = process.env.SANITY_READ_TOKEN;

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    );
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/containers/layout.js`),
      },
    },
    `gatsby-plugin-force-trailing-slashes`,
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: 'gatsby-source-sanity',

      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chris Czach - Front End Developer`,
        short_name: `ChrisCzachDeveloper`,
        icon: `src/images/icon.png`,
        start_url: `/`,
        background_color: `#2E253A`,
        theme_color: `#585246`,
        display: `standalone`,
      },
    },
     `gatsby-plugin-remove-serviceworker`, // remove for development
    // `gatsby-plugin-offline`, // add back in when deployed
  ],
};
