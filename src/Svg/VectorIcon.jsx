const VectorIcon = ({ color = 'var(--white)', width = 44, className }) => {
  const ratio = 44 / 12
  const height = width / ratio

  return (
    <svg
      className={`VectorIcon SVG ${className} flex`}
      id="VectorIcon"
      data-name="Logo FH;P"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 12"
      style={{ height: height + 'px', width: width + 'px' }}
      fill={color}
    >
      <path d="M33.509 0 44 6l-10.491 6a2.916 2.916 0 0 0 0-4.152 2.969 2.969 0 0 0-2.096-.86H0V5.012h31.413c.759 0 1.518-.286 2.096-.86a2.916 2.916 0 0 0 0-4.151Z" />
    </svg>
  )
}

export default VectorIcon
