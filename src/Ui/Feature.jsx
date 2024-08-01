import { useSetAtom } from 'jotai'
import { showFullscreenMode } from '../GlobalState'
import Button from './Button'

const Feature = ({ title, description, ref, i, lastItem, contents }) => {
  const setShowFullscreenMode = useSetAtom(showFullscreenMode)

  const fullscreenMode = () => {
    setShowFullscreenMode(true)
  }

  const scrollToInnerHeight = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth', // Optional: for smooth scrolling
    })
  }

  function findThisItem() {
    window.open(contents.externalUrl, '_blank')
  }

  function flashionPlatform() {
    window.open('https://refareader.fh-potsdam.de', '_blank')
  }

  return (
    <div className={`Feature ${i === 0 ? null : `bg-black/50`} text-left py-8 px-10`}>
      {i === 0 ? <h1 ref={ref}>{title}</h1> : <h2 ref={ref}>{title}</h2>}
      <p className='my-5' dangerouslySetInnerHTML={{ __html: description }}></p>
      {i === 0 ? (
        <>
          <Button
            onClick={scrollToInnerHeight}
            className='mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto'
            value="Read model's story"
          />
          <Button
            onClick={fullscreenMode}
            type='secondary'
            className='mt-5 mb-5 pointer-events-auto w-full md:w-auto'
            value='Explore model'
          />
        </>
      ) : null}
      {lastItem ? (
        <>
          <Button
            onClick={findThisItem}
            className='mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto'
            value="Read model's story"
          />
          <Button
            onClick={flashionPlatform}
            type='secondary'
            className='mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto'
            value='Find this item'
          />
        </>
      ) : null}
    </div>
  )
}

export default Feature
