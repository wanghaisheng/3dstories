import RobeFeaturesContent from '../Data/contents.json'
import { useLocation } from 'react-router-dom'
import ScrollManager, { useScrollStore } from './ScrollManager'
import Feature from '../Ui/Feature'
import { useEffect, useRef } from 'react'
import { useSpring, a, config } from 'react-spring'
import { useMediaQuery } from 'react-responsive'

const IndexRoute = '/'

const AvailableContents = {
  IndexRoute: RobeFeaturesContent,
}
const Features = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  // Fetch initial state
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const location = useLocation()
  const contents = AvailableContents[location.pathname] ?? AvailableContents.IndexRoute

  console.info('[Features] rendering...', contents.sections.length)

  const [styles, api] = useSpring(() => ({
    y: 0,
    config: config.slow,
  }))

  useEffect(() => {
    return useScrollStore.subscribe((state) => {
      ratioRef.current = state.scrollRatio * (contents.sections.length - 1)
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        // api.start({
        //   y: -window.innerHeight * pageRef.current,
        // })
        console.info('[Features] page changed', pageRef.current)
      }
      api.start({
        y: -window.innerHeight * ratioRef.current,
      })
      // console.info('[Features] scrolling', ratioRef.current)
    })
  }, [])

  return (
    <>
      <a.div style={styles} className='Features fixed'>
        {location.pathname}
        {contents.sections.map((d, i, arr) => (
          <div
            className={`Features h-screen flex ${
              i === 0
                ? `sm:translate-x-[0rem] md:translate-x-[1rem] lg:translate-x-[4rem] xl:translate-x-[14rem] lg:max-w-[50%] ${
                    isBigScreen ? 'items-center' : 'items-end'
                  }`
                : `sm:translate-x-[0rem] lg:translate-x-[4rem] md:max-w-[60%] lg:max-w-[50%] 2xl:max-w-[40%] items-center`
            }`}
            key={d.path}
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
      <ScrollManager pages={contents.sections} />
    </>
  )
}

export default Features
