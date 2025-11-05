import * as React from "react"
import { Link } from "gatsby"
import { Ticket , Home, Library, Film, Clapperboard   } from "lucide-react"
import { ToggleSidebarButton } from "./toggle"
import { useState } from "react";

export default function BaseSidebar  () {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   const toogleSidebar = () => {
     setIsSidebarOpen(!isSidebarOpen);
   }
  return ( 
       <>
          <ToggleSidebarButton isOpen={isSidebarOpen} onClick={toogleSidebar}/>     
            <aside
              className={`${
                isSidebarOpen ? "w-64" : "w-0"
              } bg-sidebar border-r border-sidebar-border flex flex-col justify-between transition-all duration-300 ease-in-out overflow-hidden`}
            >  
            <div className="p-6 flex flex-col gap-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <Ticket  className="h-8 w-8 text-purple-500" />
                <h1 className="text-2xl font-bold text-balance">PlotPoint</h1>
              </div>

              {/* Navegação */}
              <nav className="flex flex-col gap-4">
                <Link to="/" className="flex items-center gap-3 pl-2 hover:text-purple-500 transition-colors">
                  <Home className="h-5 w-5" />
                  Favoritos
                </Link>
                <Link to="/books" className="flex items-center gap-3 pl-2 hover:text-purple-500 transition-colors">
                  <Library className="h-5 w-5" />
                  Livros
                </Link>
                <Link to="/animes" className="flex items-center gap-3 pl-2 hover:text-purple-500 transition-colors">
                  <Clapperboard  className="h-5 w-5" />
                  Animes
                </Link>
                <Link to="/movies" className="flex items-center gap-3 pl-2 hover:text-purple-500 transition-colors">
                  <Film  className="h-5 w-5" />
                  Filmes
                </Link>
              </nav>
            </div>

            {/* Rodapé */}
            <div className="border-t border-sidebar-border p-6">
              <div className="text-xs text-muted-foreground flex flex-col gap-1">
                <p>Catálogo de Livros, Animes e Filmes</p>
                <p>Classificação e comentários</p>
              </div>
            </div>
        </aside>
       </>
  )
}

