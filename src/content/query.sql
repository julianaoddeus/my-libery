query MyQuery {
  allMdx {
    nodes {
      id
      frontmatter {
        id
        title
        author
        year
        pages
        synopsis
        cover {
          childImageSharp {
            gatsbyImageData(width: 200)
          }
        }
      }
    }
  }
}