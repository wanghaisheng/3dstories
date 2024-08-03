import Logo3dStories from '../Svg/Logo3dStories'
import MenuCloseButton from './MenuCloseButton'

const Header = ({ scrollToTop }) => {
  return (
    <>
      <header className='Header fixed z-20 flex justify-between p-5 sm:p-10' style={{ width: 'calc(100vw - 15px)' }}>
        <Logo3dStories width={120} scrollToTop={scrollToTop} />
        <MenuCloseButton />
      </header>
    </>
  )
}

export default Header
