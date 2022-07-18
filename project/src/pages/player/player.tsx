import {useParams} from 'react-router-dom';
import {ScreenProps, FilmId} from '../../types/films';

function Player({films}: ScreenProps): JSX.Element {
  const {id} = useParams<FilmId>() ;
  const filmIndexInList: number = parseInt((id || '1'), 10) - 1;

  const {videoLink, runTime, backgroundImage} = films[filmIndexInList];

  const transformFilmDuration = (): string => {
    const hours = Math.trunc(runTime / 60);
    const minutes = runTime % 60;

    if (runTime < 60) {
      return `${minutes}:00`;
    }

    return `${hours}:${minutes}:00`;
  };

  return (
    <div className="player">
      <video src={videoLink} className="player__video" poster={backgroundImage}></video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{transformFilmDuration()}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg>
            <span>Pause</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
