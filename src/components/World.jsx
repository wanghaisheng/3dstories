import { useEffect, useLayoutEffect, useRef } from 'react'
import { Environment } from '@react-three/drei'
import { config, easings, useSpring } from '@react-spring/web'
import { useCurrentSheet, PerspectiveCamera } from '@theatre/r3f'
import { useScrollStore } from './ScrollManager'
import { val } from '@theatre/core'
import { useMediaQuery } from 'react-responsive'
import Robe from '../modelComps/Robe'
import { editable as e } from '@theatre/r3f'

const World = ({ pathname = '/' }) => {
  const robeRef = useRef(null)
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)

  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

  const sheet = useCurrentSheet()
  const sequenceLength = val(sheet.sequence.pointer.length)

  console.info('[World] sequenceLength', sequenceLength, sheet.address.sheetId)

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
    console.debug('[World] useEffect ', sheet.address.sheetId)
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
        // apiRobe.start({
        //   rotationY: pageRef.current === 6 || pageRef.current === 7 || pageRef.current === 8 ? 3 : 0
        // })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequenceLength, sheet.address.sheetId])

  const changeOpacity = () => {
    let modelOpacity = 1
    if (pathname === '/about') {
      modelOpacity = 0
      console.info('modelOpacity', modelOpacity)
    } else {
      modelOpacity = 1
      console.info('modelOpacityOne', modelOpacity)
    }
    return modelOpacity
  }

  // const [, apiOpacity] = useSpring(() => ({
  //   opacity: 0,
  //   config: config.slow,
  //   onChange: ({ value }) => {
  //     console.info('opacity', value.opacity)
  //     if (robeRef.current) {
  //       robeRef.current.opacity = value.opacity
  //     }
  //   }
  // }))

  useLayoutEffect(() => {
    console.info('[World] pathname changed to:', pathname)
    // apiOpacity.start({
    //   opacity: pathname === '/about' ? 0.1 : 1
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  console.debug('[World] rendering')

  return (
    <>
      <Environment preset="studio" environmentIntensity={0.5} environmentRotation={[1, 1, 0]} />
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0.2, 8]} fov={45} near={0.1} far={70} />
      <group position={isBigScreen ? [0, 0, 0] : [-1, 0, 0]} scale={isBigScreen ? 1 : 1}>
        <e.group theatreKey="Robe">
          <Robe ref={robeRef} opacity={changeOpacity()} position={[0, 0, 0]} rotation={0} />
        </e.group>
      </group>
    </>
  )
}

export default World
