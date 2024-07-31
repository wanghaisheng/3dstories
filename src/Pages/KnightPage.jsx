import { Canvas, useFrame } from '@react-three/fiber'

import Knight from '../modelComps/Knight'
import { Environment, Html, ScrollControls, useScroll } from '@react-three/drei'
import { getProject, val } from '@theatre/core'
import { editable as e, SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f'
import ScrollPageContainer from '../Ui/ScrollPageContainer'
import ContentContainer from '../Ui/ContentContainer'
import SpotLightWithHelper from '../SpotLightWithHelper'
import { useAtom } from 'jotai'
import { currentPageAtom, currentSceneAtom, watchLoadedAtom } from '../GlobalState'
import Feature from '../Ui/Feature'
import { useEffect, useState } from 'react'
import Button from '../Ui/Button'

import knightAni from '../Data/knightAni.json'
import Transition from '../Ui/Transition'
// import Riegelhaube from './modelComps/Riegelhaube'
// import Blouson from './modelComps/Blouson'

const KnightPage = () => {
  // const [scene1, setScene1] = useAtom(scene1Atom)
  const [currentScene] = useAtom(currentSceneAtom)
  const [watchLoaded] = useAtom(watchLoadedAtom)

  useEffect(() => {
    console.log('Watch Model Load State')
  }, [watchLoaded])

  const shouldAnimateScene1 = currentScene === 1
  const shouldAnimateScene2 = currentScene === 3
  const shouldAnimateScene3 = currentScene === 4
  const shouldAnimateScene4 = currentScene === 5

  //Hide the flashing div at the beginning after the page loaded
  const [hiddenState, setHiddenState] = useState('hidden')

  useEffect(() => {
    if (shouldAnimateScene2) {
      setHiddenState('')
    }
  }, [shouldAnimateScene2])

  //Use JSON file to trigger the animation
  // const sheet = getProject('Model Animation').sheet('Scene')

  //Rerurn Theatre JS animation properties
  const sheet = getProject('Model Animation', { state: knightAni }).sheet('Scene')

  return (
    <>
      {watchLoaded && (
        <>
          <ScrollPageContainer firstContainer>
            <ContentContainer
              fistBlock
              cusromClassName={`${shouldAnimateScene1 ? 'tilt-in-top-1' : 'tilt-in-bottom-1'}`}
            >
              <h1 className='mb-5'>Armour Knight</h1>
              <p>
                Gravida arcu ac tortor dignissim convallis aenean. Nunc sed augue lacus viverra vitae congue eu
                consequat ac. Accumsan tortor posuere ac ut consequat.
              </p>
              <Button className='mt-10 pointer-events-auto' value='SCROLL DOWN TO EXPLORE' />
            </ContentContainer>
          </ScrollPageContainer>
          <ScrollPageContainer>
            <ContentContainer
              cusromClassName={`${hiddenState} ${shouldAnimateScene2 ? 'tilt-in-top-1' : 'tilt-in-bottom-1'}`}
            >
              <Feature
                title='Title goes here 2'
                description='Here is some description that I will get from Sabina, Here is some description that I will get from Sabina ...'
              />
            </ContentContainer>
          </ScrollPageContainer>
          <ScrollPageContainer>
            <ContentContainer
              cusromClassName={`${hiddenState} ${shouldAnimateScene3 ? 'tilt-in-top-1' : 'tilt-in-bottom-1'}`}
            >
              <Feature
                title='Title goes here 3'
                description='Here is some description that I will get from Sabina, Here is some description that I will get from Sabina ...'
              />
            </ContentContainer>
          </ScrollPageContainer>
          <ScrollPageContainer>
            <ContentContainer
              cusromClassName={`${hiddenState} ${shouldAnimateScene4 ? 'tilt-in-top-1' : 'tilt-in-bottom-1'}`}
            >
              <Feature
                title='Title goes here 4'
                description='Here is some description that I will get from Sabina, Here is some description that I will get from Sabina ...'
              />
            </ContentContainer>
          </ScrollPageContainer>
        </>
      )}

      <Canvas gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }}>
        <ScrollControls pages={3} distance={3} maxSpeed={1} damping={1}>
          <SheetProvider sheet={sheet}>
            <Scene />
          </SheetProvider>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default KnightPage

const Scene = () => {
  const sheet = useCurrentSheet()
  const scroll = useScroll()

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  // const [scene1, setScene1] = useAtom(scene1Atom)
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom)

  const sequenceLength = val(sheet.sequence.pointer.length)

  function logCurrentPageCallback(scroll, callback) {
    const currentPage = Math.floor(scroll.offset * scroll.pages) + 1

    // Determine the current scene on how far into the page you've scrolled
    const positionWithinPage = (scroll.offset * scroll.pages) % 1

    // **** THE * 2 is the multiple of which the pages is split - thus for more scenes multiple with larger numbers
    const sceneOffsetForCurrentPage = Math.floor(positionWithinPage * 2) + 1

    // Calculate the total scenes from all previous pages + scences from the current page

    const computedScene = (currentPage - 1) * 2 + sceneOffsetForCurrentPage

    console.log('Current Page', currentPage)
    console.log('Current Scene', currentScene)
    callback(currentPage)
    setCurrentScene(computedScene)
  }

  useFrame(() => {
    if (scroll) {
      logCurrentPageCallback(scroll, setCurrentPage)
      sheet.sequence.position = scroll.offset * sequenceLength
    }
  })

  useEffect(() => {
    console.log('Current Scene:', currentScene)
  }, [currentScene])

  return (
    <>
      {/* <color attach='background' args={['#333333']} /> */}
      <Environment preset='dawn' />
      <PerspectiveCamera theatreKey='Camera' makeDefault position={[0, 0, 0]} fov={90} near={0.1} far={70} />
      <SpotLightWithHelper theatreKey='Spot Light 1' position={[0, 0, 0]} intensity={1} showHelper={false} />
      <SpotLightWithHelper theatreKey='Spot Light 2' position={[0, 0, 0]} intensity={1} showHelper={false} />

      <Knight />
    </>
  )
}
