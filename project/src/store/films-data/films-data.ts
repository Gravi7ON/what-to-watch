import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {Film} from '../../types/films';
import {FilmsData} from '../../types/state';
import {fetchCurentFilmAction, fetchFilmsAction, postCommentAction} from '../api-actions';

const initialState: FilmsData = {
  movies: [],
  currentMovie: {} as Film,
  movieComments: [],
  similarMovies: [],
  isDataLoaded: true
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
      .addCase(fetchCurentFilmAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCurentFilmAction.fulfilled, (state, action) => {
        state.currentMovie = action.payload?.currentFilm;
        state.similarMovies = action.payload?.similarFilms;
        state.movieComments = action.payload?.filmComments;
        state.isDataLoaded = false;
      })
      .addCase(fetchCurentFilmAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.movieComments = action.payload;
      })
      .addCase(postCommentAction.rejected, () => {
        throw new Error('need to cancel transition to sign in');
      });
  }
});
