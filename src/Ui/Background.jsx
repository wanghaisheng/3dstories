// import FlourishPattern from '../Svg/FlourishPattern'
import './Background.css'
// import { useMediaQuery } from 'react-responsive'

const Background = () => {
  // const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
  return (
    <div className="Background">
      {/* <FlourishPattern
        width={isBigScreen ? 500 : 200}
        className={`${isBigScreen ? 'bottom-[3rem] right-[3rem]' : 'bottom-[1rem] right-[1rem]'} `}
      /> */}
      <div className="filled "></div>
    </div>
  )
}

export default Background
