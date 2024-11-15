import { Link, useLocation } from 'react-router-dom'
import useStore from '../GlobalState'
import Button from './Button'
import FlourishPattern from '../Svg/FlourishPattern'
import { useMediaQuery } from 'react-responsive'
import NavPrevNextButtons from './NavPrevNextButtons'

const Feature = ({ title, description, ref, i, lastItem, contents, openModal, scrollToTop }) => {
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
      console.debug('externalUrl', contents.externalUrl)
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
      console.debug('@click href:', href)
      openModal(href)
    }
    return false
  }

  return (
    <div
      className={`Feature ${i === 0 ? null : `bg-black/50`} min-w-full relative text-left py-[1rem] md:py-[2rem] px-[1rem] md:px-[2rem]`}
    >
      {i === 0 ? (
        <div className="flex items-center flex-col lg:flex-row">
          <NavPrevNextButtons className="mr-[2rem]" scrollToTop={scrollToTop} />
          <div className="flex flex-col">
            <h1 className="" ref={ref} dangerouslySetInnerHTML={{ __html: title }}></h1>
            <div className="intro-buttons">
              {pathname !== '/' ? (
                <>
                  <Button
                    onClick={scrollToInnerHeight}
                    className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
                    value="Read model's story"
                  />
                  <Button
                    onClick={fullscreenMode}
                    type="secondary"
                    className="mt-5 pointer-events-auto w-full md:w-auto"
                    value="Explore model"
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <h2 ref={ref} dangerouslySetInnerHTML={{ __html: title }}></h2>
      )}
      <p className="my-4" dangerouslySetInnerHTML={{ __html: description }} onClick={onClickHandler}></p>

      {/* {i === 0 && pathname !== '/' ? (

      ) : null} */}
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
          {pathname !== '/' ? (
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
