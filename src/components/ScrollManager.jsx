import { useEffect, useRef } from 'react'
import { currentPage, scrollOffset } from '../GlobalState'
import { useSetAtom } from 'jotai'
import { create } from 'zustand'
import { useMediaQuery } from 'react-responsive'
import { useViewportStore } from './ViewportManager'

export const useScrollStore = create(set => ({
  scrollRatio: 0,
  page: 0,
  setScrollRatio: scrollRatio =>
    set({
      scrollRatio
    }),
  setPage: page =>
    set({
      page
    })
}))

const ScrollManager = ({ pages = [], pathname = '/' }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  const windowHeight = useViewportStore(state => state.availableHeight)

  const setScrollOffset = useSetAtom(scrollOffset)
  const setCurrentPage = useSetAtom(currentPage)
  const setScrollRatio = useScrollStore(state => state.setScrollRatio)
  const setPage = useScrollStore(state => state.setPage)

  console.info('[ScrollManager] rendered', pages)

  useEffect(() => {
    console.debug('[ScrollManager] @useEffect', '\n - pathname:', pathname, '\n - pathname:', pages.length)
    window.scrollTo(0, 0)
    const scrollme = () => {
      const ratio = window.scrollY / (windowHeight * (pages.length - 1))
      const currentPage = Math.round(window.scrollY / windowHeight)
      setScrollOffset(ratio)
      setScrollRatio(ratio)
      setCurrentPage(currentPage)
      setPage(currentPage)
    }

    window.addEventListener('scroll', scrollme)
    return () => {
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
          style={
            {
              // height:
              //   i === arr.length - 1
              //     ? window.innerHeight + window.innerHeight / (isBigScreen ? 4 : 3)
              //     : window.innerHeight
              // border: '1px solid blue',
            }
          }
        ></div>
      ))}
    </div>
  )
}

export default ScrollManager
