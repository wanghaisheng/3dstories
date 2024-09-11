import { useLocation } from 'react-router-dom'
import useStore from '../GlobalState'
import Button from './Button'
import FlourishPattern from '../Svg/FlourishPattern'
import { useMediaQuery } from 'react-responsive'

const Feature = ({ title, description, ref, i, lastItem, contents }) => {
  const showFullscreenMode = useStore(state => state.showFullscreenMode)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const location = useLocation()
  const pathname = location.pathname

  const fullscreenMode = () => {
    if (showFullscreenMode === false) {
      useStore.setState({ showFullscreenMode: true })
    } else {
      useStore.setState({ showFullscreenMode: false })
    }
  }

  const scrollToInnerHeight = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth' // Optional: for smooth scrolling
    })
  }

  function findThisItem() {
    if (contents?.links?.[0].externalUrl) {
      window.open(contents.links[0].externalUrl, '_blank')
    } else {
      window.open(contents.externalUrl, '_blank')
      console.log('externalUrl', contents.externalUrl)
    }
  }

  function findThisItemTwo() {
    if (contents?.links[1].externalUrlTwo) {
      window.open(contents.links[1].externalUrlTwo, '_blank')
    } else {
      null
    }
  }

  function flashionPlatform() {
    window.open('https://refareader.fh-potsdam.de', '_blank')
  }
  function onClickHandler(e) {
    if (e.target.hasAttribute('data-href')) {
      const href = e.target.getAttribute('data-href')
      console.log('@click href:', href)
    }
    return false
  }

  return (
    <div
      className={`Feature ${i === 0 ? null : `bg-black/50`} relative text-left py-[1rem] md:py-[2rem] px-[1rem] md:px-[4rem]`}
    >
      {i === 0 ? <h1 ref={ref}>{title}</h1> : <h2 ref={ref}>{title}</h2>}
      <p className="my-5" dangerouslySetInnerHTML={{ __html: description }} onClick={onClickHandler}></p>
      {i !== 0 ? (
        <FlourishPattern
          opacity={0.15}
          width={isBigScreen ? 160 : 100}
          className={`${isBigScreen ? 'bottom-[1rem] right-[1rem]' : 'bottom-[0.5rem] right-[0.5rem]'} `}
        />
      ) : null}
      {i === 0 && pathname !== '/about' ? (
        <div className="intro-buttons">
          <Button
            onClick={scrollToInnerHeight}
            className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
            value="Read model's story"
          />
          <Button
            onClick={fullscreenMode}
            type="secondary"
            className="mt-5 mb-5 pointer-events-auto w-full md:w-auto"
            value="Explore model"
          />
        </div>
      ) : null}
      {lastItem ? (
        <>
          {contents?.links?.[0] ? (
            <Button
              onClick={findThisItem}
              className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
              value={contents?.links?.[0]?.linkValue ? contents.links[0].linkValue : 'Database'}
            />
          ) : null}
          {contents?.links?.[1] ? (
            <Button
              onClick={findThisItemTwo}
              className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
              value={contents?.links?.[1]?.linkValue ? contents.links[1].linkValue : 'Database'}
            />
          ) : null}
          {pathname !== '/about' ? (
            <Button
              onClick={flashionPlatform}
              type="secondary"
              className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
              value="Data visualization"
            />
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default Feature
