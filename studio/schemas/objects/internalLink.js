export default {
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [
        { type: 'page' },
        { type: 'project' },
        // other types you may want to link to
      ],
    },
    {
      name: 'linkName',
      type: 'string',
      title: 'Link Name',
      description: 'optional for annotations',
    },
  ],
};
