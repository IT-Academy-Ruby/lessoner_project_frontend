import {useState} from "react";
import "./userName.scss";

type UserNameProps = {
  minSymbol: number;
  maxSymbol: number;
}
const UserName = ({minSymbol, maxSymbol}: UserNameProps):JSX.Element => {
  const userNameRegex = new RegExp('^[A-Z\d]{' + minSymbol + ',' + maxSymbol + '}$', 'i');
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (userNameRegex.test(e.currentTarget.value)) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    setValue(e.currentTarget.value);
  }

  const blurHandle = (e: React.FormEvent<HTMLInputElement>) => {
      setIsBlur(true);
  }

  return (
    <div className='userName'>
      <label className='userNameLabel'>Username</label>
      <input type='text'
             required
             className={'userNameInput ' + `${(isError && isBlur) ? 'errorInput' : ''}`}
             onChange={fieldHandler}
             onBlur={blurHandle}/>
      {(isError && isBlur) && <span className='error'>Invalid username entered</span>}
    </div>
  )
}
export default UserName;