import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import HistoryRouter from '../history-router/history-router';
import UserLogo from './user-logo';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: UserLogo', () => {
  it('should render correctly with "Sign out"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store = {store}>
        <HistoryRouter history={history}>
          <UserLogo />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
