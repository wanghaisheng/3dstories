import RiegelhaubePage from './Pages/RiegelhaubePage'
import KnightPage from './Pages/KnightPage'
import BlousonPage from './Pages/BlousonPage'
import RobePage from './Pages/RobePage'
import Background from './Ui/Background'
import Header from './Ui/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Ui/Footer'
import { currentSceneAtom, showFullscreenMode } from './GlobalState'
import { useAtom } from 'jotai'
import FullscreenModelPage from './Pages/FullscreenModelPage'
import ContentManager from './components/ContentManager'
import { useScrollStore } from './components/ScrollManager'
import NavPrevNextButtons from './Ui/NavPrevNextButtons'
import { useRef } from 'react'

function App() {
  const pageRef = useRef(useScrollStore.getState().page)
  const [fullscreenMode] = useAtom(showFullscreenMode)
  console.log('fullscreenMode', fullscreenMode)

  console.log('PAGE-REF', pageRef)
  return (
    <>
      <Header />
      <NavPrevNextButtons />
      {/* <AnimatePresence> */}
      {fullscreenMode === true ? <FullscreenModelPage /> : null}
      <Routes location={location} key={location.pathname}>
        {fullscreenMode === false ? (
          <>
            <Route path='/' element={<RobePage />}></Route>
            <Route path='/knight' element={<KnightPage />}></Route>
            <Route path='/riegelhauber' element={<RiegelhaubePage />}></Route>
            <Route path='/blouson' element={<BlousonPage />}></Route>{' '}
          </>
        ) : null}
      </Routes>
      <ContentManager />
      {/* </AnimatePresence> */}
      <Footer /> :
      <Background />
    </>
  )
}

export default App
