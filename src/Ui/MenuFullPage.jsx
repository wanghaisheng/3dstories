import './MenuFullPage.css'
import RobeFrancaiseContent from '../Data/robeFrancaise.json'
import DoubletContent from '../Data/doublet.json'
import GreekStyleDressContent from '../Data/greekStyleDress.json'
import { NavLink } from 'react-router-dom'
import { useSpring, a, config } from '@react-spring/web'
import { useEffect } from 'react'
import useStore from '../GlobalState'
import { useMediaQuery } from 'react-responsive'
import FlourishPattern from '../Svg/FlourishPattern'
import { useViewportStore } from '../components/ViewportManager'
import { useLocation } from 'react-router-dom'

const Navigation = ({ slides }) => {
  const availableHeight = useViewportStore(state => state.availableHeight)
  const scrollToSlide = (id, length) => {
    const fullHeight = availableHeight * length
    // document.getElementById(`slide-${id}`).scrollIntoView({ behavior: 'smooth' })
    window.scrollTo(0, availableHeight * id)
    console.log('ID', id, length, fullHeight)
  }

  return (
    <nav>
      <ul>
        {slides.sections.map((slide, i, arr) =>
          slide.title ? (
            <li key={slide.id} className={`text-sm mt-1 slide-${slide.id}`}>
              <button onClick={() => scrollToSlide(slide.id, arr.length)}>{slide.title}</button>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  )
}

const MenuFullPage = () => {
  const { pathname } = useLocation()
  const isMenuOpen = useStore(state => state.isMenuOpen)
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })

  const [styles, api] = useSpring(() => ({
    transform: 'translateX(-100%)',
    config: config.slow
  }))

  useEffect(() => {
    console.log('API', api.start)
    api.start({
      transform: isMenuOpen ? 'translateX(0%)' : 'translateX(-100%)',
      opacity: isMenuOpen ? 1 : 0
    })
  }, [isMenuOpen])

  return (
    <a.section style={styles} className="MenuFullPage z-100">
      <menu className="flex flex">
        <ul className="flex flex-col items-center">
          <li>
            <NavLink to="/">A luxurious Robe à la francaise</NavLink>
            {pathname === '/' ? <Navigation slides={RobeFrancaiseContent} /> : null}
          </li>
          <li>
            <NavLink to="/doublet">The Doublet in the 17th century</NavLink>
            {pathname === '/doublet' ? <Navigation slides={DoubletContent} /> : null}
          </li>
          <li>
            <NavLink to="/greek_style_dress">Greek Style Dress</NavLink>
            {pathname === '/greek_style_dress' ? <Navigation slides={GreekStyleDressContent} /> : null}
          </li>
          {/* <li>
            <NavLink to='/riegelhauber'>Riegelhaube</NavLink>
          </li> */}
          <hr />
          <li>
            <NavLink to="/about">About Project</NavLink>
          </li>
        </ul>
      </menu>
      <FlourishPattern
        width={isBigScreen ? 400 : 150}
        className={`${isBigScreen ? 'bottom-[3rem] right-[3rem]' : 'bottom-[1rem] right-[1rem]'} `}
      />
      <FlourishPattern
        width={isBigScreen ? 400 : 150}
        className={`${isBigScreen ? 'bottom-[3rem] left-[3rem]' : 'bottom-[1rem] left-[1rem]'} scale-x-[-1]`}
      />
    </a.section>
  )
}

export default MenuFullPage
