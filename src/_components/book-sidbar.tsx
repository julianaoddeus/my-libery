import * as React from "react"
import { Link } from "gatsby"
import { BookOpen, Home, Library, Search } from "lucide-react"


export default function BookSidebar  () {
  return ( 
        <aside className="w-64 bg-sidebar flex flex-col justify-between text-sidebar-foreground border-r border-sidebar-border h-screen">
          {/* Topo */}
          <div className="p-6 flex flex-col gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-purple-500" />
              <h1 className="text-2xl font-bold text-balance">BookSpot</h1>
            </div>

            {/* Navegação */}
            <nav className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-3 pl-2 hover:text-purple-500 transition-colors">
                <Home className="h-5 w-5" />
                Catálogo
              </Link>
              <Link to="/" className="flex items-center gap-3 pl-2 hover:text-purple-500 transition-colors">
                <Search className="h-5 w-5" />
                Comentários
              </Link>
              <Link to="/" className="flex items-center gap-3 pl-2 hover:text-purple-500 transition-colors">
                <Library className="h-5 w-5" />
                Minha Biblioteca
              </Link>
            </nav>
          </div>

          {/* Rodapé */}
          <div className="border-t border-sidebar-border p-6">
            <div className="text-xs text-muted-foreground flex flex-col gap-1">
              <p>Catálogo de Livros</p>
              <p>Explore e comente</p>
            </div>
          </div>
        </aside>
  )
}

