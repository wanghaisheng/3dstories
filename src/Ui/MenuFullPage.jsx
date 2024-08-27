import './MenuFullPage.css'
import { NavLink } from 'react-router-dom'
import { useSpring, a, config } from '@react-spring/web'
import { useEffect } from 'react'
import useStore from '../GlobalState'
import { useMediaQuery } from 'react-responsive'
import FlourishPattern from '../Svg/FlourishPattern'

const MenuFullPage = () => {
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
          </li>
          <li>
            <NavLink to="/greek_style_dress">Greek Style Dress</NavLink>
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
