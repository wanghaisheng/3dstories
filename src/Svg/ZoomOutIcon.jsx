const ZoomOutIcon = ({ color = 'var(--white)', width = 40, opacity = 1, strokeWidth = 1, className }) => {
  const ratio = 41.9 / 41.9
  const height = width / ratio

  return (
    <div className={`mobile-icon SVG ${className}`} style={{ height: height + 'px', width: width + 'px' }}>
      <svg id="ZoomOutIcon" data-name="ZoomOutIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.9 41.9">
        <path
          d="m8.57 33.23 10.41-10.31M14.3 22.99l4.68-.07-.07 4.69M15.99 31.44c.62 2.51-.02 5.27-1.98 7.23-2.98 2.98-7.8 2.98-10.78 0s-2.98-7.8 0-10.78c1.85-1.85 4.41-2.53 6.8-2.07M33.33 8.67 22.92 18.98M27.61 18.91l-4.69.07.07-4.68M25.91 10.46c-.62-2.51.02-5.27 1.98-7.23 2.98-2.98 7.8-2.98 10.78 0s2.98 7.8 0 10.78c-1.85 1.85-4.41 2.53-6.8 2.07"
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

export default ZoomOutIcon
