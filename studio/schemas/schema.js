// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document types
import tech from './documents/tech';
import person from './documents/person';
import project from './documents/project';
import siteSettings from './documents/siteSettings';
import page from './documents/page';
import techCategory from './documents/tech-category';

// Object types
import avatar from './objects/avatar';
import bioPortableText from './objects/bioPortableText';
import figure from './objects/figure';
import projectMember from './objects/projectMember';
import projectPortableText from './objects/projectPortableText';
import simplePortableText from './objects/simplePortableText';
import techList from './objects/techList';
import portraitSnippet from './objects/portraitSnippet.js';
import myCode from './objects/myCode';
import internalLink from './objects/internalLink';
import link from './objects/link';
import buttonLinks from './objects/buttonLinks';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'portfolio',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    portraitSnippet,
    myCode,
    internalLink,
    link,
    bioPortableText,
    avatar,
    figure,
    projectMember,
    projectPortableText,
    simplePortableText,
    techList,
    buttonLinks,
    // The following are document types which will appear
    // in the studio.
    tech,
    techCategory,
    person,
    project,
    page,
    siteSettings,
  ]),
});
