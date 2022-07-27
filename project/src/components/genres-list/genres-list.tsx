import {Link} from 'react-router-dom';
import {ScreenProps} from '../../types/films';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeGenre, receiveFilmsByGenre} from '../../store/action';
import {ALL_GENRES} from '../../const';

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
        <li
          key={index++}
          className={(genre === ALL_GENRES && index === 0) || genre === filmGenre ?
            'catalog__genres-item catalog__genres-item--active' :
            'catalog__genres-item'}
        >
          <Link
            to="#"
            className="catalog__genres-link"
            onClick={handleGenreClick}
          >
            {index === 0 ? ALL_GENRES : filmGenre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
