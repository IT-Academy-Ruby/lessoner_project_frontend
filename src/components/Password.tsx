import {useState} from "react";
import open_eye from "./icons/open_eye.svg";
import close_eye from "./icons/close_eye.svg";
import "./password.scss";

type PasswordProps = {
  minSymbol: number;
  maxSymbol: number;
}

const Password = ({minSymbol, maxSymbol}: PasswordProps) => {
  const passwordRegex = new RegExp("^[-/\\=!#$%&'*+?^_`{|}~.A-Z\d]{" + minSymbol + "," + maxSymbol + "}$", "i");
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (passwordRegex.test(e.currentTarget.value)) {
      setIsError(false);
    } else {
      setIsError(true);
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
      <label className='passwordLabel'>Password</label>
      <input type={visiblePassword ? 'text' : 'password'}
             className={'passwordInput ' + `${(isError && isBlur) ? 'errorInput' : ''}`}
             onChange={fieldHandler}
             onBlur={blurHandle}
             required/>
      <img className='image' alt='eye' src={visiblePassword ? open_eye : close_eye} onClick={showPassword}/>
      {(isError && isBlur) && <span className='error'>Password must contain from 6 to 256 characters</span>}
    </div>
  )
}

export default Password;