import React from "react";
import './Email.scss';
import { EMAIL } from "../constants";

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
      <label className="Email-Label">Email
        <input type="text"
          required
          minLength={EMAIL.minLength}
          maxLength={EMAIL.maxLength}
          className={"Email-Input" + (error ? " invalid-Email-Input" : "")}
          placeholder="username@gmail.com"
          {...field}
        />
        {error && <div><span className='error-Message'>{error}</span></div>}
      </label>
    </div>
  )
};

export default Email;