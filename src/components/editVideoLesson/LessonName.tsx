import "./LessonName.scss";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import classNames from "classnames";

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
  const dispatch = useAppDispatch();

  const fieldHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("Ok")
  };

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
    </div>
  );
};

export default UserName;