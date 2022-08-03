type User = {
  id: number
  name: string
}

type Comment = {
  comment: string
  date: string
  id: number
  rating: number
  user: User
}

type UserComment = {
  comment: string
  rating: number
  filmId: number
}


type Comments = Comment[]

export type {Comments, UserComment};
