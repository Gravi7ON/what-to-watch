import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {
  loadFilms,
  requireAuthorization,
  setError,
  setDataLoadedStatus,
  loadCurrentFilm,
  loadComments,
  loadSimilarFilms
} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {Films, Film} from '../types/films.js';
import {AuthData} from '../types/auth-data.js';
import {UserData} from '../types/user-data.js';
import {store} from './store';
import Comments from '../types/comments.js';

const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data: films} = await api.get<Films>(APIRoute.Films);
    dispatch(loadFilms(films));
    dispatch(setDataLoadedStatus(false));
  },
);

const fetchCurentFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setDataLoadedStatus(true));
      const {data: currentFilm} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      const {data: similarFilms} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
      const {data: filmComments} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      dispatch(loadCurrentFilm(currentFilm));
      dispatch(loadComments(filmComments));
      dispatch(loadSimilarFilms(similarFilms));
      dispatch(setDataLoadedStatus(false));
    } catch {
      dispatch(setDataLoadedStatus(false));
    }
  }
);

const clearErrorAction = createAsyncThunk(
  'main/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.SignIn);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
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
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export {fetchFilmsAction, fetchCurentFilmAction, checkAuthAction, loginAction, logoutAction, clearErrorAction};
