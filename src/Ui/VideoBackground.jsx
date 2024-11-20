import Vimeo from '@u-wave/react-vimeo'
import { useViewportStore } from '../components/ViewportManager'
import { useEffect, useState } from 'react'

const VideoBackground = ({ pathname }) => {
  const [pauseVideo, setPauseVideo] = useState(false)

  useEffect(() => {
    if (pathname === '/') {
      setPauseVideo(false)
      console.log('Play video', pauseVideo)
    } else {
      setPauseVideo(true)
      console.log('Pause video', pauseVideo)
    }
  }, [pathname])

  const setBackgroundVideoReady = useViewportStore(state => state.setBackgroundVideoReady)
  return (
    <div
      className={`background-video ${pauseVideo === false ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity: pauseVideo === false ? 1 : 0 }}
    >
      <Vimeo
        video="https://vimeo.com/1021606397/0c67cd3435"
        paused={pauseVideo}
        loop
        muted
        showByline={false}
        showTitle={false}
        showPortrait={true}
        controls={false} // Hide controls
        // background
        onReady={e => {
          console.debug('[Preloader] onPlay', e)
          e.play().then(() => {
            console.debug('Video is playing')
            setBackgroundVideoReady(true)
          })
          // debugger
          //
        }}
        onPlaying={e => {
          console.debug('[Preloader] onPlaying', e)
        }}
        onProgress={e => {
          console.debug('[Preloader] onProgress', e)
        }}
      />
    </div>
  )
}

export default VideoBackground
