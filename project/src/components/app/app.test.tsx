import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AuthorizationStatus, AppRoute} from '../../const';
import App from './app';
import {createFakeComments, createFakeFilm, createFakeFilms} from '../../utils/mocks';

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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2022 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render "Sign In" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "My list when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2022 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render "Current film" when user navigate to "/films/:id"', () => {
    history.push(`${AppRoute.Film}/1`);

    render(fakeApp);

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  it('should render "Add review" when user navigate to "/films/:id/review"', () => {
    history.push(`${AppRoute.Film}/1/review`);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should render "Not found" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/Return main/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to start/i)).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/:filmId"', () => {
    history.push(`${AppRoute.Player}/1`);

    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });
});
