import './Pages.css'
import useStore from '../GlobalState'
import { Canvas } from '@react-three/fiber'
import { Box, Environment, OrbitControls } from '@react-three/drei'

import Robe from '../modelComps/Robe'
import Background from '../Ui/Background'

const FullscreenModelPage = () => {
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
      <Canvas gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }}>
        <Box args={[1, 1, 1]} position={[0, 0, 0]} />
        <OrbitControls autoRotate={true} />
        <Environment preset="studio" environmentIntensity={0.5} environmentRotation={[1, 1, 0]} />
        <Robe position={[0, 0, 0]} rotation={0} />
      </Canvas>
      <Background />
    </div>
  )
}

export default FullscreenModelPage
