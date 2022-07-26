import {Link} from 'react-router-dom';
import {ScreenProps} from '../../types/films';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeGenre, receiveFilmsByGenre} from '../../store/action';

type EventGenreClick = {preventDefault: () => void; target: {textContent: string}} & React.MouseEvent<HTMLAnchorElement, MouseEvent>

function GenresList({films}: ScreenProps) {
  const {genre} = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const uniqueGenres = Array.from(new Set(films.map((film) => film.genre)));

  const handleGenreClick = (evt: EventGenreClick) => {
    evt.preventDefault();
    dispatch(changeGenre(evt.target.textContent));
    dispatch(receiveFilmsByGenre());
  };

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((filmGenre, index) => (
        index === 0 ?
          <li key={index++} className={genre === 'All genres' ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}>
            <Link to="#" className="catalog__genres-link" onClick={handleGenreClick}>All genres</Link>
          </li> :
          <li key={index++} className={genre === filmGenre ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}>
            <Link to="#" className="catalog__genres-link" onClick={handleGenreClick}>{filmGenre}</Link>
          </li>
      ))}
    </ul>
  );
}

export default GenresList;
