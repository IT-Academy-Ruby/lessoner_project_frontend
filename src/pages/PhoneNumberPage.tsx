import "./modal.scss";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import {DEFAULT_COUNTRY_CODE} from "../constants";
import PhoneNumber from "../components/PhoneNumber";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type PhoneProps = {
  registration: boolean | undefined;
}

const PhoneNumberPage = ({registration}: PhoneProps) => {
  const intl = useIntl();
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
    <div className="log-content">
      <div className="wrapper-component">
        <h2 className="title">
          <FormattedMessage id="app.phoneNumberPage.title"/>
        </h2>
        <PhoneNumber
          setError={setError}
          error={error}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isError={isError}
        />
        {registration && <Checkbox
          information={intl.formatMessage({id: "app.checkbox"})}
          link={intl.formatMessage({id: "app.checkbox.terms"})}
        />}
        <Button
          buttonType={"submit"}
          buttonText={intl.formatMessage({id: "app.phoneNumberPage.submit"})}
          onClick={sendPhoneNumber}
          className={"button__page"}
        />
      </div>
    </div>
  );
};

export default PhoneNumberPage;