import "./Header.scss";
import {Link, useNavigate} from "react-router-dom";
import {showDefaultPage,showStudentPage} from "../../../store/header/headerSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import Avatar from "./Avatar";
import Bell from "../../icons/Bell.svg";
import Button from "../../Button";
import Logo from "../../icons/Logo.svg";
import Magnifier from "../../icons/blackMagnifier.svg";
import {nameDecodeUser} from "../../../store/header/decodeJwtSlice";
import {useEffect} from "react";




const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDefaultPage = useAppSelector(state => state.value.isDefaultHeader);
  const page = useAppSelector(state => state.value.page);
  const decodeUserName = useAppSelector(state => state.userDecodeName.name);
  const userButtonText = page === "sectionPage" ? "My studio" : "Go study";
  const loading = useAppSelector(state => state.login.loading);

  useEffect(() => {
    dispatch(nameDecodeUser());
    if (decodeUserName) {
      navigate("");
      dispatch(showStudentPage());
    } else {
      navigate("");
      dispatch(showDefaultPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefaultPage, decodeUserName, loading]);

  return (
    <div className="side-bar">
      <label className="menu">
        <input type="checkbox" className="burg-btn"/>
        <span className="menu-burg"></span>
      </label>
      <div className="header">
        <Link to="/n" className="logo-name">
          <img className="logo" src={Logo} alt="Logo"/>
          <h4 className="title-header">The lessoner</h4>
          {(page === "myPage" && isDefaultPage)
            && <Link to={"/myStudio"} className="my-studio">My studio</Link>}
        </Link>
        <div className="search-button">
          <Link to="/search" className="magnifier">
            <img src={Magnifier} alt="search"/>
          </Link>
          <input className="search" type="text" placeholder="Search"/>
          {isDefaultPage ?
            <div className="user-item">
              {page &&
                <Link to='/' className="section-button">
                  <Button buttonType="button" buttonText={userButtonText} className="user-button"/>
                </Link>}
              <img src={Bell} alt="Bell" className="bell"/>
              <Avatar/>
            </div>
            :
            <Link to="/users/sign_in" className="login-link">
              <Button buttonType="button" buttonText="Log in" className="button-login"/>
            </Link>}
        </div>
      </div>
    </div>
  );
};
export default Header;


