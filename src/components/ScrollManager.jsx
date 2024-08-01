import { useEffect, useRef } from 'react'
import { currentPage, scrollOffset } from '../GlobalState'
import { useSetAtom } from 'jotai'
import { create } from 'zustand'
import { useMediaQuery } from 'react-responsive'

export const useScrollStore = create((set) => ({
  scrollRatio: 0,
  page: 0,
  setScrollRatio: (scrollRatio) =>
    set({
      scrollRatio,
    }),
  setPage: (page) =>
    set({
      page,
    }),
}))

const ScrollManager = ({ pages = [] }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  const windowHeight = useRef(window.innerHeight)
  const setScrollOffset = useSetAtom(scrollOffset)
  const setCurrentPage = useSetAtom(currentPage)
  const setScrollRatio = useScrollStore((state) => state.setScrollRatio)
  const setPage = useScrollStore((state) => state.setPage)

  console.info('[ScrollManager] rendered', pages)

  useEffect(() => {
    const scrollme = () => {
      const ratio = window.scrollY / (windowHeight.current * (pages.length - 1))
      const currentPage = Math.round(window.scrollY / windowHeight.current)
      setScrollOffset(ratio)
      setScrollRatio(ratio)
      setCurrentPage(currentPage)
      setPage(currentPage)
      console.info('[ScrollManager] scrolling', pages.length, window.scrollY, ratio, currentPage)
    }
    const resize = () => {
      windowHeight.current = window.innerHeight
      console.info('resize', window.innerHeight)
    }
    window.addEventListener('scroll', scrollme)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('scroll', scrollme)
      window.removeEventListener('resize', resize)
    }
  }, [pages])
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        width: '100%',
        height: pages.length * window.innerHeight,
      }}
    >
      {pages.map((d, i, arr) => (
        <div
          className='page-content'
          key={'i' + i}
          style={{
            height:
              i === arr.length - 1
                ? window.innerHeight + window.innerHeight / (isBigScreen ? 4 : 3)
                : window.innerHeight,
            // border: '1px solid blue',
          }}
        ></div>
      ))}
    </div>
  )
}

export default ScrollManager
