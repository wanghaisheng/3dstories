import RobeFeaturesContent from '../Data/robe.json'
import KnightContent from '../Data/knight.json'
import AboutContent from '../Data/about.json'
import { useLocation } from 'react-router-dom'
import ScrollManager, { useScrollStore } from './ScrollManager'
import Feature from '../Ui/Feature'
import { useEffect, useRef } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import { useMediaQuery } from 'react-responsive'
// import { RoutesUsingButtons } from '../constants'

const IndexRoute = '/'
const AboutRoute = '/about'
const KnightRoute = '/knight'

const AvailableContents = {
  [IndexRoute]: RobeFeaturesContent,
  [AboutRoute]: AboutContent,
  [KnightRoute]: KnightContent
}
const ContentManager = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  // Fetch initial state
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const totalPagesRef = useRef(0)

  const { pathname } = useLocation()

  const contents = AvailableContents[pathname]

  const [styles, api] = useSpring(() => ({
    y: 0,
    config: config.slow
  }))

  useEffect(() => {
    console.info('[ContentManager] @useEffect pathname', pathname)
    totalPagesRef.current = contents.sections.length
  }, [pathname])

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio * (totalPagesRef.current - 1)
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        // api.start({
        //   y: -window.innerHeight * pageRef.current,
        // })
        console.info('[ContentManager] page changed', pageRef.current)
      }
      api.start({
        y: -window.innerHeight * ratioRef.current
      })
      // console.info('[ContentManager] scrolling', ratioRef.current)
    })
  }, [])

  return (
    <>
      <a.div style={styles} className="ContentManager fixed">
        {contents.sections.map((d, i, arr) => (
          <div
            className={`ContentManager h-screen flex ${
              i === 0
                ? `sm:translate-x-[0rem] md:translate-x-[1rem] lg:translate-x-[4rem] xl:translate-x-[14rem] lg:max-w-[50%] ${
                    isBigScreen ? 'items-center' : 'items-end'
                  }`
                : `sm:translate-x-[0rem] lg:translate-x-[4rem] md:max-w-[60%] lg:max-w-[50%] 2xl:max-w-[40%] items-center`
            }`}
            key={d.path ?? i}
          >
            <Feature
              contents={contents}
              title={d.title}
              description={d.description}
              i={i}
              lastItem={i === arr.length - 1 ? true : false}
            />
          </div>
        ))}
      </a.div>
      <ScrollManager pages={contents.sections} pathname={pathname} />
    </>
  )
}

export default ContentManager
