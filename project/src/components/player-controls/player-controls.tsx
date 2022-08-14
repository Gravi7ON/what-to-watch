type PlayerControlsProps = {
  durationFilm: string | undefined
}

function PlayerControls({durationFilm}: PlayerControlsProps): JSX.Element {
  const transformFilmDuration = (duration: number): string => {
    const SECONDS = 60;
    const MINUTES = 60;
    const HOUR = 3600;
    const second = duration % SECONDS;
    const minute = Math.floor((duration - second) / SECONDS % MINUTES);
    const hour = Math.floor((duration - second) / SECONDS / MINUTES);

    if (duration < SECONDS) {
      return `00:${duration}`;
    }

    if (duration >= SECONDS && duration < HOUR) {
      return `${minute}:${second}`;
    }

    return `${hour}:${minute}:${second}`;
  };

  return (
    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value="30" max="100"></progress>
          <div className="player__toggler">Toggl/er</div>
        </div>
        <div className="player__time-value">{transformFilmDuration(Number(durationFilm))}</div>
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
  );
}

export default PlayerControls;
