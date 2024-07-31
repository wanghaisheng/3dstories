import LogoFhp from '../Svg/LogoFhp'
import LogoUcl from '../Svg/LogoUcl'
import LogoUni from '../Svg/LogoUni'
import { useMediaQuery } from 'react-responsive'

const Footer = ({ customClass }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  return (
    <>
      <footer
        style={{ width: isBigScreen ? 'calc(100% - 15px)' : '100%' }}
        className={`absolute w-screen bottom-0 left-0 flex flex-wrap p-5 sm:p-10 z-10 items-center ${customClass}`}
      >
        <div className='flex flex-wrap w-screen justify-between '>
          <div className='footer-left justify-between md:justify-start flex-wrap flex flex-row items-center flex-grow'>
            <LogoFhp width={isBigScreen ? 180 : 110} />
            <LogoUcl className={'ml-5'} width={isBigScreen ? 140 : 90} />
            <LogoUni className={'ml-5'} width={isBigScreen ? 140 : 90} />
          </div>
          <div className='mt-3 md:mt-0 flex items-center footer-right justify-center md:justify-end flex-grow'>
            <a href='https://www.fh-potsdam.de/impressum' rel='no-referrer' target='_blank'>
              Imprint
            </a>
            <a className='ml-5' href='https://www.fh-potsdam.de/datenschutz' rel='no-referrer' target='_blank'>
              Privacy policy
            </a>
          </div>
        </div>
        <span className='mt-3 md:mt-0 flex text-xs grow md:justify-end md:justify-end justify-center'>
          © University of Potsdam 2024. All rights reserved.
        </span>
      </footer>
    </>
  )
}

export default Footer
