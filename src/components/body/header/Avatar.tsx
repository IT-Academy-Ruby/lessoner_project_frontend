import "./Header.scss";
import {FormattedMessage} from "react-intl";
import Language from "./Language";
import {Link} from "react-router-dom";
import Logout from "../../icons/logOut.svg";
import {useAppSelector} from "../../../store/hooks";
import {useState} from "react";

type AvatarProps = {
  onLanguageSwitch: (arg: string) => void;
  setLanguage: (arg: string) => void;
  language: string;
  onSignOut: VoidFunction;
};

const Avatar = ({
  onLanguageSwitch, language, setLanguage, onSignOut
}: AvatarProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const nameDecode = useAppSelector(state => state.userDecodedName.session.name);
  const userAvatar = useAppSelector(state => state.dataUser.user.avatar_url);

  const initialName = nameDecode.split(" ")
    .map(word => word[0]).slice(0, 2).join("").toLocaleUpperCase();

  const signOut = () => {
    onSignOut();
    setIsChecked(false);
  };

  return (
    <>
      <label htmlFor="input-avatar" className="avatar">
        {!userAvatar && <p className="first-letters">{initialName}</p>}
        {userAvatar && <img src={userAvatar} alt="avatar" className="user-avatar" />}
      </label>
      <input
        type="checkbox"
        className="input-lang"
        id="input-avatar"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <ul className="list list-user">
        <li className="user-li">
          <Link to="/user/userPage" className="user-link" onClick={()=>setIsChecked(false)}>
            <FormattedMessage id="app.avatar.personalData" />
          </Link>
        </li>
        <li className="user-li">
          <Language
            onLanguageSwitch={onLanguageSwitch}
            isRegistered={true}
            language={language}
            setLanguage={setLanguage}
          />
        </li>
        <li className="user-li" onClick={signOut}>
          <div className="log-out">
            <FormattedMessage id="app.avatar.logOut" />
            <img src={Logout} alt="logout" />
          </div>
        </li>
      </ul>
    </>
  );
};

export default Avatar;