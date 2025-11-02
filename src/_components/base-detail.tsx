import * as React from "react"
import { ArrowLeft, BookOpen, Info, Star } from "lucide-react"
import { GatsbyImage } from "gatsby-plugin-image"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { MediaType } from "../constants/media-types"
import { Input } from "../components/ui/input"

interface IDetail {
  id: string
  title: string
  author: string
  year: number
  pages: number
  mediaType: string
  duration: string
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

interface IDetailProps {
  baseDefault: IDetail  
  onBack: () => void
}
export default function BaseDetail({ baseDefault, onBack }: IDetailProps) {    
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [newComment, setNewComment] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [rating, setRating] = React.useState(5);

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault()
        if (newComment.trim() && userName.trim()) {
        const comment: Comment = {
            id: Date.now().toString(),
            name: userName,
            rating,
            text: newComment,
            date: new Date().toLocaleDateString('pt-BR'),
        }
        setComments([comment, ...comments])
        setNewComment("")
        setUserName("")
        setRating(5)
        }
    }
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
                    image={baseDefault.cover}                     
                    alt={`Capa do livro ${baseDefault.title}`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />  
                </div>
                <div className="flex-1 pb-4">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{baseDefault.mediaType}</p>
                    <h1 className="text-5xl font-bold mb-4 text-balance">{baseDefault.title}</h1>
                    <p className="text-xl text-foreground mb-4">{baseDefault.author}</p>

                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                           {baseDefault.mediaType === MediaType.BOOK ? (
                                <span> {baseDefault.pages} páginas</span>
                                ) : (
                                <span> {baseDefault.duration} </span>
                            )}
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
                <p className="text-muted-foreground leading-relaxed text-pretty">{baseDefault.synopsis}</p>
            </section>
             <section>
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Star className="h-6 w-6  text-purple-500" />
                    Comentários ({comments.length})
                </h2>
               <form 
                    name={`c-${baseDefault.id}`}
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmitComment} 
                    className="mb-8 bg-card p-6 rounded-lg"
                >
                    <input type="hidden" name="form-name" value={`c-${baseDefault.id}`} />
                    <input type="hidden" name="bot-field" />
                    <input type="hidden" name="obra" value={baseDefault.title} />

                    <h3 className="text-lg font-semibold mb-4 text-foreground">Deixe seu comentário</h3>
                    <div className="space-y-4">
                    <Input
                        placeholder="Se identifique"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-background border-border text-foreground"
                        required
                    />
                    <div className="flex items-center gap-4">
                        <label className="text-sm text-muted-foreground">Avaliação:</label>
                        <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                            <Star
                                className={`h-6 w-6 ${star <= rating ? "fill-purple-500  text-purple-500" : "text-muted-foreground"}`}
                            />
                            </button>
                        ))}
                        </div>
                    </div>
                    <Textarea
                        placeholder="Escreva seu comentário..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-32 bg-background border-border text-foreground"
                        required
                    />
                    <Button type="submit" className="bg-purple-500 text-primary-foreground hover:bg-purple-500/90">
                        Publicar Comentário
                    </Button>
                    </div>
                </form>

               <div className="space-y-4">
                    {comments.map((comment) => (
                    <div key={comment.id} className="bg-card p-6 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-foreground">{comment.name}</h4>
                            <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                key={star}
                                className={`h-4 w-4 ${
                                    star <= comment.rating ? "fill-purple-500  text-purple-500" : "text-muted-foreground"
                                }`}
                                />
                            ))}
                            </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-muted-foreground text-pretty">{comment.text}</p>
                    </div>
                    ))}
                </div>
             </section>
         </div>
    </div>
  )
}