import {useState} from "react";
import "./phoneNumber.scss";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const countries = 'us';
const deleteCountry: [string] = ['ke'];

type PhoneNumberProps = {
  error: string;
  setError: (str: string) => void;
  phoneNumber: string,
  setPhoneNumber: (str: string) => void;
  isError: boolean;
}

const PhoneNumber = ({setError, error, phoneNumber, setPhoneNumber, isError}: PhoneNumberProps) => {
  const [isBlur, setIsBlur] = useState(false);

  const checkNumber = (value: string, country: any, e: React.ChangeEvent<HTMLInputElement>, formattedValue: string) => {
    if (formattedValue.length !== country.format.length) {
      setError('Phone number incorrect');
    } else {
      setError('');
    }
    setPhoneNumber(value);
  }

  return (
    <div className='phone-number'>
      <label className='phone-number-label'>Phone number
        <PhoneInput
          onChange={checkNumber}
          onBlur={() => {
            setIsBlur(true);
          }}
          inputStyle={{width: '100%', borderColor: '#0B456F'}}
          buttonStyle={{borderColor: '#0B456F'}}
          dropdownStyle={{width: 'auto', border: '1px solid #0B456F', borderRadius: '3px'}}
          country={countries}
          excludeCountries={deleteCountry}
          value={phoneNumber}
          inputProps={{
            required: true,
          }}
        />
        {((error && isBlur) || isError) && <span className='error'>{error}</span>}
      </label>
    </div>
  )
}
export default PhoneNumber;