import './Background.css'

const Background = ({ transpartent }) => {
  return (
    <>
      <div className='Background'></div>
      {transpartent ? null : <div className='filled '></div>}
    </>
  )
}

export default Background
