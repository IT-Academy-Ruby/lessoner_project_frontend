import "react-phone-input-2/lib/style.css";
import "./phoneNumber.scss";
import {FormattedMessage, useIntl} from "react-intl";
import Magmagnifying from "./icons/magnifying_glass.svg";
import PhoneInput from "react-phone-input-2";
import {useState} from "react";

const countries = "us";
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
  setError, error, phoneNumber, setPhoneNumber, isError
}: PhoneNumberProps) => {
  const intl = useIntl();
  const [isBlur, setIsBlur] = useState(false);
  const checkNumber =
    (value: string, country: countryType, e: React.ChangeEvent<HTMLInputElement>,
      formattedValue: string) => {
      if (formattedValue.split(" ").join("").length !== country.format.split(" ").join("").length) {
        setError(intl.formatMessage({id: "app.phoneNumber.err"}));
      } else {
        setError("");
      }
      setPhoneNumber(value);
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
          dropdownStyle={{
            // width: "auto", border: "1px solid #0B456F", borderRadius: "3px"
          }}
          country={countries}
          excludeCountries={deleteCountry}
          value={phoneNumber}
          enableLongNumbers={true}
          inputProps={
            {required: true,}
          }
        />
        <div
          className="symbol"
          // onClick={showPassword}
        >&#10095;</div>
        {((error && isBlur) || isError) && <span className="error-message">{error}</span>}
      </label>
  );
};
export default PhoneNumber;