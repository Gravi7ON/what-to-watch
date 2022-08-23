import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  const mockCb = jest.fn();

  it('should render correctly', () => {
    render(
      <ShowMoreButton onShowMoreButtonClick={mockCb} />
    );

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });

  it('should call cb when user clicked', async () => {
    render(
      <ShowMoreButton onShowMoreButtonClick={mockCb} />
    );

    fireEvent(
      screen.getByRole('button'),
      new MouseEvent('click')
    );


    await userEvent.click(screen.getByRole('button'));

    expect(mockCb).toBeCalled();
  });
});
