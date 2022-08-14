import {store} from '../store/store';
import {AuthorizationStatus} from '../const';
import {Film, Films} from './films';
import {Comments} from './comments';

type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

type FilmsData = {
  movies: Films;
  favorites: Films | undefined;
  currentMovie: Film | undefined;
  promoFilm: Film | undefined;
  movieComments: Comments | undefined;
  similarMovies: Films | undefined;
  isDataLoaded: boolean;
  isFilmLoaded: boolean;
  isFavoritesLoaded: boolean;
}

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type {State, AppDispatch, UserProcess, FilmsData};

