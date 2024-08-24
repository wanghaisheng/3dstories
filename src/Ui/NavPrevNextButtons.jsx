import { useNavigate, useLocation } from 'react-router-dom'
import CircleButton from './CircleButton'
import { useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useScrollStore } from '../components/ScrollManager'
import { useSpring, a } from '@react-spring/web'
import { RoutesUsingButtons } from '../constants'

const NavPrevNextButtons = ({ threshold = 0, thresholdGoUp = 1, scrollToTop }) => {
  const isVisible = useRef(true)
  const isVisibleScrollUp = useRef(true)
  const initiallScrollRatioRef = useRef(useScrollStore.getState().scrollRatio)
  const isBigScreen = useMediaQuery({ query: '(min-width: 1280px)' })
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const currentRouteIndex = RoutesUsingButtons.findIndex(route => route.pathname === location.pathname)

  const disableNextButton = currentRouteIndex === -1 || currentRouteIndex === RoutesUsingButtons.length - 1
  // const disableNextButton = currentRouteIndex === 0
  const disablePreviousButton = currentRouteIndex < 1

  const handleNext = () => {
    if (!disableNextButton) {
      navigate(RoutesUsingButtons[currentRouteIndex + 1].pathname)
    }
  }

  const handlePrevious = () => {
    if (!disablePreviousButton) {
      console.info('Cannot go back', currentRouteIndex)
      navigate(RoutesUsingButtons[currentRouteIndex - 1].pathname)
    }
  }

  const [styles, api] = useSpring(() => ({
    opacity: initiallScrollRatioRef.current > threshold ? 0 : 1,
    y: initiallScrollRatioRef.current > threshold ? -10 : 0
  }))

  const [stylesScrollUp, apiScrollUp] = useSpring(() => ({
    opacity: initiallScrollRatioRef.current > thresholdGoUp ? 1 : 0,
    y: initiallScrollRatioRef.current > thresholdGoUp ? 10 : 0
  }))

  const [{ x }, apiDisableButtons] = useSpring(() => {
    0
  })

  useEffect(() => {
    apiDisableButtons.start({
      x: currentRouteIndex === -1 ? -300 : 0,
      delay: 500
    })
  }, [currentRouteIndex])
  useEffect(
    () =>
      useScrollStore.subscribe(state => {
        if (state.scrollRatio > threshold && isVisible.current) {
          isVisible.current = false
          api.start({
            opacity: 0,
            y: -10
          })
        } else if (state.scrollRatio <= threshold && !isVisible.current) {
          isVisible.current = true
          api.start({
            opacity: 1,
            y: 0
          })
        }
        if (state.scrollRatio < thresholdGoUp && isVisibleScrollUp.current) {
          isVisibleScrollUp.current = false
          apiScrollUp.start({
            opacity: 0,
            y: -10
          })
        } else if (state.scrollRatio >= thresholdGoUp && !isVisibleScrollUp.current) {
          isVisibleScrollUp.current = true
          apiScrollUp.start({
            opacity: 1,
            y: 0
          })
        }
      }),
    []
  )
  console.info('Go forward', currentRouteIndex)
  console.info('[NavPrevNextButtons] currentRouteIndex:', currentRouteIndex, RoutesUsingButtons, location.pathname)

  return (
    <a.div style={{ x }} className="NavPrevNextButtons z-[3] absolute top-0 bottom-0">
      {pathname !== '/about' ? (
        <div className="fixed w-screen" style={{ top: isBigScreen ? 'calc(50% - 130px)' : '15%' }}>
          <a.div style={styles} className="absolute  flex xl:flex-col md:flex-row left-[1rem] lg:left-[5rem] ">
            <a onClick={handlePrevious} disabled={disablePreviousButton}>
              <CircleButton size={isBigScreen ? 120 : 80} rotate={180} />
            </a>
            <a className="relative" onClick={handleNext} disabled={disableNextButton}>
              <CircleButton size={isBigScreen ? 120 : 80} className="xl:mt-5 xl:ml-0 ml-5" />
            </a>
          </a.div>
        </div>
      ) : null}
      <div
        className="go-to-top z-20 fixed flex flex-col"
        style={{ bottom: 'calc(15% + 50px)', left: isBigScreen ? '5rem' : 'calc(50% - 40px)' }}
      >
        <a.div style={stylesScrollUp}>
          <a onClick={scrollToTop}>
            <CircleButton size={isBigScreen ? 120 : 80} rotate={-90} />
          </a>
        </a.div>
      </div>
    </a.div>
  )
}

export default NavPrevNextButtons
