import './Annotation.css'
import { useViewportStore } from '../components/ViewportManager'
import { Html } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useScrollStore } from '../components/ScrollManager'
import useStore from '../GlobalState'

const Annotation = ({ id, ...props }) => {
  const [activeSection, setActiveSection] = useState(null)
  const availableHeight = useViewportStore(state => state.availableHeight)
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const delayFullscreenTimerRef = useRef(null)
  const totalPagesRef = useRef(0)
  const scrollToSlide = () => {
    const startOffset = availableHeight * (id - 1)
    console.info('[Annotation] scrollToSlide', startOffset)
    window.scrollTo({
      top: startOffset,
      behavior: 'auto'
    })
  }

  const hoverOverPoint = () => {
    const slideElement = document.querySelector(`.slide-${id} button`)
    if (slideElement) {
      slideElement.classList.add('active')
      console.debug(`Button text: ${slideElement?.textContent}`)
      return slideElement?.textContent
    } else {
      return 'Go to slide' + ' ' + id
    }
  }

  useEffect(() => {
    hoverOverPoint()
  }, [id])

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio * (totalPagesRef.current - 1)
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        setActiveSection(pageRef.current)
        clearTimeout(delayFullscreenTimerRef.current)
        delayFullscreenTimerRef.current = setTimeout(() => {
          useStore.setState({ showFullscreenMode: false })
        }, 500)
        console.info('[POINT OF INTEREST]', pageRef.current, id)
      }
    })
  }, [pageRef.current])

  const [hoverText, setHoverText] = useState('')

  return (
    <Html {...props} style={{ pointerEvents: 'auto' }} occlude="raycast">
      <span
        onClick={() => scrollToSlide()}
        onMouseEnter={() => {
          setHoverText(hoverOverPoint())
          setActiveSection(id)
        }}
        onMouseLeave={() => setActiveSection(null)}
        className={`Annotation ${id === activeSection ? 'active' : ''}`}
      >
        <p className="tooltips">{hoverText}</p>
      </span>
    </Html>
  )
}

export default Annotation
