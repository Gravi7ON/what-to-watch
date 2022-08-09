import {memo} from 'react';
import {Link} from 'react-router-dom';
import {ALL_GENRES} from '../../const';
import {EventGenreClick} from '../../types/films';

type GenresTabsProps = {
  uniqueGenres: string[];
  activeTab: string;
  onGenreClick: (evt: EventGenreClick) => void;
}

function GenresTabs({uniqueGenres, activeTab, onGenreClick}: GenresTabsProps) {
  const isActiveGenreTab = (index: number, filmGenre: string) =>
    (activeTab === ALL_GENRES && index === 0) || activeTab === filmGenre;

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((filmGenre, index) => (
        <li
          key={`${index++} - ${filmGenre}`}
          className={isActiveGenreTab(index, filmGenre) ?
            'catalog__genres-item catalog__genres-item--active' :
            'catalog__genres-item'}
        >
          <Link
            to="#"
            className="catalog__genres-link"
            onClick={onGenreClick}
          >
            {index === 0 ? ALL_GENRES : filmGenre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default memo(GenresTabs, (prevProps, nextProps) => prevProps.activeTab === nextProps.activeTab);
