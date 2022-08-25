import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import SignIn from './sign-in';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Page: SignIn', () => {
  it('should render correctly', () => {
    history.push(AppRoute.SignIn);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.getByText(/What to watch Ltd/i)).toBeInTheDocument();
  });
});
