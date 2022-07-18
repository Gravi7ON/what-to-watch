import FilmCard from '../../components/film-card/film-card';
import {Films} from '../../types/films';
import {AMOUNT_FILMS_PER_STEP} from '../../const';
import {useState} from 'react';

type FilmListProps = {
  films: Films;
  amountFilms?: number;
}

function FilmsList({films, amountFilms}: FilmListProps): JSX.Element {
  const activeFilmCard = useState(1);
  const setActivFilmCard = activeFilmCard[1];

  const makeActive = (id: number): void => {
    setActivFilmCard(id);
  };

  const getFilmsCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

    for (let i = 0; i < (amountFilms || AMOUNT_FILMS_PER_STEP); i++) {
      filmsCards.push(<FilmCard key={films[i].id} name={films[i].name} previewImage={films[i].previewImage} id={films[i].id} makeActive={makeActive} />);
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
