import RiegelhaubePage from './Pages/RiegelhaubePage'
import KnightPage from './Pages/KnightPage'
import BlousonPage from './Pages/BlousonPage'
import RobePage from './Pages/RobePage'

import Background from './Ui/Background'
import Header from './Ui/Header'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import CircleButton from './Ui/CircleButton'
import Footer from './Ui/Footer'
import { currentSceneAtom, showFullscreenMode } from './GlobalState'
import { useAtom, useSetAtom } from 'jotai'
import FullscreenModelPage from './Pages/FullscreenModelPage'
import { AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import ContentManager from './components/ContentManager'
const routes = ['/', '/knight', '/riegelhauber']

function NavigationButtons({ shouldAnimateSceneLast }) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1280px)' })
  const [currentScene] = useAtom(currentSceneAtom)

  const navigate = useNavigate()
  const location = useLocation()
  const currentIndex = routes.indexOf(location.pathname)

  const shouldAnimateScene1 = currentScene === 1

  const handleNext = () => {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1])
    }
  }

  return (
    <>
      <div
        className={`z-20 absolute flex xl:flex-col md:flex-row left-[1rem] lg:left-[5rem] ${
          shouldAnimateScene1 ? 'slide-in-bck-center' : 'slide-out-bck-center'
        }`}
        style={{ top: isBigScreen ? 'calc(50% - 130px)' : '15%' }}
      >
        <a onClick={handlePrevious} disabled={currentIndex === 0}>
          <CircleButton size={isBigScreen ? 120 : 80} rotate={180} />
        </a>
        <a className='relative' onClick={handleNext} disabled={currentIndex === routes.length - 1}>
          <CircleButton size={isBigScreen ? 120 : 80} className='xl:mt-5 xl:ml-0 ml-5' />
        </a>
      </div>

      <div
        className={`z-20 absolute flex flex-col ${
          shouldAnimateSceneLast ? 'slide-in-bck-center' : 'slide-out-bck-center'
        }`}
        style={{ bottom: 'calc(15% + 50px)', left: isBigScreen ? '5rem' : 'calc(50% - 40px)' }}
      >
        <a>
          <CircleButton size={isBigScreen ? 120 : 80} rotate={-90} />
        </a>
      </div>
    </>
  )
}

function App() {
  const [fullscreenMode] = useAtom(showFullscreenMode)
  const [currentScene] = useAtom(currentSceneAtom)
  const shouldAnimateSceneLast = currentScene >= 35
  console.log('fullscreenMode', fullscreenMode)
  return (
    <>
      <Header />
      <NavigationButtons shouldAnimateSceneLast={shouldAnimateSceneLast} />
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
      <Footer customClass={shouldAnimateSceneLast ? 'slide-in-bck-center' : 'slide-out-bck-center'} /> :
      <Background />
    </>
  )
}

export default App
