import "./Email.scss";
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
    <div className="email-wrapper">
      <label className="meail-label">
        <FormattedMessage id="app.email.name"/>
        <input
          type="text"
          minLength={EMAIL.minLength}
          maxLength={EMAIL.maxLength}
          className={classNames("email-input", {" invalid-email-input": error})}
          placeholder="username@gmail.com"
          {...field}
        />
        {error && <span className="error-message">{error}</span>}
      </label>
    </div>
  );
};

export default Email;