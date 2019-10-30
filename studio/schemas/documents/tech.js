export default {
  name: 'tech',
  type: 'document',
  title: 'Languages / Frameworks',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'category',
      type: 'reference',
      title: 'About me Tech Category',
      to: { type: 'techCategory' },
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
    },
    {
      name: 'experience',
      type: 'number',
      description: 'From 1 to 5, floats allowed',
      title: 'Experience',
      validation: Rule =>
        Rule.min(1)
          .max(5)
          .precision(1),
    },
    {
      name: 'description',
      type: 'simplePortableText',
      title: 'Description',
    },
    {
      name: 'sort',
      type: 'number'
    }
  ],
};
