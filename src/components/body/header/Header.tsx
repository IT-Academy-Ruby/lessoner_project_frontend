import "./Header.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import Avatar from "./Avatar";
import Bell from "../../icons/Bell.svg";
import Button from "../../Button";
import { DarkLogoHeaderSvg } from "../../svg/DarkLogoHeaderSvg";
import { LightLogoHeaderSvg } from "../../svg/LightLogoHeaderSvg";
import Magnifier from "../../icons/blackMagnifier.svg";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";
import {showStudentPage} from "../../../store/header/headerSlice";
import {useEffect} from "react";
import { useTheme } from "../../../utils/useTheme";

const Header = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDefaultPage = useAppSelector(state => state.value.isDefaultHeader);
  const page = useAppSelector(state => state.value.page);
  const decodeUserName = useAppSelector(state => state.userDecodedName.session.name);
  const loading = useAppSelector(state => state.login.loading);
  const theme = useTheme();
  
  useEffect(() => {
    dispatch(nameDecodedUser());
    if (decodeUserName) {
      navigate("");
      dispatch(showStudentPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefaultPage, decodeUserName, loading]);

  const userButtonText = page === "sectionPage" ? intl.formatMessage({id: "app.header.myStudio"})
    : intl.formatMessage({id: "app.header.goStudy"});

  return (
    <div className="side-bar">
      <label className="menu">
        <input type="checkbox" className="burg-btn"/>
        <span className="menu-burg"></span>
      </label>
      <div className="header">
        <Link to="/n" className="logo-name">
          {theme === "Dark-mode" ? <DarkLogoHeaderSvg /> : <LightLogoHeaderSvg />}       
          {(page === "myPage" && isDefaultPage) && <Link to={"/myStudio"} className="my-studio">
            <FormattedMessage id="app.studio"/>
          </Link>}
        </Link>
        <div className="search-button">
          <Link to="/search" className="magnifier">
            <img src={Magnifier} alt="search"/>
          </Link>
          <input
            className="search" type="text"
            placeholder={intl.formatMessage({id: "app.header.placeholder"})}
          />
          {isDefaultPage ?
            <div className="user-item">
              {page &&
                <Link to="/" className="section-button">
                  <Button
                    buttonType="button"
                    buttonText={userButtonText}
                    className="user-button"
                  />
                </Link>}
              <img src={Bell} alt="Bell" className="bell"/>
              <Avatar/>
            </div>
            :
            <Link to="/users/sign_in" className="login-link">
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
