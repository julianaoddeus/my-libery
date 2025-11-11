import * as React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import BaseSidebar from "../_components/base-sidebar";
import BaseCatalog from "../_components/base-catalog";
import BaseCard from "../_components/base-card";
import { Play, Search, Sidebar } from "lucide-react";
import { Input } from "../components/ui/input";
import { useState } from "react";

export default function MoviesPage({ data }: { data: any }) {
  const movies = data.allMdx.nodes;
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCatalog = movies.filter((item: any) =>
    item.frontmatter.title.toLowerCase().includes(searchQuery ? searchQuery.toString().toLowerCase() : "") ||
    item.frontmatter.author.toLowerCase().includes(searchQuery ? searchQuery.toString().toLowerCase() : "")
  );

  return (
    <div className=" flex ">
     <BaseSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* ONE Section */}
          <div className="mb-8 bg-linear-to-b from-primary/20 to-transparent rounded-lg p-8">
            <h2 className="text-[28px] md:text-5xl font-bold mb-4 text-balance">Onde cada título é uma experiência</h2>
            <p className="text-sm lg:text-xl text-muted-foreground text-pretty">
              Esses sáo meus filmes favoritos
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar livros ou autores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border text-foreground"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="pt-6">
            <h3 className="text-2xl font-bold mb-6 border-b border-b-gray-800 border-solid">Meus Favoritos</h3>
            <span className="border-t border-gray-300 border-dashed"></span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredCatalog.map((movie: any) => {   
                const image = getImage(movie.frontmatter.cover?.childImageSharp);  
                movie.cover = image as IGatsbyImageData;          
                return (
                  <Link
                    key={movie.id}
                    to={`/movies/${movie.frontmatter.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <BaseCard key={movie.id} card={movie} onClick={() => (null)} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const query = graphql`
  query {
    allMdx(filter: { internal: { contentFilePath: { regex: "/movies/" } } }) {
      nodes {
        id
        frontmatter {
          title
          slug
          year
          author
          cover {
            childImageSharp {
              gatsbyImageData(width: 300)
            }
          }
        }
      }
    }
  }
`;