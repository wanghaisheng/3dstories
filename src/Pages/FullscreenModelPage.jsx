import './Pages.css'
import useStore from '../GlobalState'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Background from '../Ui/Background'

import RobeFrancaiseModel from '../modelComps/RobeFrancaiseModel'
import GreekStyleDressModel from '../modelComps/GreekStyleDressModel'
import SpencerJacketModel from '../modelComps/SpencerJacketModel'
import * as THREE from 'three'

const FullscreenModelPage = ({ pathname }) => {
  const showFullscreenMode = useStore(state => state.showFullscreenMode)

  const fullscreenMode = () => {
    if (showFullscreenMode === false) {
      useStore.setState({ showFullscreenMode: true })
    } else {
      useStore.setState({ showFullscreenMode: false })
    }
  }

  return (
    <div
      className={`FullscreenModelPage `}
      style={{ transform: showFullscreenMode ? 'translateX(0%)' : 'translateX(-100%)' }}
    >
      <button
        onClick={fullscreenMode}
        style={{ zIndex: '100000', color: 'var(--white)', position: 'absolute', right: '3rem', top: '2rem' }}
      >
        CLOSE
      </button>
      <Canvas
        gl={{
          physicallyCorrectLights: true,
          preserveDrawingBuffer: true,
          antialias: false,
          toneMapping: THREE.LinearToneMapping
        }}
      >
        <OrbitControls autoRotate={true} />
        <ambientLight intensity={1} />
        <Environment preset="studio" environmentIntensity={0.2} environmentRotation={[1, 1, 0]} />
        {pathname === '/' ? <RobeFrancaiseModel position={[0, 0, 0]} rotation={0} /> : null}
        {pathname === '/greek_style_dress' ? <GreekStyleDressModel position={[0, -2.2, 0.5]} rotation={0} /> : null}
        {pathname === '/greek_style_dress' ? <SpencerJacketModel position={[0, 1, -0.5]} rotation={1.4} /> : null}
      </Canvas>
      {showFullscreenMode ? <Background /> : null}
    </div>
  )
}

export default FullscreenModelPage
