import "./Header.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import Avatar from "./Avatar";
import Bell from "../../icons/Bell.svg";
import Button from "../../Button";
import Logo from "../../icons/Logo.svg";
import Magnifier from "../../icons/blackMagnifier.svg";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";
import {showStudentPage} from "../../../store/header/headerSlice";
import {useEffect} from "react";


const Header = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDefaultPage = useAppSelector(state => state.value.isDefaultHeader);
  const page = useAppSelector(state => state.value.page);
  const decodeUserName = useAppSelector(state => state.userDecodedName.session.name);
  const loading = useAppSelector(state => state.login.loading);

  useEffect(() => {
    dispatch(nameDecodedUser());
    if (decodeUserName) {
      dispatch(showStudentPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, decodeUserName, loading]);

  return (
    <div className="side-bar">
      <div className="header">
        <Link to="/" className="logo-name">
          <img className="logo" src={Logo} alt="Logo"/>
          <h4 className="title-header">
            <FormattedMessage id="app.name"/>
          </h4>
        </Link>
        <div className="search-button">
          <Link to="/search" className="magnifier">
            <img src={Magnifier} alt="search"/>
          </Link>
          <input
            className="search" type="text"
            placeholder={intl.formatMessage({id: "app.header.placeholder"})}
          />
          {isDefaultPage && <Avatar/>}
          {!isDefaultPage &&
            <Link to="/login" className="login-link">
              <Button
                buttonType="button"
                buttonText={intl.formatMessage({id: "app.header.login"})}
                className="button-login"
              />
            </Link>}
        </div>
      </div>
    </div>
  );
};

export default Header;
