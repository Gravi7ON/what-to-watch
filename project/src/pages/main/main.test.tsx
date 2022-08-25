import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import {createFakeFilm, createFakeFilms} from '../../utils/mocks';
import MainPage from './main';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockFilms = createFakeFilms(12);
const mockPromoFilm = createFakeFilm();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  FILMS: {
    movies: mockFilms,
    promoFilm: mockPromoFilm,
    isDataLoaded: false,
    isFavoritesLoaded: false,
    favorites: []
  }
});

describe('Page: Main', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(store.getState().FILMS.promoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(store.getState().FILMS.promoFilm.genre)).toBeInTheDocument();
  });
});
