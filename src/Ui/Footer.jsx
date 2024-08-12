import LogoFhp from '../Svg/LogoFhp'
import LogoUcl from '../Svg/LogoUcl'
import LogoUni from '../Svg/LogoUni'
import { useMediaQuery } from 'react-responsive'
import { useRef, useEffect, useState } from 'react'
import { useScrollStore } from '../components/ScrollManager'
import { useSpring, a } from 'react-spring'

const Footer = ({ thresholdFooter = 1 }) => {
  const [footerLinks, setFooterLinks] = useState(false)
  const initiallScrollRatioRef = useRef(useScrollStore.getState().scrollRatio)
  const isVisibleFooter = useRef(true)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const [stylesScrollUp, apiScrollUp] = useSpring(() => ({
    opacity: initiallScrollRatioRef.current > thresholdFooter ? 1 : 0,
    y: initiallScrollRatioRef.current > thresholdFooter ? 10 : 0
  }))

  useEffect(
    () =>
      useScrollStore.subscribe(state => {
        initiallScrollRatioRef.current = state.scrollRatio
        if (isVisibleFooter.current === true) {
          setFooterLinks(true)
        } else {
          setFooterLinks(false)
        }
        if (state.scrollRatio < thresholdFooter && isVisibleFooter.current) {
          isVisibleFooter.current = false
          apiScrollUp.start({
            opacity: 0,
            y: -10
          })
        } else if (state.scrollRatio >= thresholdFooter && !isVisibleFooter.current) {
          isVisibleFooter.current = true
          apiScrollUp.start({
            opacity: 1,
            y: 0
          })
        }
      }),
    []
  )

  return (
    <a.footer
      style={stylesScrollUp}
      className={`w-screen ${
        footerLinks === false ? 'pointer-events-none' : 'pointer-events-auto'
      } fixed w-screen bottom-0 left-0 flex flex-wrap p-5 sm:p-10 items-center`}
    >
      <div className="flex z-40 flex-wrap w-screen justify-between ">
        <div className="footer-left justify-between md:justify-start flex-wrap flex flex-row items-center flex-grow">
          <LogoFhp width={isBigScreen ? 180 : 110} />
          <LogoUcl className={'ml-5'} width={isBigScreen ? 140 : 90} />
          <LogoUni className={'ml-5'} width={isBigScreen ? 140 : 90} />
        </div>
        <div className="mt-3 md:mt-0 flex items-center footer-right justify-center md:justify-end flex-grow">
          <a href="https://www.fh-potsdam.de/impressum" rel="no-referrer" target="_blank">
            Imprint
          </a>
          <a className="ml-5" href="https://www.fh-potsdam.de/datenschutz" rel="no-referrer" target="_blank">
            Privacy policy
          </a>
        </div>
      </div>
      <span className="mt-3 md:mt-0 flex text-xs grow md:justify-end md:justify-end justify-center">
        © University of Potsdam 2024. All rights reserved.
      </span>
    </a.footer>
  )
}

export default Footer
