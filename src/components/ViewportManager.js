import { useEffect } from 'react'
import { create } from 'zustand'

export const useViewportStore = create(set => ({
  availableHeight: window.innerHeight,
  availableWidth: window.innerWidth,
  setAvailableHeight: availableHeight => set({ availableHeight }),
  setAvailableWidth: availableWidth => set({ availableWidth }),
  updateAvailableDimensions: () => {
    set({
      availableHeight: window.innerHeight,
      availableWidth: window.innerWidth
    })
  },
  isPortrait: window.innerHeight > window.innerWidth,
  isLandscape: window.innerHeight < window.innerWidth,
  updateOrientation: () => {
    set({
      isPortrait: window.innerHeight > window.innerWidth,
      isLandscape: window.innerHeight < window.innerWidth
    })
  }
}))

const ViewportManager = () => {
  console.info('[ViewportManager] navigator.userAgent', navigator.userAgent)
  const updateAvailableDimensions = useViewportStore(state => state.updateAvailableDimensions)
  useEffect(() => {
    console.info('[ViewportManager] @useEffect')
    const resize = () => {
      // windowHeight.current = window.innerHeight
      updateAvailableDimensions()
      console.info('resize', window.innerHeight)
    }
    window.addEventListener('resize', resize)
    return () => {
      console.info('[ViewportManager] @useEffect cleanup')
      window.removeEventListener('resize', resize)
    }
  }, [])
}

export default ViewportManager
