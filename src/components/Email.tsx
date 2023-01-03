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
  error?: string;
  isEmail: string | boolean;
  textError?: string;
}


const Email = ({
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
          {"invalid-input": error},
          {"success-input": !error && field.value},
        )}
        placeholder="username@gmail.com"
        {...field}
      />
      {error && <span className="error-message">{error}</span>}
      {isEmail === false && !error && <span className="error-message">
        {textError}
      </span>}
    </label>
  );
};

export default Email;