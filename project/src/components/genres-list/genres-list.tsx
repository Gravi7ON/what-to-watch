import {Films, ScreenProps, EventGenreClick} from '../../types/films';
import {ALL_GENRES, AMOUNT_FILMS_PER_STEP, MAX_AMOUNT_GENRES} from '../../const';
import FilmsList from '../films-list/films-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import {useState} from 'react';
import {getFilteredFilmsByGenre} from '../../utils';
import GenresTabs from '../genres-tabs/genres-tabs';

type GenreState = {
  filmsPerStep: number;
  activeTab: string;
  filmsByGenre: Films;
}

function GenresList({films}: ScreenProps) {
  const [{filmsPerStep, activeTab, filmsByGenre}, setFilmGenre] = useState<GenreState>({
    filmsPerStep: AMOUNT_FILMS_PER_STEP,
    activeTab: ALL_GENRES,
    filmsByGenre: []
  });

  const uniqueGenres = Array.from(new Set(films.map((film) => film.genre))).slice(0, MAX_AMOUNT_GENRES);
  uniqueGenres.unshift(ALL_GENRES);

  const isLessThanStep = () => films.length <= filmsPerStep || (activeTab !== ALL_GENRES && filmsByGenre.length <= filmsPerStep);
  const getFilmsByTab = () => activeTab === ALL_GENRES ? films : filmsByGenre;


  const onGenreClick = (evt: EventGenreClick) => {
    evt.preventDefault();

    if (activeTab === evt.target.textContent) {
      return;
    }

    setFilmGenre((prev) => ({
      ...prev,
      activeTab: evt.target.textContent,
      filmsByGenre: getFilteredFilmsByGenre(evt.target.textContent, films),
      filmsPerStep: AMOUNT_FILMS_PER_STEP
    }));
  };

  const onShowMoreButtonClick = () => {
    const totalFilmsCount = films.length;
    const newCountFilmsPerStep = Math.min(totalFilmsCount, filmsPerStep + AMOUNT_FILMS_PER_STEP);
    setFilmGenre((prev) => ({...prev, filmsPerStep: newCountFilmsPerStep}));
  };

  return (
    <>
      <GenresTabs activeTab={activeTab} onGenreClick={onGenreClick} uniqueGenres={uniqueGenres} />

      <FilmsList films={getFilmsByTab()} amountFilms={filmsPerStep} />

      {
        isLessThanStep() ?
          null :
          <ShowMoreButton
            onShowMoreButtonClick={onShowMoreButtonClick}
          />
      }
    </>
  );
}

export default GenresList;
