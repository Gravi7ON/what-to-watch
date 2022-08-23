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

  return (
    <video data-testid="testid" style={{width: '100%', height: '100%', objectFit: 'cover'}}
      ref={videoRef} src={previewVideoLink} muted loop poster={previewImage}
    />
  );
}

export default VideoPlayer;
