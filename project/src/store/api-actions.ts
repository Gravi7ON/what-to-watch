import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {
  redirectToRoute
} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../const';
import {Films, CurrentFilmData, Film} from '../types/films.js';
import {AuthData} from '../types/auth-data.js';
import {UserData} from '../types/user-data.js';
import {Comments, UserComment} from '../types/comments.js';

const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data: films} = await api.get<Films>(APIRoute.Films);

    return films;
  }
);

const fetchCurrentFilmAction = createAsyncThunk<CurrentFilmData | undefined, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data: currentFilm} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      const {data: similarFilms} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
      const {data: filmComments} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);

      return {currentFilm, similarFilms, filmComments};
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

const postCommentAction = createAsyncThunk<Comments, UserComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    const {data: comments} = await api.post<Comments>(`${APIRoute.Comments}/${filmId}`, {comment, rating});

    return comments;
  }
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.SignIn);
  }
);

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.SignIn, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export {
  fetchFilmsAction,
  fetchCurrentFilmAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  postCommentAction
};
