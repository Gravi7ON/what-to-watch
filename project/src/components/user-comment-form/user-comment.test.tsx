import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import { createFakeFilm } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import UserCommentForm from './user-comment-form';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const {backgroundColor} = createFakeFilm();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: UserCommentForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserCommentForm backgroundColor={backgroundColor} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Post'})).toBeInTheDocument();
  });
});
