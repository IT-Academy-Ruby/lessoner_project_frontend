import "../components/modal/modal.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button";
import {DEFAULT_COUNTRY} from "../constants";
import PhoneNumber from "../components/PhoneNumber";
import {useState} from "react";

const PhoneNumberPage = () => {
  const intl = useIntl();
  const [error, setError] = useState("Phone number incorrect");
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_COUNTRY);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const sendPhoneNumber = () => {
    if (!error) {
      navigate("/users/sign_in/phone_number/code");
    } else {
      setIsError(!!error);
    }
  };
  return (
    <div className="field">
      <div className="modal">
        <Link to="/users/sign_in/">
          <span className="close">
          </span>
        </Link>
        <h2 className='title'>
       <FormattedMessage id="app.phoneNumberPage.title"/>
        </h2>
        <PhoneNumber
          setError={setError}
          error={error}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        <Button
          buttonType="submit"
          buttonText={intl.formatMessage({id: "app.phoneNumberPage.submit"})}
          className="button"/>
      </div>
    </div>
  );
};

export default PhoneNumberPage;