import {AppRoute, LOGO_CLASS_NAME, AMOUNT_FILMS_PER_STEP, ALL_GENRES} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import {ScreenProps} from '../../types/films';
import {useNavigate} from 'react-router-dom';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {showMoreFilms, receiveFilmsByGenre, changeGenre} from '../../store/action';
import ShowMoreButton from '../../components/show-more-button/show-more-button';

function MainPage({films}: ScreenProps): JSX.Element {
  const navigate = useNavigate();

  const {movies, filmsPerStep, moviesByGenre, genreTab} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleShowMoreButtonClick = () => {
    const totalFilmsCount = movies.length;
    const newCountFilmsPerStep = Math.min(totalFilmsCount, filmsPerStep + AMOUNT_FILMS_PER_STEP);
    dispatch(showMoreFilms(newCountFilmsPerStep));
  };

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
          <Logo />

          <ul className="user-block">
            <UserLogo path={AppRoute.Main} />
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
                <button className="btn btn--play film-card__button" type="button" onClick={
                  () => {
                    dispatch(showMoreFilms(AMOUNT_FILMS_PER_STEP));
                    dispatch(changeGenre('All genres'));
                    dispatch(receiveFilmsByGenre());
                  }
                }
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={
                  () => {
                    navigate(AppRoute.MyList);
                    dispatch(showMoreFilms(AMOUNT_FILMS_PER_STEP));
                    dispatch(changeGenre('All genres'));
                    dispatch(receiveFilmsByGenre());
                  }
                }
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{films.length}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList films={movies} />

          <FilmsList films={genreTab === ALL_GENRES ? movies : moviesByGenre} amountFilms={filmsPerStep} />

          {
            movies.length <= filmsPerStep || (genreTab !== ALL_GENRES && moviesByGenre.length <= filmsPerStep) ?
              null :
              <ShowMoreButton
                films={genreTab === ALL_GENRES ? movies : moviesByGenre}
                onShowMoreButtonClick={handleShowMoreButtonClick}
              />
          }
        </section>

        <footer className="page-footer">
          <Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />
        </footer>
      </div>
    </>
  );
}

export default MainPage;
