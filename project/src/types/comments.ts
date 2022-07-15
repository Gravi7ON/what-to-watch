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

type Comments = Comment[]

export default Comments;
