import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {AppRoute} from '../../const';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  id: number;
  name: string;
  previewImage: string;
  previewVideoLink: string;
}

function FilmCard({name, previewImage, id, previewVideoLink}: FilmCardProps): JSX.Element {
  const navigate = useNavigate();
  const [isPlayer, setPlayer] = useState(false);

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
      <div className="small-film-card__image" onClick={() => navigate(`${AppRoute.Film}/${id}`)}>
        {
          isPlayer ? <VideoPlayer previewImage={previewImage} previewVideoLink={previewVideoLink} /> :
            <img src={previewImage} alt={name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Film}/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
