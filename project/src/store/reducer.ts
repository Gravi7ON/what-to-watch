import {createReducer} from '@reduxjs/toolkit';
import {
  loadFilms,
  requireAuthorization,
  setError,
  setDataLoadedStatus,
  loadCurrentFilm,
  loadSimilarFilms,
  loadComments,
  postComment
} from './action';
import {Films, Film} from '../types/films';
import {AuthorizationStatus} from '../const';
import {Comments} from '../types/comments';

type InitalState = {
  movies: Films;
  currentMovie: Film;
  movieComments: Comments;
  similarMovies: Films;
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitalState = {
  movies: [],
  currentMovie: {} as Film,
  movieComments: [],
  similarMovies: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: true
};

const reducer = createReducer(initialState, (builder) => {
  builder
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
    })
    .addCase(postComment, (state, action) => {
      state.movieComments = action.payload;
    });
});

export {reducer};
