import { useEffect, useRef } from 'react'
import { UAParser } from 'ua-parser-js'
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
  },
  isBackgroundVideoReady: false,
  setBackgroundVideoReady: isBackgroundVideoReady => set({ isBackgroundVideoReady }),

  isBottomVisible: false,
  setBottomVisible: isBottomVisible => set({ isBottomVisible })
}))

const ViewportManager = () => {
  const parser = new UAParser()
  const device = parser.getDevice()

  console.info('[ViewportManager] \n - navigator.userAgent', navigator.userAgent, '\n - device:', device)
  const isPortrait = useRef(window.innerHeight > window.innerWidth)

  const [updateOrientation, updateAvailableDimensions] = useViewportStore(state => [
    state.updateOrientation,
    state.updateAvailableDimensions
  ])

  useEffect(() => {
    const resize = () => {
      // windowHeight.current = window.innerHeight
      if (device.type === 'mobile') {
        // detect if the device CHANGED from portrait to landscape mode
        if (!isPortrait.current && window.innerHeight > window.innerWidth) {
          console.log('[ViewportManager] @useEffect MOBILE resize dimensions...')
          isPortrait.current = true
          updateAvailableDimensions()
          updateOrientation()
        } else if (isPortrait.current && window.innerHeight < window.innerWidth) {
          console.info('[ViewportManager] @useEffect MOBILE resize dimensions...')
          isPortrait.current = false
          updateOrientation()
          updateAvailableDimensions()
        }
      } else {
        console.info('[ViewportManager] @useEffect resize dimensions...')
        updateAvailableDimensions()
      }
    }

    window.addEventListener('resize', resize)

    return () => {
      console.info('[ViewportManager] @useEffect cleanup')
      window.removeEventListener('resize', resize)
    }
  }, [window.innerHeight])
}

export default ViewportManager
