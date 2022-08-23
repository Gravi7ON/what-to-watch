import { render, screen} from '@testing-library/react';
import {createFakeFilm} from '../../utils/mocks';
import VideoPlayer from './video-player';

const {previewVideoLink, previewImage} = createFakeFilm();

describe('Component: Video player', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
  });

  it('should render correctly', () => {

    render(
      <VideoPlayer previewImage={previewImage} previewVideoLink={previewVideoLink} />
    );

    expect(screen.getByTestId('testid')).toBeInTheDocument();
  });
});
