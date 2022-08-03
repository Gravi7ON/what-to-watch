import {createAction} from '@reduxjs/toolkit';
import {Film, Films} from '../types/films';
import {AuthorizationStatus} from '../const';
import Comments from '../types/comments';

const changeGenre = createAction('main/changeGenre', (value: string) => ({
  payload: value
}));

const receiveFilmsByGenre = createAction('main/receiveFilmsByGenre');

const showMoreFilms = createAction('main/showMoreFilms', (value: number) => ({
  payload: value
}));

const setActiveFilmTab = createAction('film/activeFilmTab', (value: string) => ({
  payload: value
}));

const loadFilms = createAction<Films>('data/loadFilms');

const loadCurrentFilm = createAction<Film>('data/loadCurrentFilm');

const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

const loadComments = createAction<Comments>('data/loadComments');

const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

const setError = createAction<string | null>('main/setError');

const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export {
  changeGenre,
  setDataLoadedStatus,
  receiveFilmsByGenre,
  showMoreFilms,
  setActiveFilmTab,
  loadFilms,
  requireAuthorization,
  setError,
  loadCurrentFilm,
  loadSimilarFilms,
  loadComments
};

