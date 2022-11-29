import "./modal/input.scss";
import classNames from "classnames";
import close_eye from "./icons/close_eye.svg";
import open_eye from "./icons/open_eye.svg";
import {useIntl} from "react-intl";
import {useState} from "react";

type PasswordProps = {
  minSymbol: number;
  maxSymbol: number;
  isConfirm: boolean;
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}

const PasswordAndConfirm = ({
  minSymbol, maxSymbol, isConfirm, field, error
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
    <label className="input-label">{isConfirm ?
      intl.formatMessage({id: "app.passwordAndConfirm.confirmPass"}) :
      intl.formatMessage({id: "app.passwordAndConfirm.pass"})}
      <input
        type={visiblePassword ? "text" : "password"}
        className={classNames("input", {"invalid-input": error},
          {"success-input": !error && field.value})}
        minLength={minSymbol}
        maxLength={maxSymbol}
        {...field}
        required
        placeholder={intl.formatMessage({id: "app.passwordAndConfirm.placeholder"})}
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

export default PasswordAndConfirm;