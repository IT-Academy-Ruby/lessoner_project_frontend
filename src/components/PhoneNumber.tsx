import "react-phone-input-2/lib/style.css";
import "./input.scss";
import "./phoneNumber.scss";
import {FormattedMessage, useIntl} from "react-intl";
import React, {useState} from "react";
import Magmagnifying from "./icons/magnifying_glass.svg";
import PhoneInput from "react-phone-input-2";

const deleteCountry: [string] = ["ke"];

type PhoneNumberProps = {
  error: string;
  setError: (str: string) => void;
  phoneNumber: string,
  setPhoneNumber: (str: string) => void;
  isError: boolean;
}
type countryType = {
  countryCode: string,
  dialCode: string,
  format: string,
  name: string
}

const PhoneNumber = ({
  error, setError, phoneNumber, setPhoneNumber, isError
}: PhoneNumberProps) => {
  const intl = useIntl();
  const [isBlur, setIsBlur] = useState(false);

  const checkNumber =
    (value: string, country: countryType, e: React.ChangeEvent<HTMLDivElement>,
      formattedValue: string) => {
      if (country.format) {
        if (formattedValue.split(" ").join("").length
          !== country.format.split(" ").join("").length) {
          setError(intl.formatMessage({id: "app.phoneNumber.err"}));
        } else {
          setError("");
        }
        setPhoneNumber(value);
      }
    };

  return (
    <label className="input-label">
      <FormattedMessage id="app.phoneNumber.label"/>
      <img src={Magmagnifying} alt="" className="magmagnifying_glas"/>
      <PhoneInput
        onChange={checkNumber}
        onBlur={() => {
          setIsBlur(true);
        }}
        excludeCountries={deleteCountry}
        value={phoneNumber}
        placeholder=""
        enableLongNumbers={true}
        inputProps={{required: true}}
      />
      <div className="symbol">&#10095;</div>
      {((error && isBlur) || isError) && <span className="error-message">{error}</span>}
    </label>
  );
};

export default PhoneNumber;