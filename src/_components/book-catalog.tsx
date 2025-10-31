import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"
import BookCard from "./book-card"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { useState } from "react"
import BookDetail from "./book-detail"

interface Book {
  id: string
  title: string
  author: string
  year: number
  pages: number
  synopsis: string
  cover: IGatsbyImageData
  
}

interface BookCardProps {
  books: Book[]
 
}

export default function BookCatalog  ({ books }: BookCardProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  
  return (
     <main className="flex-1 overflow-y-auto">
        
          {selectedBook ? (<BookDetail book={selectedBook} onBack={() => setSelectedBook(null)}/>) : (
            <div className="p-8">
            {/* Hero Section */}
            <div className="mb-8 bg-linear-to-b from-primary/20 to-transparent rounded-lg p-8">
              <h2 className="text-5xl font-bold mb-4 text-balance">Descubra sua próxima leitura</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Essa é minha coleção de clássicos da literatura mundial
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar livros ou autores..."
                  value={""}                
                  className="pl-10 bg-card border-border text-foreground"
                />
              </div>
            </div>

            {/* Books Grid */}
            <div className="pt-6">
              <h3 className="text-2xl font-bold mb-6">Meus Favoritos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {books.map((bk) => (
                <BookCard key={bk.id} book={bk} onClick={() => setSelectedBook(bk)} />
               ))}
                
              </div>
            </div>
          </div>
          )}
       
      </main>
  )
}

export const Head = () => <title>Catálogo</title>