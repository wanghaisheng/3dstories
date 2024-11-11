import { useLayoutEffect } from 'react'
import { useViewportStore } from '../components/ViewportManager'

const Preloader = ({ pathname }) => {
  const isBackgroundVideoReady = useViewportStore(state => state.isBackgroundVideoReady)

  const preloader = document.getElementById('preloader')

  useLayoutEffect(() => {
    if (isBackgroundVideoReady || pathname === '/') {
      preloader.classList.remove('hidden-preloader')
      setTimeout(() => {
        preloader.classList.add('hidden-preloader')
      }, 4000)
    }
  }, [pathname, isBackgroundVideoReady])

  useLayoutEffect(() => {
    if (pathname !== '/') {
      setTimeout(() => {
        preloader.classList.add('hidden-preloader')
      }, 3000)
    }
  }, [])
}

export default Preloader
