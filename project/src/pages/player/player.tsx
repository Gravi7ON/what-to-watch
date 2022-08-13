import {useParams} from 'react-router-dom';
import browserHistory from '../../browser-history';
// import PlayerControls from '../../components/player-controls/player-controls';
import {ScreenProps, FilmId} from '../../types/films';

function Player({films}: ScreenProps): JSX.Element {
  const {id = '1'} = useParams<FilmId>() ;
  const filmIndexInList: number = Number(id) - 1;

  // const videoRef = useRef<HTMLVideoElement | null>(null);

  // const [durationFilm, setDurationFilm] = useState<string | undefined>('');

  // useEffect(() => {
  //   if (!videoRef.current) {
  //     return;
  //   }
  //   videoRef.current.addEventListener('loadedmetadata', () => {
  //     setDurationFilm(videoRef.current?.duration.toFixed());
  //   });
  // }, []);

  const {videoLink, backgroundImage} = films[filmIndexInList];

  return (
    <div className="player">
      <video controls src={videoLink} autoPlay className="player__video" poster={backgroundImage}></video>

      <button onClick={() => {
        browserHistory.back();
      }} type="button" className="player__exit"
      >Exit
      </button>

      {/* <PlayerControls durationFilm={durationFilm} /> */}
    </div>
  );
}

export default Player;
