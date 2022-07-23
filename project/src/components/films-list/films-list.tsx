import FilmCard from '../../components/film-card/film-card';
import {Films} from '../../types/films';
import {AMOUNT_FILMS_PER_STEP, MAX_SHOW_SIMILAR_FILMS} from '../../const';

type FilmListProps = {
  films: Films;
  amountFilms?: number;
  moreLikeThis?: boolean;
  currentFilmId?: string;
}

function FilmsList({films, amountFilms, moreLikeThis, currentFilmId}: FilmListProps): JSX.Element {
  const getFilmsCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

    if (moreLikeThis) {
      const indexComparedFilm = Number(currentFilmId) - 1;
      const similarFilms = [
        ...films.slice(0, indexComparedFilm),
        ...films.slice(indexComparedFilm + 1)
      ]
        .filter((film) => film.genre === films[indexComparedFilm].genre)
        .slice(0, MAX_SHOW_SIMILAR_FILMS);

      return similarFilms.map((film) => (
        <FilmCard
          key={film.id}
          {...film}
        />
      ));
    }

    for (let i = 0; i < (amountFilms || AMOUNT_FILMS_PER_STEP); i++) {
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
