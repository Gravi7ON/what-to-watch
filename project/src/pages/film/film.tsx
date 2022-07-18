import {Link, useParams} from 'react-router-dom';
import {AppRoute, LOGO_CLASS_NAME, AMOUNT_SIMILAR_FILMS} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import FilmInfo from '../../components/film-info/film-info';
import {ScreenProps, FilmId} from '../../types/films';
import FilmsList from '../../components/films-list/films-list';

function Film({films}: ScreenProps): JSX.Element {
  const {id} = useParams<FilmId>() ;
  const filmIndexInList = parseInt((id || '1'), 10) - 1;

  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
    rating,
    scoresCount,
    director,
    starring,
    description,
  } = films[filmIndexInList];

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo path={AppRoute.Main} />

            <ul className="user-block">
              <UserLogo path={AppRoute.Main} />
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
                <Link to={`${AppRoute.Film}/${id}/review`} className="btn film-card__button">Add review</Link>
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
                    <Link to={`${AppRoute.Film}/${id}`} className="film-nav__link">Overview</Link>
                  </li>
                  <li className="film-nav__item">
                    <Link to={`${AppRoute.Film}/${id}`} className="film-nav__link">Details</Link>
                  </li>
                  <li className="film-nav__item">
                    <Link to={`${AppRoute.Film}/${id}`} className="film-nav__link">Reviews</Link>
                  </li>
                </ul>
              </nav>

              <FilmInfo
                rating={rating}
                scoresCount={scoresCount}
                director={director}
                starring={starring}
                description={description}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={films} amountFilms={AMOUNT_SIMILAR_FILMS} />
        </section>

        <footer className="page-footer">
          <Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />
        </footer>
      </div>
    </>
  );
}

export default Film;
