import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {createFakeComments, createFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FilmTabs from './film-tabs';

const mockFilm = createFakeFilm();
const mockComments = createFakeComments(3);
const history = createMemoryHistory();

describe('Component: FilmTabs', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmTabs comments={mockComments} currentFilm={mockFilm}/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should show active tab when clicked on the tab film', async () => {
    render(
      <HistoryRouter history={history}>
        <FilmTabs comments={mockComments} currentFilm={mockFilm}/>
      </HistoryRouter>
    );

    fireEvent(
      screen.getByRole('link', {name: 'Details'}),
      new MouseEvent('click')
    );


    await userEvent.click(screen.getByRole('link', {name: 'Details'}));

    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
  });
});
