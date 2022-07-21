import {useRef, useEffect} from 'react';
import {TIME_UNTIL_ACTIVATION_PREVIEW} from '../../const';

type VideoPlayerProps = {
  previewImage: string;
  previewVideoLink: string;
}

function VideoPlayer({previewImage, previewVideoLink}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => videoRef.current?.play(),
      TIME_UNTIL_ACTIVATION_PREVIEW
    );

    return () => clearTimeout(timeoutId);
  });

  return <video ref={videoRef} height="175" width="280" src={previewVideoLink} muted loop poster={previewImage}/>;
}

export default VideoPlayer;
