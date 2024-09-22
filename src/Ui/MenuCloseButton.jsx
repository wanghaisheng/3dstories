import './MenuCloseButton.css'
import useStore from '../GlobalState'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const MenuCloseButton = () => {
  const location = useLocation()
  const isMenuOpen = useStore(state => state.isMenuOpen)
  const toggleMenu = useStore(state => state.toggleMenu)

  useEffect(() => {
    if (isMenuOpen) {
      toggleMenu()
    }
  }, [location.pathname])

  return (
    <div className={`MenuCloseButton ${isMenuOpen ? 'cross-icon' : ''} pointer-events-auto`} onClick={toggleMenu}>
      <span className="menu-bar one"></span>
      <span className="menu-bar two"></span>
      <span className="menu-bar three"></span>
    </div>
  )
}

export default MenuCloseButton
