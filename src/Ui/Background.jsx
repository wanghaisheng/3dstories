import './Background.css'
import { useEffect, useRef, useState } from 'react'
import { useScrollStore } from '../components/ScrollManager'
import RobeFrancaiseContent from '../Data/robeFrancaise.json'
import GreekStyleDressContent from '../Data/greekStyleDress.json'
import DoubletContent from '../Data/doublet.json'

const Background = ({ pathname }) => {
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const totalPagesRef = useRef(0)
  const [backgroundClass, setBackgroundClass] = useState('')

  const IndexRoute = '/'
  const DoubletRoute = '/doublet'
  const GreekStyleDressRoute = '/greek_style_dress'

  const AvailableContents = {
    [IndexRoute]: RobeFrancaiseContent,
    [DoubletRoute]: DoubletContent,
    [GreekStyleDressRoute]: GreekStyleDressContent
  }
  const contents = AvailableContents[pathname]

  const backgroundValues = contents.sections
    .filter(section => section.background)
    .map(section => ({ id: section.id, background: section.background }))
  console.info('Background values:', backgroundValues)

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio * (totalPagesRef.current - 1)
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        const currentSection = backgroundValues.find(section => section.id === pageRef.current + 1)
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
    <div className={`Background ${backgroundClass}`}>
      <div className="filled"></div>
    </div>
  )
}

export default Background
