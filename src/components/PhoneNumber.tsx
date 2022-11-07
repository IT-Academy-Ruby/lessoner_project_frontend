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

  const checkNumber = (value: string, country: any, e: React.ChangeEvent<HTMLInputElement>, formattedValue: string) => {
    if (formattedValue.split(' ').join('').length !== country.format.split(' ').join('').length) {
      setError('Phone number incorrect');
    } else {
      console.log('format',country.format);
      setError('')
    }
    setPhoneNumber(value);
  }

  return (
    <div className='phone Number'>
      <label className='phoneNumberLabel'>Phone number
        <PhoneInput
          onChange={checkNumber}
          onBlur={() => {
            setIsBlur(true);
          }}
          inputStyle={{width: '100%', borderColor: '#0B456F'}}
          buttonStyle={{borderColor: '#0B456F'}}
          dropdownStyle={{width: 'auto', border: '1px solid #0B456F', borderRadius: '3px'}}
          country='us'
          value={phoneNumber}
          enableLongNumbers={true}
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