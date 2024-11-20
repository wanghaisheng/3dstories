import { Canvas } from '@react-three/fiber'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import greekStyleDressAnimation from '../Data/Animation/greekStyleDressAnimation.json'
import { useEffect, useRef } from 'react'
import { Environment } from '@react-three/drei'
import { config, useSpring } from '@react-spring/web'
import { useCurrentSheet, PerspectiveCamera } from '@theatre/r3f'
import { useScrollStore } from '../components/ScrollManager'
import { val } from '@theatre/core'
import { useMediaQuery } from 'react-responsive'
import GreekStyleDressModel from '../modelComps/GreekStyleDressModel'
import { editable as e } from '@theatre/r3f'
import SpencerJacketModel from '../modelComps/SpencerJacketModel'
import * as THREE from 'three'
import Transition from '../Ui/Transition'
import EffectComposerComp from '../Ui/EffectComposerComp'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const GreekStyleDress = ({ pathname }) => {
  const robeRef = useRef(null)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
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
      <ambientLight intensity={1} />
      <Environment preset="studio" environmentIntensity={0.2} environmentRotation={[1, 1, 0]} />
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0.2, 8]} fov={45} near={0.1} far={70} />
      <group position={isBigScreen ? [0.3, 0, 0] : [-1, 0, 0]} scale={isBigScreen ? 1 : 1}>
        <e.group theatreKey="Greek Style Dress Model">
          <GreekStyleDressModel ref={robeRef} position={[0, -2, 0]} rotation={0} />
        </e.group>
        <e.group theatreKey="Spencer Jacket Model">
          <SpencerJacketModel ref={robeRef} position={[0, 0, 0]} rotation={-2.5} />
        </e.group>
      </group>
    </>
  )
}

const GreekStyleDressPage = ({ pathname }) => {
  const project = getProject('Greek Style Dress Animation', {
    state: greekStyleDressAnimation
  })
  const sheet = project.sheet('Scene')

  return (
    <div className="Scene fixed h-screen w-full top-0">
      <HelmetProvider>
        <Helmet>
          <title>3D Stories · A dress in "greek style"</title>
          <meta name="description" content="Telling stories about historical dress." data-rh="true" />
          <meta name="keywords" content="Robe, UCLAB, C²DH" />
        </Helmet>
      </HelmetProvider>
      <Canvas
        shadows
        gl={{
          physicallyCorrectLights: true,
          preserveDrawingBuffer: true,
          antialias: false,
          toneMapping: THREE.LinearToneMapping
        }}
      >
        <EffectComposerComp />
        <SheetProvider sheet={sheet}>
          <GreekStyleDress pathname={pathname} />
          <SpencerJacketModel pathname={pathname} />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default Transition(GreekStyleDressPage)
