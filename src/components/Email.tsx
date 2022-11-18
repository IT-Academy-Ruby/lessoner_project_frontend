import "./Email.scss";
import { EMAIL } from "../constants";
import { FormattedMessage } from "react-intl";
import React from "react";

type EmailProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}

const Email = ({ field, error }: EmailProps): JSX.Element => {
  return (
    <div className="email-wrapper">
      <label className="email-label">
        <FormattedMessage id="app.email.name" />
        <input type="text"
          minLength={EMAIL.minLength}
          maxLength={EMAIL.maxLength}
          className={"email-input" + (error ? " invalid-email-input" : "")}
          placeholder="username@gmail.com"
          {...field}
          required
        />
        {error && <span className='error-message'>{error}</span>}
      </label>
    </div>
  );
};

export default Email;