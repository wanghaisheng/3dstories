import './Annotation.css'
import { useViewportStore } from '../components/ViewportManager'
import { Html } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useScrollStore } from '../components/ScrollManager'

const Annotation = ({ id, ...props }) => {
  const [activeSection, setActiveSection] = useState(null)
  const availableHeight = useViewportStore(state => state.availableHeight)
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const totalPagesRef = useRef(0)
  const scrollToSlide = () => {
    window.scrollTo({
      top: availableHeight * id,
      behavior: 'smooth' // Optional: for smooth scrolling§
    })
  }

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio * (totalPagesRef.current - 1)
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        setActiveSection(pageRef.current)
        console.info('[POINT OF INTEREST]', pageRef.current, id)
      }
    })
  }, [pageRef.current])

  return (
    <Html {...props} style={{ pointerEvents: 'auto' }} occlude="raycast">
      <span onClick={() => scrollToSlide()} className={`Annotation ${id === activeSection ? 'active' : ''}`}></span>
    </Html>
  )
}

export default Annotation
