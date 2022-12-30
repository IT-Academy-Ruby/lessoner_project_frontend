import "./Header.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Fragment, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Avatar from "./Avatar";
import Button from "../../Button";
import Language from "./Language";
import Logo from "../../icons/Logo.svg";
import {useAppSelector} from "../../../store/hooks";

type HeaderProps = {
  onLanguageSwitch: (arg: string) => void;
};

const Header = ({onLanguageSwitch}: HeaderProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const isRegistered = useAppSelector(state => state.value.isDefaultHeader);

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
          {isRegistered && <Avatar
            onLanguageSwitch={onLanguageSwitch}
            language={language}
            setLanguage={setLanguage}/>}
          {!isRegistered && <Fragment>
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
