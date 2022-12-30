import "./input.scss";
import React, {useEffect} from "react";
import {EMAIL} from "../constants";
import {FormattedMessage} from "react-intl";
import classNames from "classnames";
import {getEmail} from "../store/loginName/loginSlice";
import {useAppDispatch} from "../store/hooks";

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
  useEffect(() => {
    if(field.value.length > 0){
      dispatch(getEmail(field.value));
    }
  }, [dispatch,error,field.value]);

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
        {...field}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default Email;