import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import NotFound from './not-found';


const history = createMemoryHistory();

describe('Page: NotFound', () => {
  it('should render correctly', () => {
    history.push(AppRoute.NotFound);

    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    expect(screen.getByText(/404 Error/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to start/i)).toBeInTheDocument();
  });
});
