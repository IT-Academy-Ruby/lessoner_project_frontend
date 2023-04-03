import "./input.module.scss";
import {PASSWORD} from "../constants";
import classNames from "classnames";
import close_eye from "./icons/close_eye.svg";
import open_eye from "./icons/open_eye.svg";
import {useIntl} from "react-intl";
import {useState} from "react";

type PasswordProps = {
  minSymbol: number;
  maxSymbol: number;
  isConfirm: boolean | string;
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
  wrongPassword?:boolean;
}

export const PasswordAndConfirm = ({
  isConfirm, field, error, wrongPassword
}: PasswordProps): JSX.Element => {
  const intl = useIntl();
  const [visiblePassword, setVisiblePassword] = useState(false);

  const showPassword = (): void => {
    if (visiblePassword !== false) {
      setVisiblePassword(false);
    } else {
      setVisiblePassword(true);
    }
  };

  return (
    <label className="input-label">
      {isConfirm === true && intl.formatMessage({id: "app.passwordAndConfirm.pass"})}
      {isConfirm === false && intl.formatMessage({id: "app.passwordAndConfirm.confirmPass"})}
      {isConfirm === "currentPassword" && intl.formatMessage(
        {id: "app.userPage.form.currentPassword"})}
      <input
        type={visiblePassword ? "text" : "password"}
        className={classNames("input", {"invalid-input": error || wrongPassword},
          {"success-input": !error && field.value})}
        {...field}
        placeholder={intl.formatMessage({id: "app.passwordAndConfirm.placeholder"},
          {minSymbol: PASSWORD.minLength})}
      />
      <img
        className="image-input"
        alt="eye"
        src={visiblePassword ? open_eye : close_eye}
        onClick={showPassword}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};