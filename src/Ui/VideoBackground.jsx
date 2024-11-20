import { useEffect, useState } from 'react';
import { useViewportStore } from '../components/ViewportManager';

const VideoBackground = ({ pathname }) => {
  const [pauseVideo, setPauseVideo] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      setPauseVideo(false);
      console.log('Play video', pauseVideo);
    } else {
      setPauseVideo(true);
      console.log('Pause video', pauseVideo);
    }
  }, [pathname]);

  const setBackgroundVideoReady = useViewportStore(
    (state) => state.setBackgroundVideoReady
  );

  return (
    <div
      className={`background-video ${
        pauseVideo === false ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ opacity: pauseVideo === false ? 1 : 0 }}
    >
      <video
        src="intro.mp4"
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => {
          console.debug('[Preloader] Video ready');
          setBackgroundVideoReady(true);
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      ></video>
    </div>
  );
};

export default VideoBackground;