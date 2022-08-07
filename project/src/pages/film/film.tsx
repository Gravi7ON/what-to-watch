import {Link, useParams} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, LOGO_CLASS_NAME} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import {Film as Movie, FilmId, Films} from '../../types/films';
import FilmsList from '../../components/films-list/films-list';
import FilmTabs from '../../components/film-tabs/film-tabs';
import {isAuthorized} from '../../utils';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchCurentFilmAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selector';
import {getCurrentFilm, getCurrentFilmComments, getFilms, getLoadedDataStatus, getSimilarFilms} from '../../store/films-data/selectors';
import { Comments } from '../../types/comments';

function Film(): JSX.Element | null {
  const {id = '1'} = useParams<FilmId>();
  const filmIndexInList = Number(id) - 1;

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const movies = useAppSelector(getFilms);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const currentMovie = useAppSelector(getCurrentFilm) as Movie;
  const similarMovies = useAppSelector(getSimilarFilms) as Films;
  const movieComments = useAppSelector(getCurrentFilmComments) as Comments;
  const isAuthorizedAndFilmsInList = () => movies.find((film) => film.id === filmIndexInList) &&
    authorizationStatus === AuthorizationStatus.Auth;

  if (!Object.keys(currentMovie).length && !isDataLoaded) {
    dispatch(fetchCurentFilmAction(id));
  }

  if (isDataLoaded) {
    return null;
  }

  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
    backgroundColor
  } = currentMovie;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg" style={{backgroundColor: backgroundColor}}>
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo path={AppRoute.Main} />

            <ul className="user-block">
              {
                isAuthorized(authorizationStatus) ?
                  <UserLogo /> :
                  <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
              }
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
                    <use xlinkHref={isAuthorizedAndFilmsInList() ? '#in-list' : '#add'}></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{isAuthorized(authorizationStatus) ? movies.length : '0'}</span>
                </button>
                {
                  isAuthorized(authorizationStatus) ?
                    <Link to={`${AppRoute.Film}/${id}/review`} className="btn film-card__button">Add review</Link> :
                    null
                }
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
              <FilmTabs comments={movieComments} currentFilm={currentMovie} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">{similarMovies.length === 0 ? null : 'More like this'}</h2>

          <FilmsList moreLikeThis films={similarMovies} currentFilmId={id} />
        </section>

        <footer className="page-footer">
          <Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />
        </footer>
      </div>
    </>
  );
}

export default Film;
