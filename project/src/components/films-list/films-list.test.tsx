import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createFakeFilms} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import FilmsList from './films-list';

const history = createMemoryHistory();
const mockFilms = createFakeFilms(5);

describe('Component: FilmsList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmsList films={mockFilms} />
      </HistoryRouter>
    );

    for (const film of mockFilms) {
      expect(screen.getByText(`${film.name}`)).toBeInTheDocument();
    }
  });
});
