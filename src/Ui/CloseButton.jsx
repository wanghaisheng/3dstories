import './CloseButton.css'

const CloseButton = ({ className = '', size = 30, onClick, style }) => {
  const ration = size - 14
  return (
    <button
      onClick={onClick}
      className={`CloseButton pointer-events-auto ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <span className="line one" style={{ width: ration }}></span>
      <span className="line two" style={{ width: ration }}></span>
    </button>
  )
}

export default CloseButton
