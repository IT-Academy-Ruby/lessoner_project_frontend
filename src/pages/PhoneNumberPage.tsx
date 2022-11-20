import "../components/modal/modal.scss";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button";
import {DEFAULT_COUNTRY_CODE} from "../constants";
import PhoneNumber from "../components/PhoneNumber";
import {useState} from "react";

const PhoneNumberPage = () => {
  const [error, setError] = useState("Phone number incorrect");
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_COUNTRY_CODE);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const sendPhoneNumber = () => {
    if (!error) {
      navigate("/users/sign_in/phone_number/code");
    } else {
      setIsError(true);
    }
  };
  return (
    <div className='field'>
      <div className='modal'>
        <Link to='/users/sign_in/'>
          <span className='close'>
          </span>
        </Link>
        <h2 className='title'>Enter your phone number</h2>
        <PhoneNumber
          setError={setError}
          error={error}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isError={isError}/>
        <Button
          buttonType='submit'
          buttonText='Submit cod'
          onClick={sendPhoneNumber}
          className='button'/>
      </div>
    </div>
  );
};

export default PhoneNumberPage;