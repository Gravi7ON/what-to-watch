import FilmCard from '../../components/film-card/film-card';
import {Films} from '../../types/films';
import {AMOUNT_FILMS_PER_STEP, MAX_SHOW_SIMILAR_FILMS} from '../../const';

type FilmListProps = {
  films: Films;
  amountFilms?: number;
  moreLikeThis?: boolean;
}

function FilmsList({films, amountFilms = AMOUNT_FILMS_PER_STEP, moreLikeThis}: FilmListProps): JSX.Element {
  const getFilmsCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

    if (moreLikeThis) {
      const similarFilms = [...films].slice(0, MAX_SHOW_SIMILAR_FILMS);

      return similarFilms.map((film) => (
        <FilmCard
          key={film.id}
          {...film}
        />
      ));
    }

    for (let i = 0; i < amountFilms && i !== films.length; i++) {
      filmsCards.push(
        <FilmCard
          key={films[i].id}
          name={films[i].name}
          previewImage={films[i].previewImage}
          id={films[i].id}
          previewVideoLink={films[i].previewVideoLink}
        />
      );
    }

    return filmsCards;
  };

  return (
    <div className="catalog__films-list">
      {getFilmsCards()}
    </div>
  );
}

export default FilmsList;
