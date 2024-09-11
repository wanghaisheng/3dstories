import './ModalWindow.css'

const ModalWindow = ({ isModalImage, closeModal, isModalVisible }) => {
  return (
    <div className={`ModalWindow ${isModalVisible ? 'open' : null}`}>
      <button
        className="absolute top-4 right-4"
        onClick={() => {
          // console.log('isModalImage', isModalImage.url)
          console.log('CLOSE BUTTON', isModalVisible)
          closeModal()
        }}
      >
        Close
      </button>
      <div className="ModalWindow-content">
        <img src={`${isModalImage?.url}`} alt={`${isModalImage?.title}`} />
        <figcaption className="mt-3">{isModalImage?.title}</figcaption>
      </div>
    </div>
  )
}

export default ModalWindow
