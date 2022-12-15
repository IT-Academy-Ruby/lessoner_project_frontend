import "./input.scss";
import React, {useEffect, useState} from "react";
import {changeEvent, getEmail} from "../store/loginName/loginSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {EMAIL} from "../constants";
import {FormattedMessage} from "react-intl";
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

const Email = ({
  field, error
}: EmailProps): JSX.Element => {
  const dispatch = useAppDispatch();
  // const loginEvent = useAppSelector(state => state.login.event);
  // const JWT = useAppSelector(state => state.login.login);
  // const lookButton = useAppSelector(state => state.login.lookButton);
  // const loading = useAppSelector(state => state.login.loading);
  // const [isUser, setIsUser] = useState(false);
  // const [isNotFoundEmail, setIsNotFoundEmail] = useState(true);

  useEffect(() => {
    if(field.value.length > 0){
      dispatch(getEmail(field.value));
    }
  }, [dispatch,error,field.value]);


  // useEffect(() => {
  //   if (!JWT && loginEvent && field.value.length) {
  //     setIsUser(true);
  //     dispatch(changeEvent());
  //   } else {
  //     setIsUser(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JWT, dispatch, field.value, lookButton]);

  return (
    <label className="input-label">
      <FormattedMessage id="app.email.name"/>
      <input
        type="text"
        minLength={EMAIL.minLength}
        maxLength={EMAIL.maxLength}
        className={classNames("input",
          {"invalid-input": error},
          {"success-input": !error && field.value},
        )}
        placeholder="username@gmail.com"
        // onKeyUp={() => {
        //   setIsNotFoundEmail(false);
        // }}
        {...field}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default Email;