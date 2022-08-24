import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import FilmTabBar from './film-tab-bar';

const mockTitleTabs = ['Overview', 'Details', 'Reviews'];
const mockActiveTab = mockTitleTabs[0];
const mockCb = jest.fn();
const history = createMemoryHistory();

describe('Component: FilmTabBar', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmTabBar activeTab={mockActiveTab} onTabClick={mockCb} titleTabs={mockTitleTabs} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should apply active class when clicked on the tab film', async () => {
    render(
      <HistoryRouter history={history}>
        <FilmTabBar activeTab={mockActiveTab} onTabClick={mockCb} titleTabs={mockTitleTabs} />
      </HistoryRouter>
    );

    fireEvent(
      screen.getByRole('link', {name: 'Details'}),
      new MouseEvent('click')
    );


    await userEvent.click(screen.getByRole('link', {name: 'Details'}));

    expect(mockCb).toBeCalled();

    expect(screen.getAllByRole('listitem')
      .find(((element) => element.classList.contains('film-nav__item--active')))
    ).toBeInTheDocument();
  });
});
