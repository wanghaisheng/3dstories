import { NavLink } from 'react-router-dom'
import Logo3dStories from '../Svg/Logo3dStories'

const Header = () => {
  return (
    <>
      <header className='Header fixed z-20 flex justify-between p-5 sm:p-10' style={{ width: 'calc(100vw - 15px)' }}>
        <Logo3dStories width={120} />
        <menu className='flex'>
          <ul className='flex flex-row items-center'>
            <li className='mr-5'>
              <NavLink to='/'>Robe</NavLink>
            </li>
            <li className='mr-5'>
              <NavLink to='/knight'>Knight</NavLink>
            </li>
            <li>
              <NavLink to='/riegelhauber'>Riegelhaube</NavLink>
            </li>
          </ul>
        </menu>
      </header>
    </>
  )
}

export default Header
