import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import {createFakeFilms} from '../../utils/mocks';
import MyList from './my-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockFavoritesFilms = createFakeFilms(12);
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  FILMS: {
    isFavoritesLoaded: false,
    favorites: mockFavoritesFilms
  }
});

describe('Page: MyList', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(store.getState().FILMS.favorites[0].name)).toBeInTheDocument();
  });
});
