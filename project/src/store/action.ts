import {createAction} from '@reduxjs/toolkit';
import {Films} from '../types/films';
import {AuthorizationStatus} from '../const';

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

const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

const setError = createAction<string | null>('main/setError');

const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export {changeGenre, setDataLoadedStatus, receiveFilmsByGenre, showMoreFilms, setActiveFilmTab, loadFilms, requireAuthorization, setError};

