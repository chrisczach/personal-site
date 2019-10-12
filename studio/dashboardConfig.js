export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5da25216a2398590fd70e40d',
                  title: 'Sanity Studio',
                  name: 'personal-site-studio',
                  apiId: '3888929d-a314-43d1-bb51-c24184e53601'
                },
                {
                  buildHookId: '5da25216fc22939fac27626a',
                  title: 'Portfolio Website',
                  name: 'personal-site-web',
                  apiId: '46122ee1-6265-498f-8a22-0476f783af1d'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/chrisczach/personal-site',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://personal-site-web.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
