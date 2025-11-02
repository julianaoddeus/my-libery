module.exports = {
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `books`,
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images-books`,
        path: `${__dirname}/src/content/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `favorities`,
        path: `${__dirname}/src/content/animes/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images-favorities`,
        path: `${__dirname}/src/content/images/animes/`,
      },
    },
  ],
};
