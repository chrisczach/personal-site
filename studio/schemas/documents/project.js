export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
        {
      name: 'sort',
      type: 'number',
      title: 'Sort Order',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'simplePortableText',
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
    },
    {
      name: 'repo',
      title: 'Repository Link',
      type: 'url',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure',
    },
    {
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'figure',
    },
    {
      name: 'tech',
      title: 'Languages / Frameworks',
      type: 'array',
      of: [{ type: 'techList' }],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      media: 'mainImage',
    },
    prepare({ title = 'No title', slug = {}, media }) {
      const path = `/projects/${slug.current}/`;
      return {
        title,
        media,
        subtitle: path,
      };
    },
  },
};
