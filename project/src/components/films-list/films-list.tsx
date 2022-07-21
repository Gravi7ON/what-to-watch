import FilmCard from '../../components/film-card/film-card';
import {Films} from '../../types/films';
import {AMOUNT_FILMS_PER_STEP} from '../../const';

type FilmListProps = {
  films: Films;
  amountFilms?: number;
}

function FilmsList({films, amountFilms}: FilmListProps): JSX.Element {
  const getFilmsCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

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
