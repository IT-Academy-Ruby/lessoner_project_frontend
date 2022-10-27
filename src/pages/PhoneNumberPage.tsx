import "../components/modal/modal.scss";
import Button from "../components/Button";
import PhoneNumber from "../components/PhoneNumber";
import {useState} from "react";
import {Link} from "react-router-dom";

const PhoneNumberPage = () => {
  const [error, setError] = useState('Phone number incorrect');
  const [phoneNumber, setPhoneNumber] = useState('375');
  const [isError, setIsError] = useState(false);

  const sendPhoneNumber = () => {
    error ? setIsError(true) : setIsError(false);
    if (!error) {
      window.location.href = '/users/sign_in/phone_number/code';
    }
  }
  return (
    <div className='field'>
      <div className='modal'>
        <Link to='/users/sign_in/'>
                  <span className='close'>
                  </span>
        </Link>
        <h2 className='title'>Enter your phone number</h2>
        <PhoneNumber setError={setError}
                     error={error}
                     phoneNumber={phoneNumber}
                     setPhoneNumber={setPhoneNumber}
                     isError={isError}/>
        <Button buttonType={'submit'}
                buttonText={'Submit cod'}
                onClick={sendPhoneNumber}
                className={'button'}/>
      </div>
    </div>
  )
}
export default PhoneNumberPage;