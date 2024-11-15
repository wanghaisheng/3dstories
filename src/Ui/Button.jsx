import './Button.css'

const Button = ({ value = '', type = 'primary', size = 'lg', className, onClick }) => {
  return (
    <button onClick={onClick} className={`${type} ${size} ${className}`} type="button">
      {value}
    </button>
  )
}

export default Button
