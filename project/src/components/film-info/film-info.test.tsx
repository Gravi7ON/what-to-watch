import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FilmInfo from './film-info';

const history = createMemoryHistory();
const mockFilm = createFakeFilm();

describe('Component: FilmInfo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmInfo film={mockFilm} />
      </HistoryRouter>
    );

    expect(screen.getByText(`${mockFilm.description}`)).toBeInTheDocument();
  });
});
