const ZoomInIcon = ({ color = 'var(--white)', width = 40, opacity = 1, strokeWidth = 1, className }) => {
  const ratio = 37.66 / 38.85
  const height = width / ratio

  return (
    <div className={`mobile-icon SVG ${className}`} style={{ height: height + 'px', width: width + 'px' }}>
      <svg id="ZoomInIcon" data-name="ZoomInIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.66 38.85">
        <path
          d="M26.35 11.41 36.66 1M36.59 5.68 36.66 1l-4.69.07M28.13 3.99c-2.51-.62-5.27.02-7.23 1.98-2.98 2.98-2.98 7.8 0 10.78s7.8 2.98 10.78 0c1.85-1.85 2.53-4.41 2.07-6.8M11.41 27.55 1 37.85M5.68 37.79 1 37.85l.07-4.68M3.99 29.33c-.62-2.51.02-5.27 1.98-7.23 2.98-2.98 7.8-2.98 10.78 0s2.98 7.8 0 10.78c-1.85 1.85-4.41 2.53-6.8 2.07"
          fill="none"
          opacity={opacity}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  )
}

export default ZoomInIcon
