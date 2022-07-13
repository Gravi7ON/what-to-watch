import FilmCard from '../../components/film-card/film-card';
import {AppRoute, LOGO_CLASS_NAME} from '../../const';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';

type MyFilms = {
  name: string;
  previewImage: string;
};

function MyList({name, previewImage}: MyFilms): JSX.Element {
  const getFilmsCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

    for (let i = 0; i < 9; i++) {
      filmsCards.push(<FilmCard name={name} previewImage={previewImage} />);
    }

    return filmsCards;
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        {<Logo path={AppRoute.Main} />}

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <ul className="user-block">
          {<UserLogo path={AppRoute.Main} />}
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {getFilmsCards()}
        </div>
      </section>

      <footer className="page-footer">
        {<Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />}
      </footer>
    </div>
  );
}

export default MyList;
