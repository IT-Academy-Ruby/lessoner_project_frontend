import "./pages.scss";
import {closePopup} from "../store/loginName/loginSlice";
import CodePage from "../pages/CodePage";
import ConfirmReg from "../pages/ConfirmReg";
import {useAppDispatch} from "../store/hooks";
import {FC} from "react";
import FirstRegistrationForm from "../pages/FirstRegistrationForm";
import {Link} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Logo1440 from "./icons/logo1440.svg";
import PhoneNumberPage from "../pages/PhoneNumberPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SetNewPasswordPage from "../pages/SetNewPasswordPage";
import YourselfPage from "../pages/YourselfPage";

interface PagesProps {
  pageType: string;
  registration?: boolean;
}

const Pages: FC<PagesProps> = ({pageType, registration}) => {
  const dispatch = useAppDispatch();
  const page = () => {
    switch (pageType) {
      case "Login":
        return <LoginPage/>;
      case "Code":
        return <CodePage/>;
      case "ResetPage":
        return <ResetPasswordPage/>;
      case "SetNewPassword":
        return <SetNewPasswordPage/>;
      case "PhoneNumberPage":
        return <PhoneNumberPage registration={registration}/>;
      case "FirstRegistrationForm":
        return <FirstRegistrationForm/>;
      case "YourselfPage":
        return <YourselfPage/>;
      case "ConfirmReg":
        return <ConfirmReg/>;
    }
  };
  const closePage = () => {
    dispatch(closePopup);
  }

  return (
    <div className="reg__wrapper">
      <div className="reg__inner">
        <Link to="/" className="close__wrapper" onClick={closePage}>
          <span className="close"></span>
        </Link>
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
export default Pages;