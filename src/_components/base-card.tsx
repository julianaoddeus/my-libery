import * as React from "react"
import { Play } from "lucide-react"
import { GatsbyImage } from "gatsby-plugin-image"
import { IGatsbyImageData } from "gatsby-plugin-image"


interface ICard {
  id: string
  title: string
  author: string
  year: number
  pages: number
  duration: string
  synopsis: string
  cover: IGatsbyImageData
  }

interface ICardProps {
  card: ICard
  onClick: () => void

}

export default function BaseCard({ card, onClick }: ICardProps) {  console.log(card); 
    return (
    <div  
      onClick={onClick}    
      className="group cursor-pointer bg-card hover:bg-card/80 rounded-lg p-4 transition-all duration-300 hover:scale-105"
    >
      <div className="relative mb-4 aspect-2/3 overflow-hidden rounded-md bg-muted">
        
        <GatsbyImage
          image={card.cover}
          alt={`Capa do livro ${card.title}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />     
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-purple-500 rounded-full p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Play className="h-6 w-6 text-primary-foreground fill-current " />
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-foreground mb-1 line-clamp-1 text-balance">{card.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-1">{card.author}</p>
      <p className="text-xs text-muted-foreground mt-1">{card.year}</p>
    </div>
  )
}