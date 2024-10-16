import { Canvas } from '@react-three/fiber'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import robeAnimation from '../Data/Animation/robeAnimation.json'
import { useLayoutEffect, useEffect, useRef } from 'react'
import { Environment } from '@react-three/drei'
import { config, useSpring } from '@react-spring/web'
import { useCurrentSheet, PerspectiveCamera } from '@theatre/r3f'
import { useScrollStore } from '../components/ScrollManager'
import { val } from '@theatre/core'
import { useMediaQuery } from 'react-responsive'
import ArmorModel from '../modelComps/ArmorModel'
import { editable as e } from '@theatre/r3f'
import * as THREE from 'three'
import Transition from '../Ui/Transition'

const Armor = ({ pathname }) => {
  const ArmorRef = useRef(null)
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  // const pageRef = useRef(useScrollStore.getState().page)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const sheet = useCurrentSheet()
  const sequenceLength = val(sheet.sequence.pointer.length)
  const [, apiTheatre] = useSpring(() => ({
    position: 0,
    config: config.molasses,
    onChange: ({ value }) => {
      sheet.sequence.position = value.position
    }
  }))

  useEffect(() => {
    console.debug('[World] useEffect', sheet.address.sheetId, sheet)
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio
      apiTheatre.start({
        position: ratioRef.current * sequenceLength
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequenceLength, sheet.address.sheetId])

  const [, apiOpacityTwo] = useSpring(() => ({
    opacity: 0,
    config: config.slow,
    onChange: ({ value }) => {
      if (ArmorRef.current) {
        ArmorRef.current.material.opacity = value.opacity
      }
    }
  }))

  useLayoutEffect(() => {
    console.info('[World] pathname changed to:', pathname)
    apiOpacityTwo.start({
      opacity: pathname === '/about' ? 0.1 : 1
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <ambientLight intensity={0.4} />
      <Environment preset="studio" environmentIntensity={0.5} environmentRotation={[0, 0, 0]} />
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0.2, 8]} fov={45} near={0.1} far={70} />
      <group position={isBigScreen ? [0, 0, 0] : [-1, 0, 0]} scale={isBigScreen ? 1 : 1}>
        <e.group theatreKey="Robe">
          <ArmorModel ref={ArmorRef} position={[0, 0.4, 0]} rotation={0} scale={4} />
        </e.group>
      </group>
    </>
  )
}

const ArmorPage = ({ pathname }) => {
  const project = getProject('Robe Francaise Animation', {
    state: robeAnimation
  })
  const sheet = project.sheet('Scene')
  // Use JSON file to trigger the animation
  // const sheet = getProject('Model Animation').sheet('Scene')

  return (
    <div className="Scene fixed h-screen w-full fixed top-0">
      <Canvas
        gl={{
          physicallyCorrectLights: true,
          preserveDrawingBuffer: true,
          antialias: false,
          toneMapping: THREE.LinearToneMapping
        }}
      >
        <SheetProvider sheet={sheet}>
          <Armor pathname={pathname} />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default Transition(ArmorPage)
