import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmsData} from '../../types/state';
import {addFilmToFavoritesAction, fetchCurrentFilmAction, fetchFilmsAction, fetchMyListAction, postCommentAction} from '../api-actions';

const initialState: FilmsData = {
  movies: [],
  favorites: [],
  promoFilm: undefined,
  currentMovie: undefined,
  movieComments: [],
  similarMovies: [],
  isDataLoaded: true,
  isFilmLoaded: true,
  isFavoritesLoaded: false,
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.movies = action.payload.films;
        state.promoFilm = action.payload?.promoFilm;
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
      })
      .addCase(fetchMyListAction.pending, (state) => {
        state.isFavoritesLoaded = true;
      })
      .addCase(fetchMyListAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoaded = false;
      })
      .addCase(fetchMyListAction.rejected, (state) => {
        state.isFavoritesLoaded = false;
      })
      .addCase(addFilmToFavoritesAction.fulfilled, (state, action) => {
        if (!action.payload.isFavorite && state.favorites) {
          const updatedFilmlIndex = state.favorites?.findIndex((updatedFilm) =>
            updatedFilm.id === action.payload.id);

          state.favorites = [
            ...state.favorites.slice(0, updatedFilmlIndex),
            ...state.favorites.slice(updatedFilmlIndex + 1)
          ];
          return;
        }

        state.favorites?.push(action.payload);
      });
  }
});
