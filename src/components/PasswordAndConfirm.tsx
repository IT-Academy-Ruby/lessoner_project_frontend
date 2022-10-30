import { useState } from "react";
import open_eye from "./icons/open_eye.svg";
import close_eye from "./icons/close_eye.svg";
import "./passwordAndConfirm.scss";

type PasswordProps = {
  minSymbol: number;
  maxSymbol: number;
  isConfirm: boolean;
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}

const PasswordAndConfirm = ({ minSymbol, maxSymbol, isConfirm, field, error }: PasswordProps): JSX.Element => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const showPassword = (): void => {
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
          className={`passwordInput ${error ? `errorInput` : ``}`}
          minLength={minSymbol}
          maxLength={maxSymbol}
          {...field}
          required />
        <img className='image' alt='eye' src={visiblePassword ? open_eye : close_eye} onClick={showPassword} />
        {error && <span className='error'>{error}</span>}
      </label>
    </div>
  )
}

export default PasswordAndConfirm;