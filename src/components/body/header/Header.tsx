import "./header.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Fragment, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import Avatar from "./Avatar";
import Button from "../../Button";
import Logo from "../../icons/Logo.svg";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";
import {showStudentPage} from "../../../store/header/headerSlice";

const Header = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isRegistered = useAppSelector(state => state.value.isDefaultHeader);
  const decodeUserName = useAppSelector(state => state.userDecodedName.session.name);
  const loading = useAppSelector(state => state.login.loading);

  useEffect(() => {
    dispatch(nameDecodedUser());
    if (decodeUserName) {
      navigate("");
      dispatch(showStudentPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistered, decodeUserName, loading]);

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
          {isRegistered ? <Avatar/> : <Fragment>
            <div className="language"></div>
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
