import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {AppRoute, AMOUNT_FILMS_PER_STEP} from '../../const';
import VideoPlayer from '../video-player/video-player';
import {useAppDispatch} from '../../hooks/index';
import {showMoreFilms} from '../../store/action';

type FilmCardProps = {
  id: number;
  name: string;
  previewImage: string;
  previewVideoLink: string;
}

function FilmCard({name, previewImage, id, previewVideoLink}: FilmCardProps): JSX.Element {
  const navigate = useNavigate();
  const [isPlayer, setPlayer] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => {
        setPlayer(true);
      }}
      onMouseOut={() => {
        setPlayer(false);
      }}
    >
      <div className="small-film-card__image" onClick={
        () => {
          navigate(`${AppRoute.Film}/${id}`);
          dispatch(showMoreFilms(AMOUNT_FILMS_PER_STEP));
        }
      }
      >
        {
          isPlayer ? <VideoPlayer previewImage={previewImage} previewVideoLink={previewVideoLink} /> :
            <img src={previewImage} alt={name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link" to={`${AppRoute.Film}/${id}`}
          onClick={() => dispatch(showMoreFilms(AMOUNT_FILMS_PER_STEP))}
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
