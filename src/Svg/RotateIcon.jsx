const RotateIcon = ({ color = 'var(--white)', width = 40, opacity = 1, strokeWidth = 1, className }) => {
  const ratio = 40.22 / 40.22
  const height = width / ratio

  return (
    <div className={`mobile-icon SVG ${className}`} style={{ height: height + 'px', width: width + 'px' }}>
      <svg id="RotateIcon" data-name="RotateIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.22 40.22">
        <path
          d="M26.62 24.09c-1.33 2.21-3.74 3.71-6.51 3.71-4.21 0-7.62-3.41-7.62-7.62s3.41-7.62 7.62-7.62c2.62 0 4.9 1.33 6.27 3.34M20.11 20.11l19.11.07M35.86 16.92l3.36 3.26-3.36 3.27M8.52 20.11 1 20.04M4.36 23.3 1 20.04l3.36-3.26M20.11 8.52 20.18 1M16.92 4.36 20.18 1l3.27 3.36M20.11 31.7l-.07 7.52M23.3 35.86l-3.26 3.36-3.26-3.36"
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

export default RotateIcon
