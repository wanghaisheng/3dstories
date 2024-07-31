const ContentContainer = ({ children, cusromClassName, fistBlock }) => {
  return fistBlock ? (
    <div className={`text-left ${cusromClassName}`}>{children}</div>
  ) : (
    <div className={`bg-black/50 text-left py-8 px-10  ${cusromClassName}`}>{children}</div>
  )
}

export default ContentContainer
