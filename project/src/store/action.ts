import {createAction} from '@reduxjs/toolkit';

const changeGenre = createAction('main/changeGenre', (value) => ({
  payload: value
}));

const receiveFilmsByGenre = createAction('main/receiveFilmsByGenre');

const showMoreFilms = createAction('main/showMoreFilms', (value) => ({
  payload: value
}));

export {changeGenre, receiveFilmsByGenre, showMoreFilms};

