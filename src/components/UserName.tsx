import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {getUser} from "../store/loginName/userSlice";

type UserNameProps = {
  field: {
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}
const UserName = ({field, error}: UserNameProps): JSX.Element => {
  const intl = useIntl();
  const [extraStyle, setExtraStyle] = useState("");
  const [busyName, setBusyName] = useState("");
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.user.isLogged);

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(getUser(e.currentTarget.value));
  };

  useEffect(() => {
    if (userStatus) {
      setBusyName("User already exists. Please enter a different username");
      setExtraStyle("redBorder");
    }
  }, [userStatus]);

  return (
      <label className="input-label">
        <FormattedMessage id="app.UserName"/>
        <input
          type="text"
          className={classNames("input", {[`${extraStyle}`]: error})}
          onKeyUp={fieldHandler}
          placeholder={intl.formatMessage({ id: "app.code.invalidationRules" })}
          {...field}
        />
        {(error) && <span className="error-message">{error}</span>}
        {(busyName) && <span className="error-message">{busyName}</span>}
      </label>
  );
};

export default UserName;