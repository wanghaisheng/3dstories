import { useMediaQuery } from 'react-responsive'
const ScrollPageContainer = ({ children, customJustify, customMargin, firstContainer, height = 100 }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  return (
    <>
      <div
        className={`ScrollPageContainer pointer-events-none z-30 ${
          firstContainer
            ? `sm:translate-x-[0rem] md:translate-x-[1rem] lg:translate-x-[4rem] xl:translate-x-[14rem] lg:max-w-[50%] ${
                isBigScreen ? 'items-center' : 'items-end'
              }`
            : 'sm:translate-x-[0rem] lg:translate-x-[4rem] md:max-w-[60%] lg:max-w-[50%] 2xl:max-w-[40%] items-center'
        }  px-[1rem] md:px-[0rem] flex flex-row justify-items-start ${(customJustify, customMargin)}`}
        style={{ height: height + 'vh' }}
      >
        {children}
      </div>
    </>
  )
}

export default ScrollPageContainer
