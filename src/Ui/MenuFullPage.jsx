import './MenuFullPage.css'
import RobeFrancaiseContent from '../Data/robeFrancaise.json'
import DoubletContent from '../Data/doublet.json'
import ArmorContent from '../Data/armor.json'
import GreekStyleDressContent from '../Data/greekStyleDress.json'
import { NavLink } from 'react-router-dom'
import { useSpring, a } from '@react-spring/web'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useStore from '../GlobalState'
import { useMediaQuery } from 'react-responsive'
import FlourishPattern from '../Svg/FlourishPattern'
import { useViewportStore } from '../components/ViewportManager'
import { useLocation } from 'react-router-dom'
import { useScrollStore } from '../components/ScrollManager'

// eslint-disable-next-line react/prop-types
const Navigation = ({ data }) => {
  const [activeSlideId, setActiveSlideId] = useState(null)
  const availableHeight = useViewportStore(state => state.availableHeight)
  const toggleMenu = useStore(state => state.toggleMenu)
  const isMenuOpen = useStore(state => state.isMenuOpen)
  const setMenuLinkPosition = useScrollStore(state => state.setMenuLinkPosition)
  const toggleMenuTimerRef = useRef(null)
  const setClickedSlideId = useStore(state => state.setClickedSlideId)
  // const setClickedSlideId = useStore(state => state.setClickedSlideId)
  // const [clickedSlideId, setClickedSlideId] = useState(null)

  const scrollToSlide = id => {
    // const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

    if (isMenuOpen) {
      setClickedSlideId(true)
      clearTimeout(toggleMenuTimerRef.current)
      toggleMenuTimerRef.current = setTimeout(() => {
        toggleMenu()
        setClickedSlideId(false)
      }, 750)
    }
    const top = availableHeight * (id - 1)
    console.debug('[Navigation] scrollToSlide', id, top)

    window.scrollTo({
      top: availableHeight * (id - 1),
      behavior: 'instant'
    })
    setMenuLinkPosition(top)
  }
  // Update active slide ID based on scroll position
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + availableHeight / 2
      const activeSlide = data.sections.find((slide, i) => {
        const slideTop = availableHeight * i
        const slideBottom = slideTop + availableHeight
        return scrollPosition >= slideTop && scrollPosition < slideBottom
      })

      if (activeSlide) {
        setActiveSlideId(activeSlide.id)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(toggleMenuTimerRef.current)
    }
  }, [availableHeight, data.sections])

  return (
    <nav>
      <ul>
        {data.sections.map((slide, i, arr) =>
          slide.title && i !== 0 ? (
            <li key={slide.id} className={`sub-menu slide-${slide.id} ${slide.id === activeSlideId ? 'active' : ''}`}>
              <button
                onClick={() => scrollToSlide(slide.id, arr.length, i)}
                dangerouslySetInnerHTML={{ __html: slide.title }}
              ></button>
            </li>
          ) : slide.title ? (
            <li
              key={slide.id}
              className={`sub-menu-header slide-${slide.id} ${slide.id === activeSlideId ? 'active' : ''}`}
            >
              <button
                onClick={() => scrollToSlide(slide.id, arr.length, i)}
                dangerouslySetInnerHTML={{ __html: slide.title }}
              ></button>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  )
}

const MenuFullPage = () => {
  const { pathname } = useLocation()
  const [pathnameUpdated, setPathnameUpdated] = useState(pathname)
  const pathnameUpdatedTimerRef = useRef(null)
  const isMenuOpen = useStore(state => state.isMenuOpen)
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
  const clickedSlideId = useStore(state => state.clickedSlideId)

  const duration = { duration: 200 } // Set the duration to 500ms or any desired value
  const [styles, api] = useSpring(() => ({
    config: duration,
    opacity: 0
  }))
  useEffect(() => {
    pathnameUpdatedTimerRef.current = setTimeout(() => {
      setPathnameUpdated(pathname)
    }, 1000)
    return () => {
      clearTimeout(pathnameUpdatedTimerRef.current)
    }
  }, [pathname])

  useEffect(() => {
    console.debug('API', api.start)
    if (isMenuOpen) {
      api.start({
        opacity: 1
      })
    } else {
      api.start({
        opacity: 0
      })
    }
  }, [isMenuOpen])

  return (
    <a.section
      style={styles}
      className={`MenuFullPage ${clickedSlideId === true ? 'black' : ''} z-100 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <menu className=" flex">
        <ul className="flex flex-col items-center">
          <li>
            <NavLink to="/">Introduction</NavLink>
          </li>
          <li>
            {pathnameUpdated !== '/robe' ? <NavLink to="/robe">Textile opulence</NavLink> : null}
            {pathnameUpdated === '/robe' ? <Navigation data={RobeFrancaiseContent} /> : null}
          </li>
          <li>
            {pathnameUpdated !== '/armor' ? (
              <NavLink to="/armor">A plate armor for Elector Christian I. of Saxony</NavLink>
            ) : null}
            {pathnameUpdated === '/armor' ? <Navigation data={ArmorContent} /> : null}
          </li>
          <li>
            {pathnameUpdated !== '/doublet' ? <NavLink to="/doublet">The Doublet in the 17th century</NavLink> : null}
            {pathnameUpdated === '/doublet' ? <Navigation data={DoubletContent} /> : null}
          </li>
          <li>
            {pathnameUpdated !== '/greek_style_dress' ? (
              <NavLink to="/greek_style_dress">Greek Style Dress</NavLink>
            ) : null}
            {pathnameUpdated === '/greek_style_dress' ? <Navigation data={GreekStyleDressContent} /> : null}
          </li>
        </ul>
      </menu>
      <FlourishPattern
        width={isBigScreen ? 400 : 150}
        className={`${isBigScreen ? 'bottom-[3rem] right-[3rem]' : 'bottom-[1rem] right-[1rem]'} pointer-events-none`}
      />
      <FlourishPattern
        width={isBigScreen ? 400 : 150}
        className={`${isBigScreen ? 'bottom-[3rem] left-[3rem]' : 'bottom-[1rem] left-[1rem]'} scale-x-[-1] pointer-events-none`}
      />
    </a.section>
  )
}

export default MenuFullPage
