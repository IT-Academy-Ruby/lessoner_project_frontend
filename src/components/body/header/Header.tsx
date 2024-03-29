import "./header.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {
  Fragment, useEffect, useState
} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Avatar} from "./Avatar";
import {Button} from "../../Button";
import {Language} from "./Language";
import Logo from "../../icons/Logo.svg";
import {getUserData} from "../../../store/loginName/loginSlice";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";

type HeaderProps = {
  onLanguageSwitch: (arg: string) => void;
  onSignOut: VoidFunction;
};

export const Header = ({onLanguageSwitch, onSignOut}: HeaderProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.login.user.name);
  const decodeUserData = useAppSelector(state => state.userDecodedName.session);
  const tokenStorage = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");

  useEffect(() => {
    if(tokenStorage){
      dispatch(nameDecodedUser());
    }
  }, [dispatch, tokenStorage]);

  useEffect(() => {
    if (decodeUserData.name && !user) {
      dispatch(getUserData(decodeUserData.name));
    }
  }, [dispatch, user, decodeUserData]);

  return (
    <div className="side-bar">
      <div className="header">
        <Link to="/" className="logo-name">
          <img className="logo" src={Logo} alt="Logo"/>
          <h4 className="title-header">
            <FormattedMessage id="app.name"/>
          </h4>
        </Link>
        <div className="header-buttons">
          {decodeUserData.name && <Avatar
            onLanguageSwitch={onLanguageSwitch}
            onSignOut={onSignOut}
            language={language}
            setLanguage={setLanguage}/>}
          {!decodeUserData.name && <Fragment>
            <Language
              onLanguageSwitch={onLanguageSwitch}
              isRegistered={false}
              language={language}
              setLanguage={setLanguage}
            />
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({id: "app.header.login"})}
              className="button-login"
              onClick={() => navigate("/user/sign_in")}
            />
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({id: "app.registration"})}
              className="button-register"
              onClick={() => navigate("/user/sign_up")}
            />
          </Fragment>}
        </div>
      </div>
    </div>
  );
};