import "./Email.scss";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {EMAIL} from "../constants";
import {changeEvent} from "../store/loginName/loginSlice";
import classNames from "classnames";

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
  const loading = useAppSelector(state => state.login.loading);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (!JWT && loginEvent && field.value.length) {
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
        <input
          type="text"
          minLength={EMAIL.minLength}
          maxLength={EMAIL.maxLength}
          className={classNames("email-input", {" invalid-email-input": error})}
          placeholder="username@gmail.com"
          {...field}
        />
        {error && <span className="error-message">{error}</span>}
        {!loading && isUser && <span className="error-message">
          Incorrect Email address or password
        </span>}
      </label>
    </div>
  );
};

export default Email;