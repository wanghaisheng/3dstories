import { Canvas } from '@react-three/fiber'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import { useLocation } from 'react-router-dom'
import robeAnimation from '../Data/Animation/robeAnimation.json'
import robeAnimation2 from '../Data/Animation/robeAnimation2.json'
import World from './World'
import { useMemo } from 'react'

const RobeSheet = getProject('Model Animation', {
  state: robeAnimation
}).sheet('Scene')
const ArmorSheet = getProject('Model Animation2', {
  state: robeAnimation2
}).sheet('Scene')

const Scene = () => {
  const location = useLocation()
  const pathname = location.pathname
  // Use JSON file to trigger the animation
  // const sheet = getProject('Model Animation').sheet('Scene')
  const sheet = useMemo(() => {
    if (pathname === '/') {
      return RobeSheet
    } else {
      return ArmorSheet
    }
  }, [pathname])

  console.info('[Scene] pathname:', pathname, 'sheet', sheet)

  return (
    <div className="Scene fixed h-screen w-full fixed top-0">
      <Canvas gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }}>
        <SheetProvider sheet={sheet}>
          <World pathname={location.pathname} />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default Scene
