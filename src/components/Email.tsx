import "./input.scss";
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
  isEmail: boolean;
  error?: string;
  textError?: string;
}

export const Email = ({
  field, error, isEmail, textError
}: EmailProps): JSX.Element => {
  return (
    <label className="input-label">
      <FormattedMessage id="app.email.name"/>
      <input
        type="text"
        minLength={EMAIL.minLength}
        maxLength={EMAIL.maxLength}
        className={classNames("input",
          {"invalid-input": error || isEmail},
          {"success-input": !error && field.value},
        )}
        placeholder="username@gmail.com"
        {...field}
      />
      {error && <span className="error-message">{error}</span>}
      {isEmail && !error && <span className="error-message">
        {textError}
      </span>}
    </label>
  );
};