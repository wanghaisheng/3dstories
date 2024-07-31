import './Pages.css'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { useSetAtom } from 'jotai'
import { showFullscreenMode } from '../GlobalState'

// import { useAtom, useSetAtom } from 'jotai'
// import { currentSceneAtom, watchLoadedAtom, buttonClickCounterAtom } from '../GlobalState'
import Robe from '../modelComps/Robe'
import Background from '../Ui/Background'

const FullscreenModelPage = () => {
  const setShowFullscreenMode = useSetAtom(showFullscreenMode)

  const fullscreenMode = () => {
    setShowFullscreenMode(false)
  }

  return (
    <div className='FullscreenModelPage'>
      <div
        onClick={fullscreenMode}
        style={{ zIndex: '100000', color: 'var(--white)', position: 'absolute', right: '3rem', top: '2rem' }}
      >
        CLOSE
      </div>
      <Canvas gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }}>
        <OrbitControls autoRotate={true} />
        <Environment preset='studio' environmentIntensity={0.5} environmentRotation={[1, 1, 0]} />
        <Robe position={[0, 0, 0]} rotation={0} />
      </Canvas>
      <Background />
    </div>
  )
}

export default FullscreenModelPage
