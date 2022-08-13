import {AppRoute, LOGO_CLASS_NAME} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import FilmsList from '../../components/films-list/films-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchMyListAction} from '../../store/api-actions';
import {getFavoritesFilms, getLoadedFavoritesFilmsStatus} from '../../store/films-data/selectors';
import LoadingScreen from '../loading/loading';
import {useEffect} from 'react';

function MyList(): JSX.Element | null {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const requestId = requestAnimationFrame(() => {
        dispatch(fetchMyListAction());
      });

      return () => cancelAnimationFrame(requestId);
    }, [dispatch]
  );

  const favoritesFilms = useAppSelector(getFavoritesFilms);
  const isFavoritesLoaded = useAppSelector(getLoadedFavoritesFilmsStatus);

  if (isFavoritesLoaded) {
    return (
      <LoadingScreen />
    );
  }

  if (favoritesFilms) {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo path={AppRoute.Main} />

          <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoritesFilms.length}</span></h1>
          <ul className="user-block">
            <UserLogo />
          </ul>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__films-list">
            <FilmsList films={favoritesFilms} amountFilms={favoritesFilms.length}/>
          </div>
          {
            favoritesFilms.length === 0 ?
              <div style={{textAlign: 'center', fontWeight: 'bold'}}>
                <p>Add your favorite films</p>
              </div> :
              null
          }
        </section>

        <footer className="page-footer">
          <Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />
        </footer>
      </div>
    );
  }

  return null;
}

export default MyList;
