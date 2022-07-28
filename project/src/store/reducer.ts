import {createReducer} from '@reduxjs/toolkit';
import films from '../mock/films';
import {changeGenre, receiveFilmsByGenre, showMoreFilms} from './action';
import {Films} from '../types/films';
import {ALL_GENRES, AMOUNT_FILMS_PER_STEP} from '../const';

const filterFilmsByGenre = (genre: string, movies: Films): Films => {
  if (genre === ALL_GENRES) {
    return movies;
  }

  const filteredFilms = movies.filter((movie: {genre: string}) => movie.genre === genre);

  return filteredFilms;
};

const initialState = {
  genre: ALL_GENRES,
  movies: films,
  filmsPerStep: AMOUNT_FILMS_PER_STEP
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      state.filmsPerStep = AMOUNT_FILMS_PER_STEP;
    })
    .addCase(receiveFilmsByGenre, (state) => {
      state.movies = filterFilmsByGenre(state.genre, films);
    })
    .addCase(showMoreFilms, (state, action) => {
      state.filmsPerStep = action.payload;
    });
});

export {reducer};
