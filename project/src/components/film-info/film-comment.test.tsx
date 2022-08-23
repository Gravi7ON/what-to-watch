import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createFakeComments} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FilmComment from './film-comment';

const history = createMemoryHistory();
const mockComments = createFakeComments(1)[0];

describe('Component: FilmComments', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmComment {...mockComments} />
      </HistoryRouter>
    );

    expect(screen.getByText(`${mockComments.comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockComments.user.name}`)).toBeInTheDocument();
  });
});
