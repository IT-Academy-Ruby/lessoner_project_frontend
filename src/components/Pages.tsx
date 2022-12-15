import "./pages.scss";
import {useAppSelector} from "../store/hooks";
import CodePage from "../pages/CodePage";
import ConfirmReg from "../pages/ConfirmReg";
import {FC} from "react";
import FirstRegistrationForm from "../pages/FirstRegistrationForm";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import LoginPage from "../pages/LoginPage";
import Logo1440 from "./icons/logo1440.svg";
import PhoneNumberPage from "../pages/PhoneNumberPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SetNewPasswordPage from "../pages/SetNewPasswordPage";
import YourselfPage from "../pages/YourselfPage";
import {useState} from "react";

interface PagesProps {
  pageType: string;
  registration?: boolean;
}

const Pages: FC<PagesProps> = ({pageType, registration}) => {
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const page = () => {
    switch (pageType) {
      case "Login":
        return <LoginPage/>;
      case "Code":
        return <CodePage registration={registration}/>;
      case "ResetPage":
        return <ResetPasswordPage/>;
      case "SetNewPassword":
        return <SetNewPasswordPage/>;
      case "PhoneNumberPage":
        return <PhoneNumberPage registration={registration}/>;
      case "FirstRegistrationForm":
        return <FirstRegistrationForm
          // userPassword={userPassword}
          setUserPassword={setUserPassword}
          // userEmail={userEmail}
          setUserEmail={setUserEmail}
        />;
      case "YourselfPage":
        return <YourselfPage
          registration={registration}
          userPassword={userPassword}
          userEmail={userEmail}
        />;
      case "ConfirmReg":
        return <ConfirmReg
          registration={registration}
        />;
    }
  };
  const loading = useAppSelector(state => state.login.loading);

  return (
    <div className="reg__wrapper">
      <div className="reg__inner">
        <Link to="/" className="close__wrapper">
          <span className="close"></span>
        </Link>
        <div className="reg__picture">
          <img src={Logo1440} className="reg__logo" alt="Logo"/>
        </div>
        <div className="reg__content">
          {loading && <Loader/>}
          {page()}
        </div>
      </div>
    </div>
  );
};
export default Pages;