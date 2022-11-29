import "./Pages.scss";
import Close from "./icons/close.svg";
import CodePage from "../pages/CodePage";
import ConfirmReg from "../pages/ConfirmReg";
import { FC } from "react";
import FirstRegistrationForm from "../pages/FirstRegistrationForm";
import {Link} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Logo1440 from "./icons/logo1440.svg";
import PhoneNumberPage from "../pages/PhoneNumberPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SetNewPasswordPage from "../pages/SetNewPasswordPage";
import YourselfPage from "../pages/YourselfPage";
import { useIntl } from "react-intl";

interface PagesProps {
  pageType: string;
}

export const Pages: FC<PagesProps> = ({pageType}) => {
  const intl = useIntl();
const page =()=>{
  switch(pageType){
    case "Login":
     return <LoginPage/>
    case "Code":
      return <CodePage/>
    case "ResetPage":
      return <ResetPasswordPage/>
    case "SetNewPassword":
      return <SetNewPasswordPage/>
    case "PhoneNumberPage":
      return <PhoneNumberPage/>
    case "FirstRegistrationForm":
      return <FirstRegistrationForm/>
    case "YourselfPage":
      return <YourselfPage/>
    case "ConfirmReg":
      return <ConfirmReg/>
  }
}

  return (
    <div className="reg__wrapper">
      <div className="reg__inner">
        <Link to="/" className="close"></Link>
        <div className="reg__picture">
          <img src={Logo1440} className="reg__logo" alt="Logo"/>
        </div>
        <div className="reg__content">
        {page()}
        </div>
      </div>
    </div>  
  );
};