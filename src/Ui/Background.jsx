import './Background.css'
import { useEffect, useRef, useState } from 'react'
import { useScrollStore } from '../components/ScrollManager'
import RobeFrancaiseContent from '../Data/robeFrancaise.json'
import GreekStyleDressContent from '../Data/greekStyleDress.json'
import ArmorContent from '../Data/armor.json'
import DoubletContent from '../Data/doublet.json'
import IntroContent from '../Data/introduction.json'
const Background = ({ pathname, showFullscreenMode }) => {
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const totalPagesRef = useRef(0)
  const [backgroundClass, setBackgroundClass] = useState('')

  const IntroRoute = '/'
  const RobexRoute = '/robe'
  const ArmorRoute = '/armor'
  const DoubletRoute = '/doublet'
  const GreekStyleDressRoute = '/greek_style_dress'

  const AvailableContents = {
    [RobexRoute]: RobeFrancaiseContent,
    [ArmorRoute]: ArmorContent,
    [DoubletRoute]: DoubletContent,
    [GreekStyleDressRoute]: GreekStyleDressContent,
    [IntroRoute]: IntroContent
  }
  const contents = AvailableContents[pathname]

  const backgroundValues = contents?.sections
    .filter(section => section.background)
    .map(section => ({ id: section.id, background: section.background }))
  console.info('Background values:', backgroundValues)

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio * (totalPagesRef.current - 1)
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        const currentSection = backgroundValues?.find(section => section.id === pageRef.current + 1)
        if (currentSection) {
          setBackgroundClass(currentSection.background)
        } else {
          setBackgroundClass('')
        }
        console.info('[BG]', currentSection, pageRef.current, backgroundClass)
      }
    })
  }, [pageRef.current])

  return (
    <div className={`Background ${backgroundClass} pointer-events-none`}>
      {showFullscreenMode === true ? <div className="filled"></div> : null}
    </div>
  )
}

export default Background
