import Background from './Ui/Background'
import Header from './Ui/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Ui/Footer'
import { modalVisible, modalImage } from './GlobalState'
import { useAtom } from 'jotai'
import FullscreenModelPage from './Pages/FullscreenModelPage'
import ContentManager from './components/ContentManager'
import ViewportManager from './components/ViewportManager'
import NavPrevNextButtons from './Ui/NavPrevNextButtons'
import MenuFullPage from './Ui/MenuFullPage'
import GenericPage from './Pages/GenericPage'
import RobeFrancaisePage from './Pages/RobeFrancaisePage'
import GreekStyleDressPage from './Pages/GreekStyleDressPage'
import { useLocation } from 'react-router-dom'
import DoubletPage from './Pages/DoubletPage'
import ModalWindow from './Ui/ModalWindow'
import Images from './Data/images.json'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()
  const pathname = location.pathname
  const [isModalVisible, setModalVisible] = useAtom(modalVisible)
  const [isModalImage, setModalImage] = useAtom(modalImage) // Use an empty object as the key

  const scrollToTop = () => {
    window.scrollTo({
      top: window.top,
      behavior: 'smooth' // Optional: for smooth scrolling§
    })
  }

  const openModal = imageId => {
    setModalVisible(true)
    setModalImage(Images.images[imageId])
  }

  const closeModal = () => {
    // setModalVisible(prev => !prev) // Toggle the boolean value
    setModalVisible(false)
    setTimeout(() => {
      setModalImage(null)
    }, 500)
  }

  return (
    <>
      <ModalWindow closeModal={closeModal} isModalImage={isModalImage} isModalVisible={isModalVisible} />
      <Header scrollToTop={scrollToTop} />
      <MenuFullPage />
      <NavPrevNextButtons scrollToTop={scrollToTop} />
      <FullscreenModelPage pathname={pathname} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RobeFrancaisePage pathname={pathname} />}></Route>
          <Route path="/doublet" element={<DoubletPage pathname={pathname} />}></Route>
          <Route path="/greek_style_dress" element={<GreekStyleDressPage pathname={pathname} />}></Route>
          <Route path="/about" element={<GenericPage />}></Route>
        </Routes>
        <ContentManager openModal={openModal} isModalVisible={isModalVisible} />
        <ViewportManager />
      </AnimatePresence>
      <Footer />
      <Background pathname={pathname} />
    </>
  )
}

export default App
