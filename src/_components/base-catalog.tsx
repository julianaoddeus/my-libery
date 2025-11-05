import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"
import BaseCard from "./base-card"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { useState } from "react"
import BaseDetail from "./base-detail"

interface ICatalog {
  id: string
  title: string
  author: string
  year: number
  pages: number
  duration: string
  mediaType: string
  synopsis: string
  cover: IGatsbyImageData
  
}

interface ICatalogProps {
  catalog: ICatalog[]
  description?: string
}

export default function BaseCatalog  ({ catalog, description }: ICatalogProps) {
  const [selectedItem, setSelectedItem] = useState<ICatalog | null>(null);  
  const [searchQuery, setSearchQuery] = useState("");  

const filteredCatalog = catalog.filter((item) =>
  item.title.toLowerCase().includes(searchQuery ? searchQuery.toString().toLowerCase() : "") ||
  item.author.toLowerCase().includes(searchQuery ? searchQuery.toString().toLowerCase() : "")
);
  
  return (
     <main className="flex-1 overflow-y-auto">        
          {selectedItem 
            ? (<BaseDetail baseDefault={selectedItem} onBack={() => setSelectedItem(null)}/>)             
            : (
            <div className="p-8">
            {/* Hero Section */}
            <div className="mb-8 bg-linear-to-b from-primary/20 to-transparent rounded-lg p-8">
              <h2 className="text-5xl font-bold mb-4 text-balance">Onde cada título é uma experiência</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                {description}
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

            {/* Books Grid */}
            <div className="pt-6">
              <h3 className="text-2xl font-bold mb-6 border-b border-b-gray-800 border-solid">Meus Favoritos</h3>
               <span className="border-t border-gray-300 border-dashed"></span>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               { filteredCatalog.map((bk) => (
                <BaseCard key={bk.id} card={bk} onClick={() => setSelectedItem(bk)} />
               ))}
                
              </div>
            </div>
          </div>
          )}
       
      </main>
  )
}

export const Head = () => <title>Catálogo</title>