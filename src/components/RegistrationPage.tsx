import "./RegistrationPage.scss";
import Bacground from "./icons/regBackground.svg";
import Close from "./icons/close.svg";
import FirstRegistrationForm from "./FirstRegistrationForm";
import {Link} from "react-router-dom";
import Logo from "./icons/verticalLogo.svg";

export const RegistrationPage = () => {
  return (
    <div className="reg__wrapper">
      <div className="reg__inner">
        <div className="reg__picture">
          <div className="reg__image">
            <img className="reg__svg-bacground" src={Bacground} alt="Background"/>
            <img className="reg__svg-logo" src={Logo} alt="Logo"/>
          </div>
        </div>
        <div className="reg__content">
          <Link to="/" className="reg__btn-close">
            <img className="reg__svg-close" src={Close} alt="Close"/>
          </Link>
          <FirstRegistrationForm/>
        </div>
      </div>
    </div>  
  );
};
