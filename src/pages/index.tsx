import * as React from "react"
import BookSidebar from "../_components/book-sidbar"
import BookCatalog from "../_components/book-catalog"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { IGatsbyImageData } from "gatsby-plugin-image"

export const query = graphql`
  query BooksQuery {
    allMdx {
      nodes {
        frontmatter {
          id
          title
          author
          year
          pages
          synopsis
          cover {
            childImageSharp {
              gatsbyImageData(width: 200, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
export default function IndexPage  ({ data }: { data: any }) {
  const books = data.allMdx.nodes.map((node: any) => ({
    id_principal: node.id,
    id: node.frontmatter.id,
    title: node.frontmatter.title,
    author: node.frontmatter.author,
    year: node.frontmatter.year,
    pages: node.frontmatter.pages,
    cover:  getImage(node.frontmatter.cover.childImageSharp),
    synopsis: node.frontmatter.synopsis,

  })) 
  return (
    <div className="flex h-screen bg-background text-foreground">
       <BookSidebar />
       <BookCatalog books={books}/>
    </div>
  )
}

export const Head = () => <title>Catálogo</title>