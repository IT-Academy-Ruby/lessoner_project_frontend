import "./userName.scss";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {getUser} from "../store/loginName/userSlice";

type UserNameProps = {
  minSymbol: number;
  maxSymbol: number;
  labelName: string;
  field?: {
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}
const UserName = ({
  minSymbol, maxSymbol, field, error, labelName
}: UserNameProps): JSX.Element => {
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
      setExtraStyle("red__border");
    }
  }, [userStatus]);

  return (
    <div className="username__wrapper">
      <label className="username__label">{labelName}
        <input
          type="text"
          className={classNames("username__input", {[`${extraStyle}`]: error})}
          onKeyUp={fieldHandler}
          placeholder={`${minSymbol} to ${maxSymbol} characters`}
          {...field}
        />
      </label>
      {(error) && <span className="error">{error}</span>}
      {(busyName) && <span className="error">{busyName}</span>}
    </div>
  );
};

export default UserName;