import './video-player.css';
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
    <video
      className="preview-player"
      data-testid="testid"
      ref={videoRef}
      src={previewVideoLink}
      muted
      loop
      poster={previewImage}
    />
  );
}

export default VideoPlayer;
