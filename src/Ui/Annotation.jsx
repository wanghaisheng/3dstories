import { useViewportStore } from '../components/ViewportManager'
import { Html } from '@react-three/drei'

import './Annotation.css'
const Annotation = ({ id, ...props }) => {
  const availableHeight = useViewportStore(state => state.availableHeight)
  const scrollToSlide = () => {
    window.scrollTo(0, availableHeight * id)
    // console.log('ID', id, length, i)
  }

  return (
    <Html {...props} style={{ pointerEvents: 'auto' }} occlude="raycast">
      <span onClick={() => scrollToSlide()} className="Annotation"></span>
    </Html>
  )
}

export default Annotation
