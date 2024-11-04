import { useEffect, useLayoutEffect } from 'react'
import { useViewportStore } from '../components/ViewportManager'

const Preloader = ({ pathname }) => {
  const isBackgroundVideoReady = useViewportStore(state => state.isBackgroundVideoReady)

  const preloader = document.getElementById('preloader')

  useEffect(() => {
    if (isBackgroundVideoReady || pathname === '/') {
      preloader.classList.remove('hidden-preloader')
      setTimeout(() => {
        preloader.classList.add('hidden-preloader')
      }, 4000)
    }
  }, [pathname, isBackgroundVideoReady])

  useEffect(() => {
    if (pathname !== '/') {
      preloader.classList.add('hidden-preloader')
    }
  }, [])
}

export default Preloader
