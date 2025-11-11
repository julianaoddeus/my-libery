import * as React from "react";
import { graphql, navigate } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { getImage } from "gatsby-plugin-image";
import BaseDetail from "../_components/base-detail";

export const query = graphql`
  query MovieQuery($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        id
        title
        author
        year
        duration
        mediaType
        synopsis
        slug
        cover {
          childImageSharp {
            gatsbyImageData(width: 200, placeholder: BLURRED)
          }
        }
      }
      internal {
        contentFilePath
      }
    }
  }
`;


export default function MovieTemplate({ data,  children}: { data: any, children?: React.ReactNode }) {
  const movie = data.mdx.frontmatter;
  const image =  getImage(movie.cover.childImageSharp);   
  movie.cover = image;
  return (
     <main className="flex-1 overflow-y-auto">            
      <BaseDetail baseDefault={movie} onBack={() => navigate("/movies")} />
      <MDXProvider>
        {children}
      </MDXProvider>    
    </main>
  );
}
