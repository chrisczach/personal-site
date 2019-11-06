export default {
  name: 'portraitSnippet',
  title: 'Portrait Snippet',
  description: 'Snippet with portrait and landscape options',
  type: 'object',
  fields: [
    {
      name: 'portrait',
      title: 'Portrait',
      type: 'projectPortableText',
    },
    {
      name: 'landscape',
      title: 'Landscape',
      type: 'projectPortableText',
    },
  ],
};
