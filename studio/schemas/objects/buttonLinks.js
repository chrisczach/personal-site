export default {
  name: 'buttonLinks',
  type: 'object',
  title: 'Button Links',
  fields: [
    {
      name: 'link',
      type: 'array',
      of: [{ type: 'internalLink' }, { type: 'link' }],
    },
  ],
};
