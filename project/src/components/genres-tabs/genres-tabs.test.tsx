import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {createFakeFilms} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import GenresTabs from './genres-tabs';

const mockFilms = createFakeFilms(7);
const mockUniqueGenres = Array.from(new Set(mockFilms.map((mockFilm) => mockFilm.genre)));
const mockCb = jest.fn();
const history = createMemoryHistory();

describe('Component: GenresTabs', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <GenresTabs uniqueGenres={mockUniqueGenres} activeTab={mockUniqueGenres[1]} onGenreClick={mockCb} />
      </HistoryRouter>
    );

    expect(screen.getByText(`${mockUniqueGenres[1]}`)).toBeInTheDocument();
  });

  it('should apply active class when clicked on the tab', async () => {
    render(
      <HistoryRouter history={history}>
        <GenresTabs uniqueGenres={mockUniqueGenres} activeTab={mockUniqueGenres[1]} onGenreClick={mockCb} />
      </HistoryRouter>
    );

    fireEvent(
      screen.getByText(`${mockUniqueGenres[1]}`),
      new MouseEvent('click')
    );


    await userEvent.click(screen.getByText(`${mockUniqueGenres[1]}`));

    expect(mockCb).toBeCalled();
    expect(screen.getAllByRole('listitem')
      .find(((element) => element.classList.contains('catalog__genres-item--active')))
    ).toBeInTheDocument();
  });
});
