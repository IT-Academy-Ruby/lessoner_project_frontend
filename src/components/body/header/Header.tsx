import "./Header.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Fragment, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import Avatar from "./Avatar";
import Bell from "../../icons/Bell.svg";
import Button from "../../Button";
import Logo from "../../icons/Logo.svg";
import Magnifier from "../../icons/blackMagnifier.svg";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";
import {showStudentPage} from "../../../store/header/headerSlice";


const Header = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isRegister = useAppSelector(state => state.value.isDefaultHeader);
  const page = useAppSelector(state => state.value.page);
  const decodeUserName = useAppSelector(state => state.userDecodedName.session.name);
  const loading = useAppSelector(state => state.login.loading);

  useEffect(() => {
    dispatch(nameDecodedUser());
    if (decodeUserName) {
      navigate("");
      dispatch(showStudentPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegister, decodeUserName, loading]);

  const userButtonText = page === "sectionPage" ? intl.formatMessage({id: "app.header.myStudio"})
    : intl.formatMessage({id: "app.header.goStudy"});

  return (
    <div className="side-bar">
      <div className="menu"></div>
      <div className="header">
        <Link to="/" className="logo-name">
          <img className="logo" src={Logo} alt="Logo"/>
          <h4 className="title-header">
            <FormattedMessage id="app.name"/>
          </h4>
        </Link>
        <div className="header-buttons">
          {isRegister ? <Avatar/> : <Fragment>
            <div className="language"></div>
            {/*<Link to="/users/sign_in" className="login-link">*/}
              <Button
                buttonType="button"
                buttonText={intl.formatMessage({id: "app.header.login"})}
                className="button-login"
                onClick={()=>navigate("/user/sign_in")}
              />
            {/*</Link>*/}
            {/*<Link to="/users/sign_in" className="login-link">*/}
              <Button
                buttonType="button"
                buttonText={intl.formatMessage({id: "app.registration"})}
                className="button-register"
                onClick={()=>navigate("/user/sign_up")}
              />
            {/*</Link>*/}
          </Fragment>}
        </div>
      </div>
    </div>
  );
};

export default Header;
