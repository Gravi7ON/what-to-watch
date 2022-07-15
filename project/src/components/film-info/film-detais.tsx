import {Fragment} from 'react';
import {HOUR_IN_MINUTES} from '../../const';

type DetailsProps = {
  director: string;
  starring: string[];
  genre: string;
  released: number;
  runTime: number;
}

function FilmDetails(props: DetailsProps): JSX.Element {
  const {
    director,
    starring,
    genre,
    released,
    runTime
  } = props;

  const durationHours: number = Math.floor(runTime / HOUR_IN_MINUTES);
  const durationMunutes: number = runTime - HOUR_IN_MINUTES * durationHours;

  const getActors = (): JSX.Element[] => {
    const actors: JSX.Element[] = [];

    for (let i = 0; i < starring.length - 1; i++) {
      actors.push(
        (<Fragment key={i.toString()}>{`${starring[i]},`} <br /></Fragment>)
      );
    }

    actors.push(
      (<Fragment key={starring.length.toString()}>{starring[starring.length - 1]}</Fragment>)
    );

    return actors;
  };

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
