import * as React from "react"
import BaseSidebar from "../_components/base-sidebar"
import BaseCatalog from "../_components/base-catalog"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"

export const query = graphql`
  query BaseQuery {
    allMdx(filter: { internal: { contentFilePath: { regex: "/books/" } } }) {
      nodes {
        frontmatter {
          id
          title
          author
          year
          pages
          mediaType
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
export default function BookPage  ({ data }: { data: any }) {
  const defaultLayout = data.allMdx.nodes.map((node: any) => ({    
    id: node.frontmatter.id,
    title: node.frontmatter.title,
    author: node.frontmatter.author,
    year: node.frontmatter.year,
    pages: node.frontmatter.pages,
    mediaType: node.frontmatter.mediaType,
    cover:  getImage(node.frontmatter.cover.childImageSharp),
    synopsis: node.frontmatter.synopsis,

  })) 
  return (
    <div className="flex h-screen bg-background text-foreground">
       <BaseSidebar />
       <BaseCatalog catalog={defaultLayout} description="Esses são meus livros favoritos"/>
    </div>
  )
}

export const Head = () => <title>Livros</title>