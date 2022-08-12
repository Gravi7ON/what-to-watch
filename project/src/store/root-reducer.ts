import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {filmsData} from './films-data/films-data';
import {userProcess} from './user-process/user-pocess';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Films]: filmsData.reducer
});
