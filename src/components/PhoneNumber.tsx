import {useState} from "react";
import "./phoneNumber.scss";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type PhoneNumberProps = {
  error: string;
  setError: (str: string) => void;
  phoneNumber: string,
  setPhoneNumber: (str: string) => void;
}

const PhoneNumber = ({setError, error, phoneNumber, setPhoneNumber}: PhoneNumberProps) => {
  const [isBlur, setIsBlur] = useState(false);
  return (
    <div className='phone Number'>
      <label className='phoneNumberLabel'>Phone number
        <PhoneInput
          onChange={(value: string, country: any, e: React.ChangeEvent<HTMLInputElement>, formattedValue: string) => {
            console.log(typeof country.format)
            if (formattedValue.length !== country.format.length) {
              setError('Phone number incorrect');
            } else {
              setError('')
            }
            setPhoneNumber(value);
          }}
          onBlur={() => {
            setIsBlur(true);
          }}
          inputStyle={{width: '100%', borderColor: '#0B456F'}}
          buttonStyle={{borderColor: '#0B456F'}}
          dropdownStyle={{width: 'auto', border: '1px solid #0B456F', borderRadius: '3px'}}
          country='us'
          value={phoneNumber}
          inputProps={{
            required: true,
          }}
        />
        {(error && isBlur) && <span className='error'>{error}</span>}
      </label>
    </div>
  )
}
export default PhoneNumber;