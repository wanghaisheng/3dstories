import { useEffect } from 'react'
import { currentPage, scrollOffset } from '../GlobalState'
import { useSetAtom } from 'jotai'
import { create } from 'zustand'
import { useMediaQuery } from 'react-responsive'
import { useViewportStore } from './ViewportManager'
import { UAParser } from 'ua-parser-js'

export const useScrollStore = create(set => ({
  scrollRatio: 0,
  page: 0,
  menuLinkPosition: 0,

  setScrollRatio: scrollRatio =>
    set({
      scrollRatio
    }),
  setPage: page =>
    set({
      page
    }),
  setMenuLinkPosition: menuLinkPosition => set({ menuLinkPosition })
}))

const ScrollManager = ({ pages = [], pathname = '/' }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  const windowHeight = useViewportStore(state => state.availableHeight)

  const setScrollOffset = useSetAtom(scrollOffset)
  const setCurrentPage = useSetAtom(currentPage)
  const setScrollRatio = useScrollStore(state => state.setScrollRatio)
  const setPage = useScrollStore(state => state.setPage)

  const parser = new UAParser()
  const device = parser.getDevice()

  console.info('[ScrollManager] rendered', pages)

  useEffect(() => {
    window.scrollTo(0, 0)

    const scrollme = () => {
      if (device.type === 'mobile') window.innerHeight = windowHeight
      const ratio = window.scrollY / (windowHeight * (pages.length - 1))
      const currentPage = Math.round(window.scrollY / windowHeight)
      setScrollOffset(ratio)
      setScrollRatio(ratio)
      setCurrentPage(currentPage)
      setPage(currentPage)
      console.debug('[ScrollManager] @useEffect', ratio)
    }
    window.addEventListener('scroll', scrollme)
    return () => {
      setScrollOffset(0)
      setScrollRatio(0)
      window.removeEventListener('scroll', scrollme)
    }
  }, [pages, pathname, windowHeight])

  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        width: '100%',
        height: pages.length * window.innerHeight
      }}
    >
      {pages.map((d, i, arr) => (
        <div
          className="page-content"
          key={'i' + i}
          style={{
            height: i === arr.length - 1 ? windowHeight + windowHeight / (isBigScreen ? 4 : 2.3) : windowHeight
            // border: '1px solid blue'
          }}
        ></div>
      ))}
    </div>
  )
}

export default ScrollManager
