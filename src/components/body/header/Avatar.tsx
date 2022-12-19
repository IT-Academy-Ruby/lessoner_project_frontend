import "./Header.scss";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {FormattedMessage} from "react-intl";
import Language from "./Language";
import {Link} from "react-router-dom";
import Logout from "../../icons/logOut.svg";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";
import {useState} from "react";


type AvatarProps = {
  onLanguageSwitch: (arg: string) => void;
  setLanguage: (arg: string) => void;
  language: string;
};

const Avatar = ({onLanguageSwitch,language,setLanguage}: AvatarProps) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const nameDecode = useAppSelector(state => state.userDecodedName.session.name);

  const initial = nameDecode.split(" ")
    .map(word => word[0]).slice(0, 2).join("").toLocaleUpperCase();

  const signOut = () => {
    localStorage.setItem("JWT", "");
    dispatch(nameDecodedUser());
    setIsChecked(false);
  };

  return (
    <>
      <label htmlFor="input-avatar" className="avatar">
        <p className="first-letters">{initial}</p>
      </label>
      <input
        type="checkbox"
        className="input-lang"
        id="input-avatar"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked)
        }}
      />
      <ul className="list list-user">
        <li className="user-li">
          <Link to="/user/personalData" className="user-link">
            <FormattedMessage id="app.avatar.personalData"/>
          </Link>
        </li>
        <li className="user-li">
          <Language
            onLanguageSwitch={onLanguageSwitch}
            isRegistered={true}
            language={language}
            setLanguage={setLanguage}/>
        </li>
        <li className="user-li">
          <div className="log-out" onClick={signOut}>
            <FormattedMessage id="app.avatar.logOut"/>
            <img src={Logout} alt="logout"/>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Avatar;