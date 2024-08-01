import { useNavigate, useLocation } from 'react-router-dom'
import CircleButton from './CircleButton'
import { useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useScrollStore } from '../components/ScrollManager'
import { useSpring, a } from 'react-spring'

const routes = ['/', '/knight', '/riegelhauber']

const NavPrevNextButtons = ({ threshold = 0, thresholdGoUp = 1, scrollToTop }) => {
  const isVisible = useRef(true)
  const isVisibleScrollUp = useRef(true)
  const initiallScrollRatioRef = useRef(useScrollStore.getState().scrollRatio)
  const isBigScreen = useMediaQuery({ query: '(min-width: 1280px)' })
  const navigate = useNavigate()
  const location = useLocation()
  const currentIndex = routes.indexOf(location.pathname)

  const handleNext = () => {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1])
    }
  }

  const [styles, api] = useSpring(() => ({
    opacity: initiallScrollRatioRef.current > threshold ? 0 : 1,
    y: initiallScrollRatioRef.current > threshold ? -10 : 0,
  }))

  const [stylesScrollUp, apiScrollUp] = useSpring(() => ({
    opacity: initiallScrollRatioRef.current > thresholdGoUp ? 1 : 0,
    y: initiallScrollRatioRef.current > thresholdGoUp ? 10 : 0,
  }))

  useEffect(
    () =>
      useScrollStore.subscribe((state) => {
        if (state.scrollRatio > threshold && isVisible.current) {
          isVisible.current = false
          api.start({
            opacity: 0,
            y: -10,
          })
        } else if (state.scrollRatio <= threshold && !isVisible.current) {
          isVisible.current = true
          api.start({
            opacity: 1,
            y: 0,
          })
        }
        if (state.scrollRatio < thresholdGoUp && isVisibleScrollUp.current) {
          isVisibleScrollUp.current = false
          apiScrollUp.start({
            opacity: 0,
            y: -10,
          })
        } else if (state.scrollRatio >= thresholdGoUp && !isVisibleScrollUp.current) {
          isVisibleScrollUp.current = true
          apiScrollUp.start({
            opacity: 1,
            y: 0,
          })
        }
      }),
    [],
  )

  return (
    <>
      <div className='fixed z-10 w-screen' style={{ top: isBigScreen ? 'calc(50% - 130px)' : '15%' }}>
        <a.div style={styles} className='absolute  flex xl:flex-col md:flex-row left-[1rem] lg:left-[5rem] '>
          <a onClick={handlePrevious} disabled={currentIndex === 0}>
            <CircleButton size={isBigScreen ? 120 : 80} rotate={180} />
          </a>
          <a className='relative' onClick={handleNext} disabled={currentIndex === routes.length - 1}>
            <CircleButton size={isBigScreen ? 120 : 80} className='xl:mt-5 xl:ml-0 ml-5' />
          </a>
        </a.div>
      </div>
      <div
        className='go-to-top z-20 fixed flex flex-col'
        style={{ bottom: 'calc(15% + 50px)', left: isBigScreen ? '5rem' : 'calc(50% - 40px)' }}
      >
        <a.div style={stylesScrollUp}>
          <a onClick={scrollToTop}>
            <CircleButton size={isBigScreen ? 120 : 80} rotate={-90} />
          </a>
        </a.div>
      </div>
    </>
  )
}

export default NavPrevNextButtons
