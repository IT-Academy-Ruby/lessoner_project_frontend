import "./phoneNumber.scss";
import "react-phone-input-2/lib/style.css";
import { FormattedMessage , useIntl } from "react-intl";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";

type PhoneNumberProps = {
  error: string;
  setError: (str: string) => void;
  phoneNumber: string,
  setPhoneNumber: (str: string) => void;
}
type countryType = {
  countryCode: string,
  dialCode: string,
  format: string,
  name:string

}
const PhoneNumber=({
  setError, error, phoneNumber, setPhoneNumber 
}: PhoneNumberProps) => {
  const intl = useIntl();
  const [isBlur, setIsBlur] = useState(false);

  const checkNumber =
    (value: string, country: countryType, e: React.ChangeEvent<HTMLInputElement>,
      formattedValue: string) => {
      if (formattedValue.split(" ").join("").length !== country.format.split(" ").join("").length) {
        setError(intl.formatMessage({ id: "app.phoneNumber.err"}));
      } else {
        setError("");
      }
      setPhoneNumber(value);
    };
  
  return (
    <div className='phone Number'>
      <label className='phoneNumberLabel'>
        <FormattedMessage id="app.phoneNumber.label" />
        <PhoneInput
          onChange={checkNumber}
          onBlur={() => {
            setIsBlur(true);
          }}
          inputStyle={{width: "100%", borderColor: "#0B456F"}}
          buttonStyle={{borderColor: "#0B456F"}}
          dropdownStyle={{
            width: "auto", border: "1px solid #0B456F", borderRadius: "3px"
          }}
          country='us'
          value={phoneNumber}
          enableLongNumbers={true}
          inputProps={{required: true,}}
        />
        {(error && isBlur) && <span className='error'>{error}</span>}
      </label>
    </div>
  );
};
export default PhoneNumber;