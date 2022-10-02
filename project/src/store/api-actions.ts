import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {redirectToRoute} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../const';
import {Films, CurrentFilmData, FetchFilms, Film, UpdateFilm} from '../types/films.js';
import {AuthData} from '../types/auth-data.js';
import {UserData} from '../types/user-data.js';
import {Comments, UserComment} from '../types/comments.js';

const fetchFilmsAction = createAsyncThunk<FetchFilms, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data: films} = await api.get<Films>(APIRoute.Films);
    const {data: promoFilm} = await api.get<Film>(APIRoute.PromoFilm);

    return {films, promoFilm};
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
      let currentFilmData;

      await Promise.all([
        api.get<Film>(`${APIRoute.Films}/${id}`),
        api.get<Films>(`${APIRoute.Films}/${id}/similar`),
        api.get<Comments>(`${APIRoute.Comments}/${id}`)
      ])
        .then((response) => {
          const currentFilm: Film = response[0].data;
          const similarFilms: Films = response[1].data;
          const filmComments: Comments = response[2].data;

          currentFilmData = {
            currentFilm,
            similarFilms,
            filmComments
          };
        });

      return currentFilmData;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

const fetchMyListAction = createAsyncThunk<Films | undefined, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoritesFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: myFilms} = await api.get<Films>(APIRoute.Favorite);

      return myFilms;
    } catch {
      dispatch(redirectToRoute(AppRoute.Main));
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

const addFilmToFavoritesAction = createAsyncThunk<Film, UpdateFilm, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addFilmToFavorite',
  async ({status, filmId}, {dispatch, extra: api}) => {
    const {data: updateFilm} = await api.post<Film>(`${APIRoute.Favorite}/${filmId}/${status}`);

    return updateFilm;
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
  postCommentAction,
  fetchMyListAction,
  addFilmToFavoritesAction
};
