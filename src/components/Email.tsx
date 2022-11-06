import React from "react";
import './Email.scss';
import {EMAIL} from "../constants";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useState, useEffect} from "react";
import {changeEvent} from "../store/loginName/loginSlice";

type EmailProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string,
  };
  error?: string;
}

const Email = ({field, error}: EmailProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const loginEvent = useAppSelector(state => state.login.event);
  const JWT = useAppSelector(state => state.login.login);
  const lookButton = useAppSelector(state => state.login.lookButton);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if ((!JWT && loginEvent) && (field.value.length > 0)) {
      setIsUser(true);
      dispatch(changeEvent());
    } else {
      setIsUser(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JWT, dispatch, field.value, lookButton]);

  return (
    <div className="email-wrapper">
      <label className="email-label">Email
        <input type="text"
               minLength={EMAIL.minLength}
               maxLength={EMAIL.maxLength}
               className={"email-input" + (error ? " invalid-email-input" : "")}
               placeholder="username@gmail.com"
               {...field}
               required
        />
        {error && <span className='error-message'>{error}</span>}
        {isUser && <span className='error-message'>you entered invalid</span>}
      </label>
    </div>
  )
};

export default Email;