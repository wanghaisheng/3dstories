import './ScrollDownIndicator.css'

const ScrollDownIndicator = ({ className, bottom }) => {
  return (
    <div
      className={`ScrollDownIndicator flex items-center justify-center ${className}`}
      style={{ bottom: bottom + 'px' }}
    >
      <span></span>
    </div>
  )
}

export default ScrollDownIndicator
