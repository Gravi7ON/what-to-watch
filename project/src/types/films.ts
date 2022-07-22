import Comments from '../types/comments';

type Film = {
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  id: number;
  isFavorite: boolean;
  videoLink: string;
  previewVideoLink: string;
}

type FilmId = {
  id: string;
}

type Films = Film[]

type ScreenProps = {
  films: Films;
}

type FilmsCommentsProps = {
  films: Films
  comments: Comments;
}

type FilmTabProps = {
  film: Film;
}

export type {ScreenProps, Film, Films, FilmId, FilmTabProps, FilmsCommentsProps};
