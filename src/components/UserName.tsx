import {useState, useEffect} from "react";
import "./userName.scss";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getUser} from "../store/loginName/userSlice";
import {AnyAction, Dispatch} from "redux";
import classNames from 'classnames';

type UserNameProps = {
  minSymbol: number;
  maxSymbol: number;
}
const UserName = ({minSymbol, maxSymbol}: UserNameProps): JSX.Element => {
  const userNameRegex = new RegExp('^[A-Z\d]{' + minSymbol + ',' + maxSymbol + '}$', 'i');
  const [value, setValue] = useState('');
  const [isBlur, setIsBlur] = useState(false);
  const [extraStyle, setExtraStyle] = useState('');
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.user.isLogged);

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
    dispatch(getUser(value));

    if (!userNameRegex.test(value)) {
      setError('Invalid username entered');
      setExtraStyle('errorInput');
    } else {
      setError('');
    }
  }

  useEffect(() => {
    if (userStatus) {
      setError('User already exists. Please enter a different username');
      setExtraStyle('redBorder')
    }
  }, [userStatus]);

  const blurHandle = () => {
    setIsBlur(true);
  }

  return (
    <div className='userName'>
      <label className='userNameLabel'>Username</label>
      <input type='text'
             required
             className={classNames('userNameInput', {[`${extraStyle}`]: (isBlur && error)})}
             onChange={fieldHandler}
             onBlur={blurHandle}/>
      {(error && isBlur) && <span className='error'>{error}</span>}
    </div>
  )
}
export default UserName;