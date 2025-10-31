import * as React from "react"
import { ArrowLeft, BookOpen, FileText, Play, Star } from "lucide-react"
import { GatsbyImage } from "gatsby-plugin-image"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

interface Book {
  id: string
  title: string
  author: string
  year: number
  pages: number
  synopsis: string
  cover: IGatsbyImageData
  
}
interface Comment {
  id: string
  name: string
  rating: number
  text: string
  date: string
}

interface BookDetailProps {
  book: Book
  onBack: () => void
}
export default function BookDetail({ book, onBack }: BookDetailProps) {  
    console.log("books no catalog",book)
    return (
    <div className="min-h-screen">
        <div className="bg-linear-to-b from-primary/30 via-primary/10 to-background p-8">            
            <Button variant="ghost" onClick={onBack} className="mb-3 text-muted-foreground  hover:text-purple-500 transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar
            </Button>           
            <div className="flex gap-8 items-end">
                <div className="relative w-64 h-96 shrink-0 rounded-lg overflow-hidden shadow-2xl">
                <GatsbyImage
                    image={book.cover}                     
                    alt={`Capa do livro ${book.title}`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />  
                </div>
                <div className="flex-1 pb-4">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Livro</p>
                    <h1 className="text-5xl font-bold mb-4 text-balance">{book.title}</h1>
                    <p className="text-xl text-foreground mb-4">{book.author}</p>

                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>{book.pages} páginas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div className="p-8 max-w-5xl">
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-purple-500" />
                    Sinopse
                </h2>
                <p className="text-muted-foreground leading-relaxed text-pretty">{book.synopsis}</p>
            </section>
             <section>
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Star className="h-6 w-6  text-purple-500" />
                    Comentários 
                </h2>
                <form  className="mb-8 bg-card p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Meus comentários</h3>
                    <div className="space-y-4">                        
                         <div className="flex items-center gap-4">
                            <label className="text-sm text-muted-foreground">Avaliação:</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => {}} className="focus:outline-none">
                                    <Star
                                        className="h-6 w-6 fill-purple-500 text-purple-500"
                                    />
                                    </button>
                                ))}
                            </div>
                         </div>
                         <Textarea
                            placeholder="Minha percepção sobre o livro..."
                            value={""}
                            onChange={(e) => {}}
                            className="min-h-32 bg-background border-border text-foreground"
                            required
                        />
                        <Button type="submit" className="bg-purple-500 text-primary-foreground hover:bg-primary/90">
                            Publicar Comentário
                        </Button>
                    </div>
                </form>

                 <div className="space-y-4">
                     <div  className="bg-card p-6 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-foreground">Juliana</h4>
                                <div className="flex gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                        key={star}
                                        className="h-6 w-6 fill-purple-500 text-purple-500"
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="text-sm text-muted-foreground">20/11/2025</span>
                        </div>
                        <p className="text-muted-foreground text-pretty">Um clássico absoluto! A escrita é envolvente e os temas são atemporais.</p>
                     </div>
                 </div>
             </section>
         </div>
    </div>
  )
}