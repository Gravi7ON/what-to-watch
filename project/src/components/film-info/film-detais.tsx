import {Fragment} from 'react';
import {HOUR_IN_MINUTES} from '../../const';
import {ScreenProps, FilmId} from '../../types/films';
import {useParams} from 'react-router-dom';

function FilmDetails({films}: ScreenProps): JSX.Element {
  const {id} = useParams<FilmId>() ;
  const filmIndexInList = parseInt((id || '1'), 10) - 1;

  const {
    director,
    starring,
    genre,
    released,
    runTime
  } = films[filmIndexInList];

  const durationHours: number = Math.floor(runTime / HOUR_IN_MINUTES);
  const durationMunutes: number = runTime - HOUR_IN_MINUTES * durationHours;

  const getActors = (): JSX.Element[] => starring.map((actor, index) => (
    <Fragment key={index++}>{`${actor}${index === starring.length - 1 ? '' : ','}`}<br /></Fragment>
  ));

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {getActors()}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{`${durationHours}h ${durationMunutes}m`}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmDetails;
