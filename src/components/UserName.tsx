import {useState, useEffect} from "react";
import "./userName.scss";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getUser} from "../store/loginName/userSlice";
import classNames from 'classnames';

type UserNameProps = {
  minSymbol: number;
  maxSymbol: number;
  field: {
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}
const UserName = ({minSymbol, maxSymbol, field, error}: UserNameProps): JSX.Element => {

  // const userNameRegex = new RegExp('^[A-Z\d]{' + minSymbol + ',' + maxSymbol + '}$', 'i');

  const [extraStyle, setExtraStyle] = useState('');
  const [busyName, setBusyName] = useState('');

  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.user.isLogged);

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(getUser(e.currentTarget.value));
  }

  useEffect(() => {
    if (userStatus) {
      setBusyName('User already exists. Please enter a different username');
      setExtraStyle('redBorder')
    }
  }, [userStatus]);

  return (
    <div className='userName'>
      <label className='userNameLabel'>Username
        <input type='text'
               className={classNames('userNameInput', {[`${extraStyle}`]: error})}
               onKeyUp={fieldHandler}
               {...field}
        />
      </label>
      {(error) && <span className='error'>{error}</span>}
    </div>
  )
}
export default UserName;