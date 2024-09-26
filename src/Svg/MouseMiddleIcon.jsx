const MouseMiddleIcon = ({ color = 'var(--white)', width = 40, opacity = 1, strokeWidth = 1, className }) => {
  const ratio = 41.9 / 41.9
  const height = width / ratio

  return (
    <div className={`desktop-icon SVG ${className}`} style={{ height: height + 'px', width: width + 'px' }}>
      <svg
        id="MouseMiddleIcon"
        data-name="Mouse-middle-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 41.9 41.9"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.9 41.9">
          <rect x="18.56" y="10.02" width="4.79" height="8.31" rx="2.39" ry="2.39" fill={color} opacity="0.25" />
          <path
            d="M20.95 39.55h0c-6.58 0-11.91-5.33-11.91-11.91V14.25c0-6.58 5.33-11.91 11.91-11.91h0c6.58 0 11.91 5.33 11.91 11.91v13.39c0 6.58-5.33 11.91-11.91 11.91Zm2.4-23.61v-3.52a2.39 2.39 0 0 0-2.39-2.39h0a2.39 2.39 0 0 0-2.39 2.39v3.52a2.39 2.39 0 0 0 2.39 2.39h0a2.39 2.39 0 0 0 2.39-2.39ZM9.04 24.93h23.82m-11.91-6.6v6.6m0-22.58v7.67"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            opacity={opacity}
            stroke={color}
          />
        </svg>
      </svg>
    </div>
  )
}

export default MouseMiddleIcon
