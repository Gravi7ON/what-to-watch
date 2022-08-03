import {AppRoute, LOGO_CLASS_NAME} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import {ScreenProps} from '../../types/films';
import FilmsList from '../../components/films-list/films-list';

function MyList({films}: ScreenProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo path={AppRoute.Main} />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <ul className="user-block">
          <UserLogo />
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmsList films={films} amountFilms={films.length}/>
        </div>
      </section>

      <footer className="page-footer">
        <Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />
      </footer>
    </div>
  );
}

export default MyList;
