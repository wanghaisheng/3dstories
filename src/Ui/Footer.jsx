import LogoFhp from '../Svg/LogoFhp'
import LogoUcl from '../Svg/LogoUcl'
import LogoUni from '../Svg/LogoUni'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { useSpring, a } from '@react-spring/web'
import CircleButton from './CircleButton'
import { useViewportStore } from '../components/ViewportManager'

const Footer = ({ scrollToTop, pathname }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const [isVisibleFooter, setIsVisibleFooter] = useState(false)
  const isBottomVisible = useViewportStore(state => state.isBottomVisible)

  const [stylesScrollUp, apiScrollUp] = useSpring(() => ({
    opacity: scrollY === innerHeight ? 1 : 0,
    y: scrollY === innerHeight ? 10 : 0
  }))
  useEffect(() => {
    console.debug('[Footer] isBottomVisible', isBottomVisible)
    if (!isBottomVisible) {
      setIsVisibleFooter(false)
      apiScrollUp.start({
        opacity: 0,
        y: -10
      })
    } else {
      setIsVisibleFooter(true)
      apiScrollUp.start({
        opacity: 1,
        y: 0
      })
    }
  }, [isBottomVisible])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pathname === '/') {
        document.querySelector('.footer').classList.add('opacity-100')
      } else {
        document.querySelector('.footer').classList.remove('opacity-100')
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <a.footer
      style={stylesScrollUp}
      className={`footer max-w-full md:w-screen ${
        pathname !== '/' && isVisibleFooter === false ? 'pointer-events-none' : 'pointer-events-auto'
      } ${pathname === '/' ? 'relative' : 'fixed'} w-screen bottom-0 left-0 flex flex-wrap p-5 sm:p-10 items-center justify-center`}
    >
      {pathname !== '/' ? (
        <div className="go-to-top z-1 fixed flex flex-col translate-y-[-10rem]">
          <button type="button" aria-label="Go to top" onClick={scrollToTop}>
            <CircleButton size={isBigScreen ? 120 : 60} width={isBigScreen ? 44 : 28} rotate={-90} />
          </button>
        </div>
      ) : null}
      <div className="flex z-40 flex-wrap w-screen justify-between ">
        <div className="footer-left my-3 justify-center md:justify-start flex-wrap flex flex-row items-center flex-grow">
          <LogoFhp width={isBigScreen ? 160 : 90} />
          <LogoUcl className={'ml-5'} width={isBigScreen ? 120 : 80} />
          <LogoUni className={'ml-5'} width={isBigScreen ? 140 : 90} />
        </div>
        <div className="mt-3 md:mt-0 flex items-center footer-right justify-center md:justify-end flex-grow">
          <a
            href="https://www.fh-potsdam.de/impressum"
            aria-label="Link to FH;P impressum"
            rel="no-referrer"
            target="_blank"
          >
            Imprint
          </a>
          <a
            className="ml-5"
            aria-label="Link to FH;P datenschutz"
            href="https://www.fh-potsdam.de/datenschutz"
            rel="no-referrer"
            target="_blank"
          >
            Privacy policy
          </a>
        </div>
      </div>
      <span className="mt-3  flex text-xs grow md:text-right text-center justify-center">
        © University of Applied Arts Potsdam (FHP) & Centre for Contemporary and Digital History Luxembourg (C²DH),
        2024.
      </span>
    </a.footer>
  )
}

export default Footer
