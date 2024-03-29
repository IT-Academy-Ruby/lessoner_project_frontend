import "./input.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {USERNAME} from "../constants";
import classNames from "classnames";
import {getUser} from "../store/loginName/loginSlice";
import {useAppDispatch} from "../store/hooks";

type UserNameProps = {
  field: {
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
  nameRef?:()=>void;
}

export const UserName = ({
  field, error, nameRef
}: UserNameProps): JSX.Element => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(getUser(e.currentTarget.value));
  };

  return (
    <label className="input-label">
      <FormattedMessage id="app.UserName"/>
      <input
        type="text"
        className={classNames("input",
          {"invalid-input": error},
          {"success-input": !error && field.value}
        )}
        onKeyUp={fieldHandler}
        ref={nameRef}
        placeholder={intl.formatMessage(
          { id: "app.UserName.placeholder" },
          {minSymbol: USERNAME.minLength, maxSymbol: USERNAME.maxLength})}
        {...field}
      />
      {(error) && <span className="error-message">{error}</span>}
    </label>
  );
};