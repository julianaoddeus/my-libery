import * as React from "react"

import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import BaseCatalog from "../_components/base-catalog"
import BaseSidebar from '../_components/base-sidebar';

export const query = graphql`
  query BaseQuery {
    allMdx(filter: { internal: { contentFilePath: { regex: "/animes/" } } }) {
      nodes {
        frontmatter {
          id
          title
          author
          year
          pages
          duration
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
export default function AnimePage  ({ data }: { data: any }) {   
  const defaultLayout = data.allMdx.nodes.map((node: any) => ({
     id: node.frontmatter.id,
     title: node.frontmatter.title,
     author: node.frontmatter.author,
     year: node.frontmatter.year,
     pages: node.frontmatter.pages,
     mediaType: node.frontmatter.mediaType,
     duration: node.frontmatter.duration,
     cover:  getImage(node.frontmatter.cover.childImageSharp),
     synopsis: node.frontmatter.synopsis,
  })) 
  return (
    <div className="flex h-screen bg-background text-foreground">
       <BaseSidebar />
       <BaseCatalog catalog={defaultLayout} description="Esses são meus animes favoritos"/>
    </div>
  )
}

export const Head = () => <title>Animes</title>