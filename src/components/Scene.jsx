import { Canvas } from '@react-three/fiber'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'

import robeAnimation from '../Data/Animation/robeAnimation.json'
import World from './World'

const Scene = () => {
  // Use JSON file to trigger the animation
  // const sheet = getProject('Model Animation').sheet('Scene')
  const sheet = getProject('Model Animation', {
    state: robeAnimation
  }).sheet('Scene')

  return (
    <div className="Scene fixed h-screen w-full fixed top-0">
      <Canvas gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }}>
        <SheetProvider sheet={sheet}>
          <World />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default Scene
