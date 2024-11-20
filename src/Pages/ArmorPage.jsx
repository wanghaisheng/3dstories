import { Canvas } from '@react-three/fiber'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import armorAnimation from '../Data/Animation/armorAnimation.json'
import { useEffect, useRef } from 'react'
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
import EffectComposerComp from '../Ui/EffectComposerComp'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Armor = ({ pathname }) => {
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
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
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio
      apiTheatre.start({
        position: ratioRef.current * sequenceLength
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequenceLength, sheet.address.sheetId])

  return (
    <>
      <ambientLight intensity={0.4} />
      <Environment preset="studio" environmentIntensity={0.5} environmentRotation={[0, 0, 0]} />
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0.2, 8]} fov={45} near={0.1} far={70} />
      <group position={isBigScreen ? [0, 0, 0] : [-1, 0, 0]} scale={isBigScreen ? 1 : 1}>
        <e.group theatreKey="Armor">
          <ArmorModel position={[0, 0.4, 0]} rotation={0} scale={4} />
        </e.group>
      </group>
    </>
  )
}

const ArmorPage = ({ pathname }) => {
  const project = getProject('Armor Animation', {
    state: armorAnimation
  })
  const sheet = project.sheet('Scene')

  return (
    <div className="Scene fixed h-screen w-full top-0">
      <HelmetProvider>
        <Helmet>
          <title>3D Stories · A plate armor for Elector Christian I. of Saxony</title>
          <meta name="description" content="Telling stories about historical dress." data-rh="true" />
          <meta name="keywords" content="Robe, UCLAB, C²DH" />
        </Helmet>
      </HelmetProvider>
      <Canvas
        gl={{
          physicallyCorrectLights: true,
          preserveDrawingBuffer: true,
          antialias: false,
          toneMapping: THREE.LinearToneMapping
        }}
      >
        <EffectComposerComp />
        <SheetProvider sheet={sheet}>
          <Armor pathname={pathname} />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default Transition(ArmorPage)
