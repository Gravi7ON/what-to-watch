import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-rout';
import FilmCard from './film-card';

const history = createMemoryHistory();
const mockFilm = createFakeFilm();

describe('Component: Film Card', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmCard previewVideoLink={mockFilm.previewVideoLink} id={mockFilm.id} previewImage={mockFilm.previewImage} name={mockFilm.name}/>
      </HistoryRouter>
    );

    expect(screen.getByText(`${mockFilm.name}`)).toBeInTheDocument();
  });
});
