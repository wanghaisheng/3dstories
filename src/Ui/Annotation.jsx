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
  const totalPagesRef = useRef(0)
  const scrollToSlide = () => {
    window.scrollTo({
      top: availableHeight * id,
      behavior: 'smooth'
    })

    // Manually handle the duration for 2 seconds
    const start = window.scrollY
    const end = availableHeight * id
    const duration = 2000
    const startTime = performance.now()

    const animateScroll = currentTime => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeInOutQuad = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
      const easedProgress = easeInOutQuad(progress)
      window.scrollTo(0, start + (end - start) * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  const hoverOverPoint = () => {
    const slideElement = document.querySelector(`.slide-${id + 1} button`)
    if (slideElement) {
      slideElement.classList.add('active')
      console.log(`Button text: ${slideElement?.textContent}`)
      return slideElement?.textContent
    } else {
      return null
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
        useStore.setState({ showFullscreenMode: false })
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
