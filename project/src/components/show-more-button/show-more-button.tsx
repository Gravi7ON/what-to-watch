import {Films} from '../../types/films';

type ShowMoreButtonProps = {
  films: Films;
  onShowMoreButtonClick: () => void;
}

function ShowMoreButton({films, onShowMoreButtonClick}: ShowMoreButtonProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onShowMoreButtonClick}>Show more</button>
    </div>
  );
}

export default ShowMoreButton;

