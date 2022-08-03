import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  receiveFilmsByGenre,
  showMoreFilms,
  setActiveFilmTab,
  loadFilms,
  requireAuthorization,
  setError,
  setDataLoadedStatus,
  loadCurrentFilm,
  loadSimilarFilms,
  loadComments
} from './action';
import {Films, Film} from '../types/films';
import {ALL_GENRES, AMOUNT_FILMS_PER_STEP, AuthorizationStatus, OVERVIEW_TAB} from '../const';
import {getFilteredFilmsByGenre} from '../utils';
import Comments from '../types/comments';

type InitalState = {
  genreTab: string;
  movies: Films;
  moviesByGenre: Films;
  currentMovie: Film;
  movieComments: Comments;
  similarMovies: Films
  filmsPerStep: number;
  activeFilmTab: string;
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitalState = {
  genreTab: ALL_GENRES,
  movies: [],
  moviesByGenre: [],
  currentMovie: {} as Film,
  movieComments: [],
  similarMovies: [],
  filmsPerStep: AMOUNT_FILMS_PER_STEP,
  activeFilmTab: OVERVIEW_TAB,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: true
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genreTab = action.payload;
      state.filmsPerStep = AMOUNT_FILMS_PER_STEP;
    })
    .addCase(receiveFilmsByGenre, (state) => {
      state.moviesByGenre = getFilteredFilmsByGenre(state.genreTab, state.movies);
    })
    .addCase(showMoreFilms, (state, action) => {
      state.filmsPerStep = action.payload;
    })
    .addCase(setActiveFilmTab, (state, action) => {
      state.activeFilmTab = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.movies = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentMovie = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarMovies = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.movieComments = action.payload;
    });
});

export {reducer};
