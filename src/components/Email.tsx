import "./modal/input.scss";
import {EMAIL} from "../constants";
import {FormattedMessage} from "react-intl";
import React from "react";
import classNames from "classnames";

type EmailProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}

const Email = ({field, error}: EmailProps): JSX.Element => {
  return (
    <label className="input-label">
      <FormattedMessage id="app.email.name"/>
      <input type="text"
             minLength={EMAIL.minLength}
             maxLength={EMAIL.maxLength}
             className={classNames("input", {"invalid-input": error},
               {"success-input": !error && field.value})}
             placeholder="username@gmail.com"
             {...field}
             required
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default Email;