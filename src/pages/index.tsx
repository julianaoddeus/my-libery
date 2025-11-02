import * as React from "react"
import BaseSidebar from "../_components/base-sidebar"
import BaseCatalog from "../_components/base-catalog"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
export const query = graphql`
  query BaseQuery {
    allMdx(filter: { internal: { contentFilePath: { regex: "/favorities/" } } }) {
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
export default function IndexPage  ({ data }: { data: any }) {  
  const defaultLayout = data.allMdx.nodes.map((node: any) => ({
    id: node.frontmatter.id,
    title: node.frontmatter.title,
    author: node.frontmatter.author,
    year: node.frontmatter.year,
    pages: node.frontmatter.pages,
    duration: node.frontmatter.duration,
    mediaType: node.frontmatter.mediaType,    
    cover:  getImage(node.frontmatter.cover.childImageSharp),
    synopsis: node.frontmatter.synopsis,  
  }))  
  return (    
    <div className="flex h-screen bg-background text-foreground">      
       <BaseSidebar />   
       <BaseCatalog catalog={defaultLayout} description="Um catálogo de emoções em cada história."/>
    </div>
  )
}

export const Head = () => <title>PlotPoint</title>