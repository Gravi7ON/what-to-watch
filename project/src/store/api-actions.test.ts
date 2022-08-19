import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {addFilmToFavoritesAction, checkAuthAction, fetchCurrentFilmAction, fetchFilmsAction, fetchMyListAction, postCommentAction} from './api-actions';
import {APIRoute, AppRoute} from '../const';
import {State} from '../types/state';
import {createFakeComments, createFakeFilm, createFakeFilms, createFakeUpdatedFilm, createFakeUserComment} from '../utils/mocks';
import { redirectToRoute } from './action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockFilms = createFakeFilms(8);
  const mockFilm = createFakeFilm();

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  describe('Get data succeed', () => {
    it('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(AppRoute.SignIn)
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch load Films when GET /films', async () => {
      const store = mockStore();
      mockAPI
        .onGet(AppRoute.Film)
        .reply(200, mockFilms);
      mockAPI
        .onGet(APIRoute.PromoFilm)
        .reply(200, mockFilm);

      await store.dispatch(fetchFilmsAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type
      ]);
    });

    it('should dispatch load current film when GET /films/:id', async () => {
      const mockComments = createFakeComments(3);
      const mockId = '3';

      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Films}/${mockId}`)
        .reply(200, mockFilm);
      mockAPI
        .onGet(`${APIRoute.Films}/${mockId}/similar`)
        .reply(200, mockFilms);
      mockAPI
        .onGet(`${APIRoute.Comments}/${mockId}`)
        .reply(200, mockComments);

      await store.dispatch(fetchCurrentFilmAction(mockId));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCurrentFilmAction.pending.type,
        fetchCurrentFilmAction.fulfilled.type
      ]);
    });

    it('should dispatch load favorites films when GET /favorite', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(200, mockFilms);

      await store.dispatch(fetchMyListAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchMyListAction.pending.type,
        fetchMyListAction.fulfilled.type
      ]);
    });
  });

  describe('Get data failure', () => {
    it('should authorization status is «NoAuth» when server return 4xx, required authorization', async () => {
      const store = mockStore();
      mockAPI
        .onGet(AppRoute.SignIn)
        .reply(400, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });

    it('should show loading screen when server return 4xx, required films', async () => {
      const store = mockStore();
      mockAPI
        .onGet(AppRoute.Film)
        .reply(400, mockFilms);
      mockAPI
        .onGet(APIRoute.PromoFilm)
        .reply(200, mockFilm);

      await store.dispatch(fetchFilmsAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type
      ]);
    });

    it('should redirect to not-found when server return 4xx, required current film', async () => {
      const mockComments = createFakeComments(3);
      const mockId = '3';

      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Films}/${mockId}`)
        .reply(400, mockFilm);
      mockAPI
        .onGet(`${APIRoute.Films}/${mockId}/similar`)
        .reply(200, mockFilms);
      mockAPI
        .onGet(`${APIRoute.Comments}/${mockId}`)
        .reply(200, mockComments);

      await store.dispatch(fetchCurrentFilmAction(mockId));

      const actions = store.getActions().map(({type}) => type);
      const redirect = store.dispatch(redirectToRoute(AppRoute.NotFound));

      expect(actions).toEqual([
        fetchCurrentFilmAction.pending.type,
        redirect.type,
        fetchCurrentFilmAction.fulfilled.type
      ]);
    });

    it('should redirect to main page when server return 4xx, required favorite films', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(400, mockFilms);

      await store.dispatch(fetchMyListAction());

      const actions = store.getActions().map(({type}) => type);
      const redirect = store.dispatch(redirectToRoute(AppRoute.Main));

      expect(actions).toEqual([
        fetchMyListAction.pending.type,
        redirect.type,
        fetchMyListAction.fulfilled.type
      ]);
    });
  });

  describe('Post data succeed', () => {
    it('should dispatch post comment when POST /comments/:filmId', async () => {
      const {comment, rating, filmId} = createFakeUserComment();
      const mockComments = createFakeComments(1);

      const store = mockStore();
      mockAPI
        .onPost(`${APIRoute.Comments}/${filmId}`, {comment, rating})
        .reply(200, mockComments);

      await store.dispatch(postCommentAction({filmId, rating, comment}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type
      ]);
    });

    it('should dispatch post favorite film when POST /favorite/:filmId/{status}', async () => {
      const {status, filmId} = createFakeUpdatedFilm();

      const store = mockStore();
      mockAPI
        .onPost(`${APIRoute.Favorite}/${filmId}/${status}`)
        .reply(200, mockFilm);

      await store.dispatch(addFilmToFavoritesAction({status, filmId}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        addFilmToFavoritesAction.pending.type,
        addFilmToFavoritesAction.fulfilled.type
      ]);
    });
  });

  describe('Post data failure', () => {
    it('should show notify when server return 4xx, required post comment', async () => {
      const {comment, rating, filmId} = createFakeUserComment();
      const mockComments = createFakeComments(1);

      const store = mockStore();
      mockAPI
        .onPost(`${APIRoute.Comments}/${filmId}`, {comment, rating})
        .reply(400, mockComments);

      await store.dispatch(postCommentAction({filmId, rating, comment}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.rejected.type
      ]);
    });

    it('should show notify when server return 4xx, required update favorites', async () => {
      const {status, filmId} = createFakeUpdatedFilm();

      const store = mockStore();
      mockAPI
        .onPost(`${APIRoute.Favorite}/${filmId}/${status}`)
        .reply(400, mockFilm);

      await store.dispatch(addFilmToFavoritesAction({status, filmId}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        addFilmToFavoritesAction.pending.type,
        addFilmToFavoritesAction.rejected.type
      ]);
    });
  });
});
