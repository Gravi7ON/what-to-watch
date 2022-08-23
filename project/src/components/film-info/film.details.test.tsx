import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FilmDetails from './film-detais';

const history = createMemoryHistory();
const mockFilm = createFakeFilm();

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmDetails film={mockFilm} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
  });
});
