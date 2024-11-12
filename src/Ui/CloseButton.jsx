import './CloseButton.css'

const CloseButton = ({ className = '', size = 30, onClick, style }) => {
  const ration = size - 14
  return (
    <button
      role="button"
      aria-label="Close button"
      onClick={onClick}
      className={`CloseButton ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <span className="line one" style={{ width: ration }}></span>
      <span className="line two" style={{ width: ration }}></span>
    </button>
  )
}

export default CloseButton
