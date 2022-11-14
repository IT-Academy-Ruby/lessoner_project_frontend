import "../components/modal/modal.scss";
import { FormattedMessage , useIntl } from "react-intl";
import Button from "../components/Button";
import {Link} from "react-router-dom";
import PhoneNumber from "../components/PhoneNumber";
import {useState} from "react";

const defaultCountry = "375";
const PhoneNumberPage = () => {
  const intl = useIntl();
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(defaultCountry);

  return (
    <div className='field'>
      <div className='modal'>
        <Link to='/'>
          <span className='close'></span>
        </Link>
        <h2 className='title'>
          <FormattedMessage id="app.phoneNumberPage.title" />
        </h2>
        <PhoneNumber setError={setError}
          error={error}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}/>
        <Button buttonType='submit'
          buttonText={intl.formatMessage({ id: "app.phoneNumberPage.submit" })} />
      </div>
    </div>
  );
};
export default PhoneNumberPage;