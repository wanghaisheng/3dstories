import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ScrollControls, useScroll, Scroll } from '@react-three/drei'
import { getProject, val } from '@theatre/core'
import { editable as e, SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f'
import ScrollPageContainer from '../Ui/ScrollPageContainer'
import ContentContainer from '../Ui/ContentContainer'
import SpotLightWithHelper from '../SpotLightWithHelper'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  currentPageAtom,
  currentSceneAtom,
  watchLoadedAtom,
  buttonClickCounterAtom,
  showFullscreenMode,
  scrollOffset,
  currentPage,
} from '../GlobalState'
import Feature from '../Ui/Feature'
import { useEffect, useRef, useState } from 'react'
import Button from '../Ui/Button'

import knightAni from '../Data/knightAni.json'
import robeData from '../Data/robe.json'
import Robe from '../modelComps/Robe'
import { useMediaQuery } from 'react-responsive'
import Transition from '../Ui/Transition'
import { config, easings, useSpring } from '@react-spring/web'

const RobePage = () => {
  // const [scene1, setScene1] = useAtom(scene1Atom)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const setShowFullscreenMode = useSetAtom(showFullscreenMode)
  const [buttonClickCounter, setButtonClickCounter] = useAtom(buttonClickCounterAtom)
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom)
  const [watchLoaded] = useAtom(watchLoadedAtom)
  // const scroll = useScroll()

  const scrollDown = () => {
    setButtonClickCounter(0.5)
    console.log('Vertical scroll position:', scroll.offset)
    scroll.offset + 0.5
  }

  const fullscreenMode = () => {
    setShowFullscreenMode(true)
  }

  // resentation(() => {
  //   if (scroll) {
  //     // This gives a negative number.
  //     const offset = scroll.offset
  //     console.log('Scene Component Scroll Offset:', offset)
  //     // ... (rest of the code)
  //   }
  // })

  function findThisItem() {
    window.open('https://uclab.fh-potsdam.de/refa-catalog/s/c/item/19625', '_blank')
  }

  function flashionPlatform() {
    window.open('https://refareader.fh-potsdam.de', '_blank')
  }

  useEffect(() => {
    console.log('Watch Model Load State')
  }, [watchLoaded])

  //Hide the flashing div at the beginning after the page loaded
  const [hiddenState, setHiddenState] = useState('hidden')

  //Use JSON file to trigger the animation
  // const sheet = getProject('Model Animation').sheet('Scene')

  //Rerurn Theatre JS animation properties
  const sheet = getProject('Model Animation', { state: robeData }).sheet('Scene')
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

  // function logCurrentPageCallback(scroll, callback) {
  //   const currentPage = Math.floor(scroll.offset * scroll.pages) + 1

  //   // Determine the current scene on how far into the page you've scrolled
  //   const positionWithinPage = (scroll.offset * scroll.pages) % 1

  //   // **** THE * 2 is the multiple of which the pages is split - thus for more scenes multiple with larger numbers
  //   const sceneOffsetForCurrentPage = Math.floor(positionWithinPage * 2) + 1

  //   // Calculate the total scenes from all previous pages + scences from the current page

  //   const computedScene = (currentPage - 1) * 2 + sceneOffsetForCurrentPage
  //   // console.log('positionWithinPage', positionWithinPage)
  //   // console.log('Scroll:', scroll)
  //   // console.log('Current Page', currentPage)
  //   // console.log('Current Scene', currentScene)
  //   callback(currentPage)
  //   setCurrentScene(computedScene)
  // }

  // useFrame(() => {
  //   if (scroll) {
  //     const { offset } = scroll
  //     logCurrentPageCallback(scroll, setCurrentPage)
  //     sheet.sequence.position = offset * sequenceLength
  //     console.log('SCROLL', scroll.scroll.current, offset)
  //   }
  // })

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

  // console.log('rotation@@@', rotationModel)

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
