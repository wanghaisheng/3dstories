import { useEffect, useLayoutEffect, useRef } from 'react'
import { Environment } from '@react-three/drei'
import { config, easings, useSpring } from '@react-spring/web'
import { useCurrentSheet, PerspectiveCamera } from '@theatre/r3f'
import { useScrollStore } from './ScrollManager'
import { val } from '@theatre/core'
import { useMediaQuery } from 'react-responsive'
import useStore from '../GlobalState'

import Robe from '../modelComps/Robe'

const World = () => {
  const robeRef = useRef(null)
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)

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

  const [, apiRobe] = useSpring(() => ({
    rotationY: 0,
    config: {
      easing: easings.easeInOutQuad,
      duration: 2500
    }, // { mass: 1, tension: 170, friction: 26 },
    onChange: ({ value }) => {
      if (robeRef.current) {
        robeRef.current.rotation.y = value.rotationY
      }
    }
  }))

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio
      apiTheatre.start({
        position: ratioRef.current * sequenceLength
      })

      // page change logic
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        console.info('[World] page changed', pageRef.current)

        // robe animation logic
        apiRobe.start({
          rotationY: pageRef.current === 6 || pageRef.current === 7 || pageRef.current === 8 ? 3 : 0
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequenceLength])

  useLayoutEffect(() => {
    robeRef.position = isBigScreen ? [2, 0, 0] : [1, 0, 0]
  }, [isBigScreen])

  console.debug('[World] rendering')

  return (
    <>
      <Environment preset="studio" environmentIntensity={0.5} environmentRotation={[1, 1, 0]} />
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0.2, 8]} fov={45} near={0.1} far={70} />
      <group ref={robeRef} scale={isBigScreen ? 1 : 0.7}>
        <Robe position={[0, 0, 0]} rotation={0} />
        <Robe position={[10, 0, 0]} rotation={0} />
      </group>
    </>
  )
}

export default World
