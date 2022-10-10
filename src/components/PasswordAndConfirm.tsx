import {useState} from "react";
import open_eye from "./icons/open_eye.svg";
import close_eye from "./icons/close_eye.svg";
import "./passwordAndConfirm.scss";

type PasswordProps = {
  minSymbol: number;
  maxSymbol: number;
  isConfirm: boolean;
}

const PasswordAndConfirm = ({minSymbol, maxSymbol, isConfirm}: PasswordProps): JSX.Element => {
  const passwordRegex = new RegExp("^[-/=!#$%&'*+?^_`{|}~.A-Z0-9]{" + minSymbol + "," + maxSymbol + "}$", "i");
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isBlur, setIsBlur] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (passwordRegex.test(e.currentTarget.value) && !isConfirm) {
      setError('');
    } else {
      setError('Password must contain from 6 to 256 characters');
    }
    setValue(e.currentTarget.value);
  }

  const blurHandle = (e: React.FormEvent<HTMLInputElement>) => {
    setIsBlur(true);
  }
  const showPassword = (e: React.MouseEvent<HTMLImageElement>): void => {
    if (visiblePassword !== false) {
      setVisiblePassword(false);
    } else {
      setVisiblePassword(true);
    }
  }

  return (
    <div className='password'>
      <label className='passwordLabel'>{isConfirm ? 'Confirm password' : 'Password'}
        <input type={visiblePassword ? 'text' : 'password'}
               className={'passwordInput ' + `${(error && isBlur) ? 'errorInput' : ''}`}
               onChange={fieldHandler}
               onBlur={blurHandle}
               required/>
        <img className='image' alt='eye' src={visiblePassword ? open_eye : close_eye} onClick={showPassword}/>
        {(error && isBlur) && <span className='error'>{error}</span>}
      </label>
    </div>
  )
}

export default PasswordAndConfirm;