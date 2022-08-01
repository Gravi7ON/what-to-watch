import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, receiveFilmsByGenre, showMoreFilms, setActiveFilmTab, loadFilms, requireAuthorization, setError, setDataLoadedStatus} from './action';
import {Films} from '../types/films';
import {ALL_GENRES, AMOUNT_FILMS_PER_STEP, AuthorizationStatus, OVERVIEW_TAB} from '../const';

const filterFilmsByGenre = (genre: string, movies: Films): Films => {
  if (genre === ALL_GENRES) {
    return movies;
  }

  const filteredFilms = movies.filter((movie: {genre: string}) => movie.genre === genre);

  return filteredFilms;
};

type InitalState = {
  genreTab: string;
  movies: Films;
  moviesByGenre: Films;
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
      state.moviesByGenre = filterFilmsByGenre(state.genreTab, state.movies);
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
    });
});

export {reducer};
