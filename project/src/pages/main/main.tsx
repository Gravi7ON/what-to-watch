import {AppRoute, LOGO_CLASS_NAME, AMOUNT_FILMS_PER_STEP} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import Films from '../../types/films';
import FilmsList from '../../components/films-list/films-list';

type MainProps = {
  films: Films
}

function MainPage({films}: MainProps): JSX.Element {
  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage
  } = films[0];

  return (
    <>
      <section className="film-card">
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
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="_" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="_" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          {<FilmsList films={films} amountFilms={AMOUNT_FILMS_PER_STEP} />}
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          {<Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />}
        </footer>
      </div>
    </>
  );
}

export default MainPage;
