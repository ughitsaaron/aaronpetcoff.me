module.exports = {
  siteMetadata: {
    title: 'aaron petcoff | software engineer | brooklyn',
    description:
      'aaron petcoff is a software engineer living in brooklyn, new york',
    author: '@ughitsaaron',
    siteUrl: 'https://crimes.cool'
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-image',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images/uploads`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs'
          }
        ]
      }
      //     {
      //       resolve: 'gatsby-remark-images',
      //       options: {
      //         maxWidth: 580
      //       }
      //     }
      //   ]
      // }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-graphql-codegen',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-47847770-2'
      }
    }
  ]
};
