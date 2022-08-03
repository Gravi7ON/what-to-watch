import {createAction} from '@reduxjs/toolkit';
import {Film, Films} from '../types/films';
import {AuthorizationStatus} from '../const';
import {Comments} from '../types/comments';

const changeGenre = createAction<string>('main/changeGenre');

const receiveFilmsByGenre = createAction('main/receiveFilmsByGenre');

const showMoreFilms = createAction<number>('main/showMoreFilms');

const setActiveFilmTab = createAction<string>('film/activeFilmTab');

const loadFilms = createAction<Films>('data/loadFilms');

const loadCurrentFilm = createAction<Film>('data/loadCurrentFilm');

const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

const loadComments = createAction<Comments>('data/loadComments');

const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

const setError = createAction<string | null>('main/setError');

const redirectToRoute = createAction<string>('app/redirectToRoute');

const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

const postComment = createAction<Comments>('data/postComment');

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
  loadComments,
  redirectToRoute,
  postComment
};

