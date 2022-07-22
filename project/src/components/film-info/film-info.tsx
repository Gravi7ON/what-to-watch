import {TextFormRating} from '../../const';
import {FilmTabProps} from '../../types/films';

function FilmInfo({film}: FilmTabProps): JSX.Element {
  const {
    rating,
    scoresCount,
    director,
    starring,
    description,
  } = film;

  const getTextFormRating = (estimate: number): string => {
    const ratingConfig = [
      TextFormRating.Bad,
      TextFormRating.Bad,
      TextFormRating.Bad,
      TextFormRating.Normal,
      TextFormRating.Normal,
      TextFormRating.Good,
      TextFormRating.Good,
      TextFormRating.Good,
      TextFormRating.VeryGood,
      TextFormRating.VeryGood,
      TextFormRating.Awesome
    ];

    return ratingConfig[Math.floor(estimate)];
  };

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating.toFixed(1)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getTextFormRating(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default FilmInfo;

