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
    <div className="Email-Wrapper">
      <label className="Email-Label">
        <FormattedMessage id="app.email.name" />
        <input type="text"
          minLength={EMAIL.minLength}
          maxLength={EMAIL.maxLength}
          className={"Email-Input" + (error ? " invalid-Email-Input" : "")}
          placeholder="username@gmail.com"
          {...field}
          required
        />
        {error && <span className='error-Message'>{error}</span>}
      </label>
    </div>
  );
};

export default Email;