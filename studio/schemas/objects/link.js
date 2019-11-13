export default {
  name: 'link',
  type: 'object',
  title: 'External link',
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'URL',
      validation: Rule =>
        Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean',
    },
    {
      name: 'linkName',
      type: 'string',
      title: 'Link Name',
      description: 'not needed for annotations',
    },
  ],
};
