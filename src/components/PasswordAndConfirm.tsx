import "./input.scss";
import {useEffect, useState} from "react";
import {PASSWORD} from "../constants";
import classNames from "classnames";
import close_eye from "./icons/close_eye.svg";
import open_eye from "./icons/open_eye.svg";
import {useIntl} from "react-intl";

type PasswordProps = {
  minSymbol: number;
  maxSymbol: number;
  text: string;
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  isOpenEye?: boolean;
  error?: string;
  wrongPassword?: boolean;
}

export const PasswordAndConfirm = ({
  field, error, wrongPassword, isOpenEye, text
}: PasswordProps): JSX.Element => {
  const intl = useIntl();
  const [visiblePassword, setVisiblePassword] = useState(false);

  useEffect(() => {
    setVisiblePassword(false);
  }, [isOpenEye]);

  const showPassword = (): void => {
    if (visiblePassword !== false) {
      setVisiblePassword(false);
    } else {
      setVisiblePassword(true);
    }
  };

  return (
    <label className="input-label">
      {text}
      <input
        type={visiblePassword ? "text" : "password"}
        className={classNames("input", {"invalid-input": error || wrongPassword},
          {"success-input": !error && field.value})}
        placeholder={intl.formatMessage({id: "app.passwordAndConfirm.placeholder"},
          {minSymbol: PASSWORD.minLength})}
        {...field}
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