import './Pages.css'
import useStore from '../GlobalState'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Background from '../Ui/Background'
import { useMediaQuery } from 'react-responsive'
import RobeFrancaiseModel from '../modelComps/RobeFrancaiseModel'
import GreekStyleDressModel from '../modelComps/GreekStyleDressModel'
import SpencerJacketModel from '../modelComps/SpencerJacketModel'
import * as THREE from 'three'
import InnerDoubletModel from '../modelComps/InnerDoubletModel'
import OuterDoubletModel from '../modelComps/OuterDoubletModel'
import CloseButton from '../Ui/CloseButton'
import { useEffect } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import InfoPanel from '../Ui/InfoPanel'

const FullscreenModelPage = ({ pathname }) => {
  const showFullscreenMode = useStore(state => state.showFullscreenMode)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

  const fullscreenMode = () => {
    if (showFullscreenMode === false) {
      useStore.setState({ showFullscreenMode: true })
    } else {
      useStore.setState({ showFullscreenMode: false })
    }
  }

  const [styles, api] = useSpring(() => ({
    transform: 'translateX(-100%)',
    config: config.slow
  }))

  useEffect(() => {
    console.log('API', api.start)
    api.start({
      transform: showFullscreenMode ? 'translateX(0%)' : 'translateX(-100%)',
      opacity: showFullscreenMode ? 1 : 0
    })
  }, [showFullscreenMode])

  return (
    <a.div style={styles} className={`FullscreenModelPage `}>
      <CloseButton
        onClick={fullscreenMode}
        className="mb-2"
        size={32}
        style={{ position: 'absolute', right: isBigScreen ? '3rem' : '1rem', top: isBigScreen ? '2rem' : '1rem' }}
      />
      {isBigScreen ? <InfoPanel /> : <InfoPanel mobile={true} />}
      <Canvas
        gl={{
          physicallyCorrectLights: true,
          preserveDrawingBuffer: true,
          antialias: false,
          toneMapping: THREE.LinearToneMapping
        }}
      >
        <OrbitControls autoRotate={true} autoRotateSpeed={0.5} enableDamping={true} />
        <ambientLight intensity={1} />
        <Environment preset="studio" environmentIntensity={0.2} environmentRotation={[1, 1, 0]} />
        {pathname === '/' ? <RobeFrancaiseModel position={[0, -2, 0]} rotation={0} /> : null}
        {pathname === '/greek_style_dress' ? <GreekStyleDressModel position={[0, -2.2, 0.5]} rotation={0} /> : null}
        {pathname === '/greek_style_dress' ? <SpencerJacketModel position={[0, 1, -0.5]} rotation={1.4} /> : null}
        {pathname === '/doublet' ? <InnerDoubletModel position={[0, -0.5, -1.2]} rotation={1.4} /> : null}
        {pathname === '/doublet' ? <OuterDoubletModel position={[0, -0.5, 1.2]} rotation={0} /> : null}
      </Canvas>
      {showFullscreenMode ? <Background /> : null}
    </a.div>
  )
}

export default FullscreenModelPage
