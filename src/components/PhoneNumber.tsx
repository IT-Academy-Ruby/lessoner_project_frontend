import {useState} from "react";
import "./phoneNumber.scss";

const PhoneNumber = () => {
  const numberRegex = /[^\d]$/;
  const [value, setValue] = useState('');
  const [isBlur, setIsBlur] = useState(false);

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (!numberRegex.test(e.currentTarget.value)) {
      setValue(e.currentTarget.value);
    }
  }

  return (
    <div className='phone Number'>
      <label className='phoneNumberLabel'>Phone number</label>
      <input
        className='phoneNumberInput'
        type='text'
        onChange={fieldHandler}
        value={value}
        required
      />
    </div>
  )
}
export default PhoneNumber;