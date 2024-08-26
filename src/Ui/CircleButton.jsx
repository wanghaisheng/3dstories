import VectorIcon from '../Svg/VectorIcon'
import './CircleButton.css'

const CircleButton = ({ size = 120, className, rotate = 0, width = 44 }) => {
  return (
    <div
      className={`CircleButton ${className} flex items-center justify-center`}
      style={{
        height: size + 'px',
        width: size + 'px',
        borderRadius: size / 2 + 'px',
        transform: 'rotate(' + rotate + 'deg)'
      }}
    >
      <VectorIcon width={width} />
    </div>
  )
}

export default CircleButton
