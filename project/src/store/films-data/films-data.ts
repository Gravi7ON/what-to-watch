import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmsData} from '../../types/state';
import {fetchCurrentFilmAction, fetchFilmsAction, postCommentAction} from '../api-actions';

const initialState: FilmsData = {
  movies: [],
  currentMovie: undefined,
  movieComments: [],
  similarMovies: [],
  isDataLoaded: true,
  isFilmLoaded: true
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchCurrentFilmAction.pending, (state) => {
        state.isFilmLoaded = true;
      })
      .addCase(fetchCurrentFilmAction.fulfilled, (state, action) => {
        state.currentMovie = action.payload?.currentFilm;
        state.similarMovies = action.payload?.similarFilms;
        state.movieComments = action.payload?.filmComments;
        state.isFilmLoaded = false;
      })
      .addCase(fetchCurrentFilmAction.rejected, (state) => {
        state.isFilmLoaded = false;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.movieComments = action.payload;
      })
      .addCase(postCommentAction.rejected, () => {
        throw new Error('need to cancel transition to sign in');
      });
  }
});
