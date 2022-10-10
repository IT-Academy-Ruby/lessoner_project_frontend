import "./modal.scss"
import {useState} from "react";

const Modal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const showModal = () => {
    setIsVisible(!isVisible);
  }
  return (
    <div className='field'>
      <div className={'modal ' + `${isVisible ? 'show' : ''}`}>
        <span className='close'
              onClick={showModal}>
        </span>
      </div>
      <button type='button'
              className='button'
              onClick={showModal}>
        Push me
      </button>
    </div>
  )
}
export default Modal;