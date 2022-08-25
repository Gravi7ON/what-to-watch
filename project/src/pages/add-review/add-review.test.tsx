import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import {createFakeComments, createFakeFilm, createFakeFilms} from '../../utils/mocks';
import App from '../../components/app/app';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockFilms = createFakeFilms(12);
const mockPromoFilm = createFakeFilm();
const mockFilm = createFakeFilm();
const mockComments = createFakeComments(3);
const mockSimilarFilm = createFakeFilms(4);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  FILMS: {
    movies: mockFilms,
    promoFilm: mockPromoFilm,
    currentMovie: mockFilm,
    movieComments: mockComments,
    similarMovies: mockSimilarFilm,
    isDataLoaded: false,
    isFilmLoaded: false,
    isFavoritesLoaded: false,
    favorites: []
  }
});

describe('Page: AddReview', () => {
  it('should render correctly', () => {
    history.push(`${AppRoute.Film}/1/review`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Post'})).toBeInTheDocument();
  });
});
