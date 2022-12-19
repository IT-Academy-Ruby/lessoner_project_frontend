import "./Header.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {
  Fragment, useEffect, useState
} from "react";
import {Link, useNavigate} from "react-router-dom";
import {showDefaultPage, showStudentPage} from "../../../store/header/headerSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import Avatar from "./Avatar";
import Button from "../../Button";
import Language from "./Language";
import Logo from "../../icons/Logo.svg";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";

type HeaderProps = {
  onLanguageSwitch: (arg: string) => void;
};

const Header = ({onLanguageSwitch}: HeaderProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isRegister = useAppSelector(state => state.value.isDefaultHeader);
  const decodeUserName = useAppSelector(state => state.userDecodedName.session.name);
  const loading = useAppSelector(state => state.login.loading);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    dispatch(nameDecodedUser());
    if (decodeUserName) {
      navigate("");
      dispatch(showStudentPage());
    } else {
      dispatch(showDefaultPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegister, decodeUserName, loading]);

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
          {isRegister ? <Avatar
            onLanguageSwitch={onLanguageSwitch}
            language={language}
            setLanguage={setLanguage}/> :
            <Fragment>
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

export default Header;