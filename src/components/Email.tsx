import React from "react";
import './Email.scss';
import {EMAIL} from "../constants";

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
      <label className="email-label">Email
        <input type="text"
               required
               minLength={EMAIL.minLength}
               maxLength={EMAIL.maxLength}
               className={"email-input" + (error ? " invalid-email-input" : "")}
               placeholder="username@gmail.com"
               {...field}
        />
        {error && <div><span className='error-message'>{error}</span></div>}
      </label>
    </div>
  )
};

export default Email;