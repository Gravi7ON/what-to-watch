import {AppRoute, LOGO_CLASS_NAME} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import {Link, useNavigate} from 'react-router-dom';
import GenresList from '../../components/genres-list/genres-list';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {isAuthorized, isAuthorizedAndFilmsInList, isFilmFavorite} from '../../utils';
import {getFavoritesFilms, getFilms, getPromoFilm} from '../../store/films-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selector';
import {addFilmToFavoritesAction} from '../../store/api-actions';
import {useState} from 'react';

function MainPage(): JSX.Element | null {
  const [isAddingFilm , setIsAddingFilm] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const movies = useAppSelector(getFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const favoritesFilms = useAppSelector(getFavoritesFilms);

  if (promoFilm && favoritesFilms) {
    const {
      name,
      genre,
      released,
      posterImage,
      backgroundImage,
      id
    } = promoFilm;

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
              {
                isAuthorized(authorizationStatus) ?
                  <UserLogo /> :
                  <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
              }
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
                      navigate(`${AppRoute.Player}/${id}`);
                    }
                  }
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list film-card__button" disabled={isAddingFilm} type="button" onClick={
                    async () => {
                      setIsAddingFilm(true);
                      await dispatch(addFilmToFavoritesAction({filmId: id, status: isFilmFavorite(favoritesFilms, id.toString()) ? 0 : 1}));
                      setIsAddingFilm(false);
                    }
                  }
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={isAuthorizedAndFilmsInList(authorizationStatus, favoritesFilms, id.toString()) ? '#in-list' : '#add'}></use>
                    </svg>
                    <span>My list</span>
                    <span className="film-card__count">{isAuthorized(authorizationStatus) ? favoritesFilms.length : '0'}</span>
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
          </section>

          <footer className="page-footer">
            <Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />
          </footer>
        </div>
      </>
    );
  }

  return null;
}

export default MainPage;
