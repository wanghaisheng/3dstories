import { useEffect } from 'react'
import { useViewportStore } from '../components/ViewportManager'

const Preloader = ({ pathname }) => {
  const isBackgroundVideoReady = useViewportStore(state => state.isBackgroundVideoReady)

  useEffect(() => {
    const preloader = document.getElementById('preloader')
    if (!preloader) {
      console.warn('[Preloader] preloader not found, make sure you have a div with id="preloader"')
      return
    }
    console.info('[Preloader] isBackgroundVideoReady', isBackgroundVideoReady)
    setTimeout(() => {
      if (isBackgroundVideoReady) preloader.classList.add('hidden-preloader')
    }, 1500)
  }, [isBackgroundVideoReady])
}

export default Preloader
