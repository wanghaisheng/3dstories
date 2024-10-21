import IntroContent from '../Data/intro.json'
import RobeFrancaiseContent from '../Data/robeFrancaise.json'
import ArmorContent from '../Data/armor.json'
import GreekStyleDressContent from '../Data/greekStyleDress.json'
import DoubletContent from '../Data/doublet.json'
import { useLocation } from 'react-router-dom'
import ScrollManager, { useScrollStore } from './ScrollManager'
import Feature from '../Ui/Feature'
import { useEffect, useRef, useState } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import { useMediaQuery } from 'react-responsive'
import { useViewportStore } from './ViewportManager'
import Vimeo from '@u-wave/react-vimeo'
import ScrollDownIndicator from '../Ui/ScrollDownIndicator'
// import { modalVisible } from '../GlobalState'
// import { useAtom } from 'jotai'

const IntroRoute = '/'
const RobexRoute = '/robe'
const ArmorRoute = '/armor'
const DoubletRoute = '/doublet'
const GreekStyleDressRoute = '/greek_style_dress'

const AvailableContents = {
  [RobexRoute]: RobeFrancaiseContent,
  [ArmorRoute]: ArmorContent,
  [DoubletRoute]: DoubletContent,
  [GreekStyleDressRoute]: GreekStyleDressContent,
  [IntroRoute]: IntroContent
}
const ContentManager = ({ openModal, scrollToTop }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  const availableHeight = useViewportStore(state => state.availableHeight)
  // Fetch initial state
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const totalPagesRef = useRef(0)
  const [displayIndicator, setDisplayIndicator] = useState(true)

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
        if (pageRef.current === 0) {
          setDisplayIndicator(true)
        } else {
          setDisplayIndicator(false)
        }
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

  // function processDescription(description) {
  //   let newdescription = description.split(' ')
  //   return <div>
  //     {newdescription.map((d, i) => (
  //       if(d.includes('<word')) {
  //         <OpenModal text="new var"/>}
  //     ))}
  //   </div>
  // }

  return (
    <>
      <a.div
        style={styles}
        className={`ContentManager ${displayIndicator === true ? 'display-indicator' : ''} ${pathname === '/' ? 'index-page' : ''} flex flex-col items-center fixed`}
      >
        <div className="absolute w-screen h-screen flex items-end pointer-events-none">
          <ScrollDownIndicator className={'mb-10'}></ScrollDownIndicator>
        </div>
        {pathname === '/' ? (
          <div className="IntroPage background-video">
            <Vimeo
              video="https://vimeo.com/1021606397/0c67cd3435"
              autoplay
              loop
              muted
              showByline={false}
              showTitle={false}
              showPortrait={false}
              controls={false} // Hide controls
              background
            />
          </div>
        ) : null}
        {contents.sections.map((d, i, arr) => (
          <div
            id={`slide-${d.id}`}
            style={{ height: availableHeight }}
            className={`flex slides ${
              i === 0
                ? `sm:translate-x-[0rem] md:translate-x-[-1rem] lg:translate-x-[-2rem] xl:translate-x-[-14rem] max-w-[100%] xl:max-w-[65%]  items-center ${
                    isBigScreen ? 'mt-0' : 'mt-[3rem]'
                  }`
                : `translate-x-[0rem] md:translate-x-[-14rem] md:max-w-[60%] lg:max-w-[50%] 2xl:max-w-[40%] items-center`
            }`}
            key={d.path ?? i}
          >
            <Feature
              scrollToTop={scrollToTop}
              openModal={openModal}
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
