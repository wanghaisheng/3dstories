const MoveIcon = ({ color = 'var(--white)', width = 40, opacity = 1, strokeWidth = 1, className }) => {
  const ratio = 40.22 / 37.02
  const height = width / ratio

  return (
    <div className={`mobile-icon SVG ${className}`} style={{ height: height + 'px', width: width + 'px' }}>
      <svg id="MoveIcon" data-name="MoveIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.22 37.02">
        <path
          d="M26.62 32.31c-1.33 2.21-3.74 3.71-6.51 3.71-4.21 0-7.62-3.41-7.62-7.62s3.41-7.62 7.62-7.62c2.62 0 4.9 1.33 6.27 3.34M20.11 28.33l19.11.07M35.86 25.13l3.36 3.27-3.36 3.26M8.52 28.33 1 28.25M4.36 31.52 1 28.25l3.36-3.26M13.6 4.71C14.93 2.5 17.34 1 20.11 1c4.21 0 7.62 3.41 7.62 7.62s-3.41 7.62-7.62 7.62c-2.62 0-4.9-1.33-6.27-3.34M20.11 8.69 1 8.62M4.36 11.89 1 8.62l3.36-3.26M31.7 8.69l7.52.07M35.86 5.5l3.36 3.26-3.36 3.27"
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

export default MoveIcon
