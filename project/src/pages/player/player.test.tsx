import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import {createFakeFilms} from '../../utils/mocks';
import Player from './player';

const history = createMemoryHistory();
const mockFilms = createFakeFilms(12);

describe('Page: Player', () => {
  it('should render correctly', () => {
    history.push(`${AppRoute.Player}/${mockFilms[0].id}`);

    render(
      <HistoryRouter history={history}>
        <Player films={mockFilms} />
      </HistoryRouter>
    );

    expect(screen.getByRole('button', {name: 'Exit'})).toBeInTheDocument();
  });
});
