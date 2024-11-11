import './MenuFullPage.css'
import RobeFrancaiseContent from '../Data/robeFrancaise.json'
import DoubletContent from '../Data/doublet.json'
import ArmorContent from '../Data/armor.json'
import GreekStyleDressContent from '../Data/greekStyleDress.json'
import { NavLink } from 'react-router-dom'
import { useSpring, a, config } from '@react-spring/web'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useStore from '../GlobalState'
import { useMediaQuery } from 'react-responsive'
import FlourishPattern from '../Svg/FlourishPattern'
import { useViewportStore } from '../components/ViewportManager'
import { useLocation } from 'react-router-dom'

const Navigation = ({ data }) => {
  const [activeSlideId, setActiveSlideId] = useState(null)
  const availableHeight = useViewportStore(state => state.availableHeight)
  const toggleMenu = useStore(state => state.toggleMenu)
  const isMenuOpen = useStore(state => state.isMenuOpen)
  const scrollToSlide = (id, length, i) => {
    if (isMenuOpen) {
      toggleMenu()
    }
    window.scrollTo({
      top: availableHeight * (id - 1),
      behavior: 'smooth' // Optional: for smooth scrolling§
    })
    console.log('ID', id, length, i)
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
    console.log('API', api.start)
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
      className={`MenuFullPage z-100 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <menu className=" flex">
        <ul className="flex flex-col items-center">
          <li>
            <NavLink to="/">Introduction</NavLink>
          </li>
          <li>
            {pathnameUpdated !== '/robe' ? <NavLink to="/robe">A luxurious Robe à la francaise</NavLink> : null}
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
          <hr />
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
