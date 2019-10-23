export default {
  type: 'object',
  name: 'techList',
  title: 'Tech List',
  fields: [
    {
      title: 'Category',
      name: 'category',
      type: 'string',
    },
    {
      name: 'tech',
      title: 'Languages / Frameworks',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tech' } }],
    },
  ],
  preview: {
    select: {
      category: 'category',
      tech: 'tech',
    },
    prepare(data) {
      return {
        ...data,
        title: data.category,
        // subtitle: data.tech.map(field => JSON.stringify(field.title)).join(', ')
      };
    },
  },
};
