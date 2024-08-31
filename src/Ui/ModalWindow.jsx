import './ModalWindow.css'

const ModalWindow = ({ isModalImage, closeModal, isModalVisible }) => {
  return isModalVisible === true ? (
    <div className="ModalWindow">
      <button
        onClick={() => {
          // console.log('isModalImage', isModalImage.url)
          console.log('CLOSE BUTTON', isModalVisible)
          closeModal()
        }}
      >
        Close
      </button>
      <div className="ModalWindow-content">
        <img src={`${isModalImage.url}`} alt={`${isModalImage.title}`} height="100vh" width="100vw" />
        <span>{isModalImage.title}</span>
      </div>
    </div>
  ) : null
}

export default ModalWindow
