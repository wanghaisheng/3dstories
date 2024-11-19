import Background from './Ui/Background'
import Header from './Ui/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Ui/Footer'
import { modalVisible, modalImage } from './GlobalState'
import { useAtom } from 'jotai'
import FullscreenModelPage from './Pages/FullscreenModelPage'
import ContentManager from './components/ContentManager'
import ViewportManager from './components/ViewportManager'
import MenuFullPage from './Ui/MenuFullPage'
import RobeFrancaisePage from './Pages/RobeFrancaisePage'
import GreekStyleDressPage from './Pages/GreekStyleDressPage'
import { useLocation } from 'react-router-dom'
import DoubletPage from './Pages/DoubletPage'
import ModalWindow from './Ui/ModalWindow'
import Images from './Data/images.json'
import { AnimatePresence } from 'framer-motion'
import ArmorPage from './Pages/ArmorPage'
import IntroPage from './Pages/IntroPage'
import Preloader from './Ui/Preloader'
import { useEffect, useRef } from 'react'
import useStore from './GlobalState'

function App() {
  const location = useLocation()
  const pathname = location.pathname
  const [isModalVisible, setModalVisible] = useAtom(modalVisible)
  const [isModalImage, setModalImage] = useAtom(modalImage) // Use an empty object as the key
  const scrollToTopRef = useRef(null)
  const scrollToTopEf = useStore(state => state.scrollToTopEf)
  const setScrollToTopEf = useStore(state => state.setScrollToTopEf)

  const scrollToTop = () => {
    window.scrollTo({
      top: window.top,
      behavior: 'smooth' // Optional: for smooth scrolling§
    })
    setScrollToTopEf(true)
    console.debug('scrollToTopEf', scrollToTopEf)
    scrollToTopRef.current = setTimeout(() => {
      setScrollToTopEf(false)
    }, 2000)
  }

  const openModal = imageId => {
    setModalVisible(true)
    setModalImage(Images.images[imageId])
  }

  const closeModal = () => {
    setModalVisible(false)
    setTimeout(() => {
      setModalImage(null)
    }, 500)
  }

  useEffect(() => {
    scrollToTop
  }, [pathname])

  return (
    <>
      <ModalWindow closeModal={closeModal} isModalImage={isModalImage} isModalVisible={isModalVisible} />
      <Header scrollToTop={scrollToTop} />
      <MenuFullPage />
      <Preloader pathname={pathname} />
      <FullscreenModelPage pathname={pathname} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={pathname} pathname={pathname}>
          <Route path="/" element={<IntroPage pathname={pathname} />}></Route>
          <Route path="/robe" element={<RobeFrancaisePage pathname={pathname} scrollToTopEf={scrollToTopEf} />}></Route>
          <Route path="/armor" element={<ArmorPage pathname={pathname} />}></Route>
          <Route path="/doublet" element={<DoubletPage pathname={pathname} />}></Route>
          <Route path="/greek_style_dress" element={<GreekStyleDressPage pathname={pathname} />}></Route>
        </Routes>
        {pathname === '/' ? null : (
          <ContentManager openModal={openModal} isModalVisible={isModalVisible} key="sss-robe" />
        )}
        <ViewportManager />
      </AnimatePresence>
      <Footer scrollToTop={scrollToTop} pathname={pathname} />
      <Background pathname={pathname} showFullscreenMode={true} />
    </>
  )
}

export default App
