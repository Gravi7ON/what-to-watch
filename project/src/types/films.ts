import {Comments} from './comments';

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

type FilmTabProps = {
  film: Film;
}

type UpdateFilm = {
  filmId: number;
  status: number;
}

type CurrentFilmData = {
  currentFilm: Film;
  similarFilms: Films;
  filmComments: Comments;
}

type FetchFilms = {
  films: Films;
  promoFilm: Film;
}

type TabEvent = React.MouseEvent<HTMLAnchorElement, MouseEvent> & {target: {tagName: string; textContent: string}}

type EventGenreClick = {preventDefault: () => void; target: {textContent: string}} & React.MouseEvent<HTMLAnchorElement, MouseEvent>

export type {ScreenProps, UpdateFilm, FetchFilms, Film, Films, FilmId, FilmTabProps, TabEvent, EventGenreClick, CurrentFilmData};
