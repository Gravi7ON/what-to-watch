import {Link} from 'react-router-dom';
import {AppRoute, LOGO_CLASS_NAME, AMOUNT_SIMILAR_FILMS, TextFormRating} from '../../const';
import FilmCard from '../../components/film-card/film-card';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';

type FilmList = {
  name: string;
  previewImage: string;
  genre: string;
  released: number;
  posterImage: string;
  backgroundImage: string;
  rating: number;
  scoresCount:number;
  director: string;
  starring: string[];
  description: string;
};

function Film(props: FilmList): JSX.Element {
  const {
    name,
    previewImage,
    genre,
    released,
    posterImage,
    backgroundImage,
    rating,
    scoresCount,
    director,
    starring,
    description
  } = props;

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

  const getFilmsCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

    for (let i = 0; i < AMOUNT_SIMILAR_FILMS; i++) {
      filmsCards.push(<FilmCard name={name} previewImage={previewImage} />);
    }

    return filmsCards;
  };

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            {<Logo path={AppRoute.Main} />}

            <ul className="user-block">
              {<UserLogo path={AppRoute.Main} />}
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <Link to={AppRoute.Film} className="film-nav__link">Overview</Link>
                  </li>
                  <li className="film-nav__item">
                    <a href="_" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="_" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

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
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {getFilmsCards()}
          </div>
        </section>

        <footer className="page-footer">
          {<Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />}
        </footer>
      </div>
    </>
  );
}

export default Film;
