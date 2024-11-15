import CloseButton from '../Ui/CloseButton'
import ZoomInIcon from '../Svg/ZoomInIcon'
import ZoomOutIcon from '../Svg/ZoomOutIcon'
import RotateIcon from '../Svg/RotateIcon'
import MoveIcon from '../Svg/MoveIcon'
import MouseLeftIcon from '../Svg/MouseLeftIcon'
import MouseMiddleIcon from '../Svg/MouseMiddleIcon'
import MouseRightIcon from '../Svg/MouseRightIcon'
import { useEffect, useState } from 'react'
import InfoIcon from '../Svg/InfoIcon.jsx'
import { useSpring, a, config } from '@react-spring/web'

const InfoPanel = ({ mobile = false }) => {
  const [showInfoPanel, setShowInfoPanel] = useState(false)

  useEffect(() => {
    toggleInfoPanel
  }, [showInfoPanel])

  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel)
    console.debug('SHOW-INFO-PANEL', showInfoPanel)
  }

  const [styles, api] = useSpring(() => ({
    transform: 'translateX(-100%)',
    config: config.slow
  }))

  const [stylesI, apiI] = useSpring(() => ({
    transform: 'translateX(100%)',
    config: config.slow
  }))

  const [stylesMobile, apiMobile] = useSpring(() => ({
    transform: 'translateY(-200%)',
    config: config.slow
  }))

  const [stylesIMobile, apiIMobile] = useSpring(() => ({
    transform: 'translateY(200%)',
    config: config.slow
  }))

  useEffect(() => {
    // console.debug('API', api.start)
    api.start({
      transform: showInfoPanel ? 'translateX(0%)' : 'translateX(-200%)'
    })
    apiI.start({
      transform: showInfoPanel ? 'translateX(-300%)' : 'translateX(0%)'
    })
    apiMobile.start({
      transform: showInfoPanel ? 'translateY(-10%) ' : 'translateY(20%)'
    })
    apiIMobile.start({
      transform: showInfoPanel ? 'translateY(350%) ' : 'translateY(0%)'
    })
  }, [showInfoPanel])

  return mobile === true ? (
    <>
      <a.div
        className="InfoIcon-wrapper absolute w-full flex items-center justify-center bottom-[6rem] z-[2]"
        style={stylesIMobile}
      >
        <InfoIcon opacity={0.4} width={24} style={{ transform: 'translateX(0px)' }} onClick={toggleInfoPanel} />
      </a.div>
      <a.div style={stylesMobile} className="info-panel mobile z-[1] pointer-events-none">
        <CloseButton className="mb-2 pointer-events-auto" size={24} onClick={toggleInfoPanel} />
        <div className="info-panel-wrapper">
          <div className="item">
            <ZoomInIcon opacity={0.6} />
            <span>ZOOM IN</span>
          </div>
          <div className="item">
            <ZoomOutIcon opacity={0.6} />
            <span>ZOOM OUT</span>
          </div>
          <div className="item">
            <RotateIcon opacity={0.6} />
            <span>ROTATE</span>
          </div>
          <div className="item">
            <MoveIcon opacity={0.6} />
            <span>MOVE</span>
          </div>
        </div>
      </a.div>
    </>
  ) : (
    <>
      <a.div className="InfoIcon-wrapper z-[2] absolute h-full flex items-center" style={stylesI}>
        <InfoIcon onClick={toggleInfoPanel} width={32} style={{ transform: 'translateX(40px)' }} />
      </a.div>
      <a.div style={styles} className="info-panel z-[1] pointer-events-none">
        <CloseButton className="mb-2 pointer-events-auto" size={24} onClick={toggleInfoPanel} />
        <div className="info-panel-wrapper">
          <div className="item">
            <MouseLeftIcon opacity={0.6} />
            <span>ROTATE</span>
          </div>
          <div className="item">
            <MouseMiddleIcon opacity={0.6} />
            <span>ZOOM IN</span>
            <span className="!mt-0">ZOOM OUT</span>
          </div>
          <div className="item">
            <MouseRightIcon opacity={0.6} />
            <span>MOVE</span>
          </div>
        </div>
      </a.div>
    </>
  )
}

export default InfoPanel
