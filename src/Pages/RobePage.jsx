import { Canvas } from '@react-three/fiber'
import { Environment, useScroll } from '@react-three/drei'
import { getProject, val } from '@theatre/core'
import { editable as e, SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f'
import SpotLightWithHelper from '../SpotLightWithHelper'
import { useAtom, useAtomValue } from 'jotai'
import { currentSceneAtom, buttonClickCounterAtom, scrollOffset, currentPage } from '../GlobalState'
import { useEffect, useRef, useState } from 'react'
import knightAni from '../Data/knightAni.json'
import Robe from '../modelComps/Robe'
import { useMediaQuery } from 'react-responsive'
import { config, easings, useSpring } from '@react-spring/web'

const RobePage = () => {
  // const [scene1, setScene1] = useAtom(scene1Atom)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  // const scroll = useScroll()

  function flashionPlatform() {
    window.open('https://refareader.fh-potsdam.de', '_blank')
  }

  //Hide the flashing div at the beginning after the page loaded
  const [hiddenState, setHiddenState] = useState('hidden')

  //Use JSON file to trigger the animation
  // const sheet = getProject('Model Animation').sheet('Scene')

  //Rerurn Theatre JS animation properties
  const sheet = getProject('Model Animation', { state: knightAni }).sheet('Scene')
  // const sheetTwo = getProject('Model Animation', { state: knightAni }).sheet('Scene')

  return (
    <div className='RobePage' style={{ height: '100vh', width: '100%', position: 'fixed', top: 0 }}>
      <Canvas gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default RobePage

const Scene = ({ buttonClickCounter }) => {
  // console.log('ZZZZZZZ', buttonClickCounter)
  const [clickCounter] = useAtom(buttonClickCounterAtom)
  const localScrollOffset = useAtomValue(scrollOffset)

  const scroll = useScroll()
  const sheet = useCurrentSheet()

  const [rotationModel, setRotationModel] = useState(0)
  const robeRef = useRef(null)

  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

  // scrollToPage()
  const localCurrentPage = useAtomValue(currentPage)
  // const [scene1, setScene1] = useAtom(scene1Atom)
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom)

  const sequenceLength = val(sheet.sequence.pointer.length)

  const [{ rotationY }, api] = useSpring(() => ({
    rotationY: 0,
    config: {
      easing: easings.easeInOutQuad,
      duration: 2500,
    }, // { mass: 1, tension: 170, friction: 26 },
    onChange: ({ value }) => {
      if (robeRef.current) {
        robeRef.current.rotation.y = value.rotationY
      }
    },
  }))

  const [, apiTheatre] = useSpring(() => ({
    position: 0,
    config: config.molasses,
    onChange: ({ value }) => {
      sheet.sequence.position = value.position
    },
  }))

  useEffect(() => {
    const ratio = Math.min(1, Math.max(0, localScrollOffset))
    apiTheatre.start({
      position: ratio * sequenceLength,
    })
  }, [localScrollOffset])

  useEffect(() => {
    if (localCurrentPage === 6 || localCurrentPage === 7 || localCurrentPage === 8) {
      api.start({
        rotationY: 3,
      })
    } else {
      api.start({
        rotationY: 0,
      })
    }
  }, [localCurrentPage])

  return (
    <>
      <Environment preset='studio' environmentIntensity={0.5} environmentRotation={[1, 1, 0]} />
      <PerspectiveCamera theatreKey='Camera' makeDefault position={[0, 0.2, 8]} fov={45} near={0.1} far={70} />
      {/* <SpotLightWithHelper theatreKey='Spot Light 1' position={[0, 0, 0]} intensity={1} showHelper={false} />
      <SpotLightWithHelper theatreKey='Spot Light 2' position={[0, 0, 0]} intensity={1} showHelper={false} /> */}

      <group ref={robeRef} position={[isBigScreen ? 2 : 0, 0, 0]}>
        <Robe position={[0, 0, 0]} rotation={0} />
      </group>
    </>
  )
}
