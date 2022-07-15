import {AppRoute, LOGO_CLASS_NAME} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import Films from '../../types/films';
import FilmsList from '../../components/films-list/films-list';

type MyFilmsProps = {
  films: Films
}

function MyList({films}: MyFilmsProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        {<Logo path={AppRoute.Main} />}

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <ul className="user-block">
          {<UserLogo path={AppRoute.Main} />}
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {<FilmsList films={films} />}
        </div>
      </section>

      <footer className="page-footer">
        {<Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />}
      </footer>
    </div>
  );
}

export default MyList;
