import {Link, useNavigate} from 'react-router-dom';
import {memo, useState} from 'react';
import {AppRoute} from '../../const';
import VideoPlayer from '../video-player/video-player';
import {useAppDispatch} from '../../hooks/index';
import {fetchCurentFilmAction} from '../../store/api-actions';

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

  const handleFilmCardClick = (isLink: boolean | null) => async () => {
    if (!isLink) {
      navigate(`${AppRoute.Film}/${id}`);
    }

    await dispatch(fetchCurentFilmAction(id.toString()));
  };

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
      <div className="small-film-card__image" onClick={handleFilmCardClick(null)}>
        {
          isPlayer ? <VideoPlayer previewImage={previewImage} previewVideoLink={previewVideoLink} /> :
            <img src={previewImage} alt={name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link" to={`${AppRoute.Film}/${id}`}
          onClick={handleFilmCardClick(true)}
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
