export default {
  name: 'portraitSnippet',
  title: 'Portrait Snippet',
  description: 'Snippet with portrait and landscape options',
  type: 'object',
  fields: [
    {
      name: 'portrait',
      title: 'Portrait',
      type: 'simplePortableText',
    },
    {
      name: 'landscape',
      title: 'Landscape',
      type: 'simplePortableText',
    },
  ],
};
