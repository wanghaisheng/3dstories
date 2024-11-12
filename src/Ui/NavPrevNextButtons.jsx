import { useNavigate, useLocation } from 'react-router-dom'
import CircleButton from './CircleButton'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useScrollStore } from '../components/ScrollManager'
import { RoutesUsingButtons } from '../constants'

const NavPrevNextButtons = ({ className }) => {
  const initiallScrollRatioRef = useRef(useScrollStore.getState().scrollRatio)
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const currentRouteIndex = RoutesUsingButtons.findIndex(route => route.pathname === location.pathname)

  const disableNextButton = currentRouteIndex === -1 || currentRouteIndex === RoutesUsingButtons.length - 1
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

  return (
    <div className={`button-control-group ${className} self-start lg:self-center`}>
      <div className="NavPrevNextButtons z-[1]  flex justify-center items-center">
        {pathname !== '/' ? (
          <div className="mb-5 lg:mb-0">
            <div
              className={` ${initiallScrollRatioRef.current > 1 ? 'pointer-event-auto' : 'pointer-event-none'} flex lg:flex-col lg:flex-row`}
            >
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous Story"
                disabled={disablePreviousButton}
              >
                <CircleButton size={isBigScreen ? 100 : 60} width={isBigScreen ? 44 : 28} rotate={180} />
              </button>
              <button
                type="button"
                className="relative"
                aria-label="Next Story"
                onClick={handleNext}
                disabled={disableNextButton}
              >
                <CircleButton
                  size={isBigScreen ? 100 : 60}
                  width={isBigScreen ? 44 : 28}
                  className="lg:mt-5 lg:ml-0 ml-5"
                />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default NavPrevNextButtons
