import {memo} from 'react';
import {Link} from 'react-router-dom';
import {EventGenreClick} from '../../types/films';

type GenresTabsProps = {
  uniqueGenres: string[];
  activeTab: string;
  onGenreClick: (evt: EventGenreClick) => void;
}

function GenresTabs({uniqueGenres, activeTab, onGenreClick}: GenresTabsProps) {
  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((filmGenre, index) => (
        <li
          key={`${filmGenre}-${index++}`}
          className={activeTab === filmGenre ?
            'catalog__genres-item catalog__genres-item--active' :
            'catalog__genres-item'}
        >
          <Link
            to="#"
            className="catalog__genres-link"
            onClick={onGenreClick}
          >
            {filmGenre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default memo(GenresTabs, (prevProps, nextProps) => prevProps.activeTab === nextProps.activeTab);
