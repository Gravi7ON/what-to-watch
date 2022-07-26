import {createAction} from '@reduxjs/toolkit';

const changeGenre = createAction('main/changeGenre', (value) => ({
  payload: value
}));

const receiveFilmsByGenre = createAction('main/receiveFilmsByGenre');

export {changeGenre, receiveFilmsByGenre};

