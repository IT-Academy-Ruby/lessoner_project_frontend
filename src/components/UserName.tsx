import "./userName.scss";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {getUser} from "../store/loginName/userSlice";

type UserNameProps = {
  minSymbol: number;
  maxSymbol: number;
}
const UserName = ({minSymbol, maxSymbol}: UserNameProps): JSX.Element => {
  // eslint-disable-next-line no-useless-escape
  const userNameRegex = new RegExp("^[A-Z\d]" +
    "{" + minSymbol + "," + maxSymbol + "}$", "i");
  const [extraStyle, setExtraStyle] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.user.isLogged);

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    dispatch(getUser(value));

    if (!userNameRegex.test(value)) {
      setError("Invalid username entered");
      setExtraStyle("errorInput");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (userStatus) {
      setError("User already exists. Please enter a different username");
      setExtraStyle("redBorder");
    }
  }, [userStatus]);

  return (
    <div className="userName">
      <label className="userNameLabel">Username</label>
      <input
        type="text"
        required
        className={classNames("userNameInput", {[`${extraStyle}`]: (error)})}
        onChange={fieldHandler}/>
      {(error) && <span className="error">{error}</span>}
    </div>
  );
};

export default UserName;