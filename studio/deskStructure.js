import S from '@sanity/desk-tool/structure-builder';
import MdSettings from 'react-icons/lib/md/settings';

const hiddenDocTypes = listItem =>
  ![
    'techCategory',
    'tech',
    'person',
    'page',
    'project',
    'siteSettings',
  ].includes(listItem.getId());

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        )
        .icon(MdSettings),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Tech Categories')
        .schemaType('techCategory')
        .child(S.documentTypeList('techCategory').title('Tech Categories')),
      S.listItem()
        .title('Languages / Frameworks')
        .schemaType('tech')
        .child(S.documentTypeList('tech').title('Languages / Frameworks')),

      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
