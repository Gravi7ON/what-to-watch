import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createFakeFilms} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import GenresList from './genres-list';

describe('Component: GenresList', () => {
  const mockFilms = createFakeFilms(8);
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <GenresList films={mockFilms} />
      </HistoryRouter>
    );

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();

    for (const film of mockFilms) {
      expect(screen.getByText(`${film.name}`)).toBeInTheDocument();
    }
  });
});
