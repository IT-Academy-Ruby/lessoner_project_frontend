import "./Body.scss";
import {
  useContext, useEffect, useState
} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./content/Main";
import Menu from "./menu/Menu";
import NavbarStudyStudio from "./navigation/NavbarStudyStudio";
import { RootState } from "../../store/index";
import {buildMainSidebarConfig} from "./navigation/mainSidebarHelper";
import {connect} from "react-redux";
import jwt_decode from "jwt-decode";
import {resetDecodeUser} from "../../store/header/decodeJwtSlice";
import {resetUserData} from "../../store/loginName/loginSlice";
import { snowContext } from "../../App";
import {useAppDispatch} from "../../store/hooks";
import useDarkMode from "use-dark-mode";

type BodyProps = {
  onLanguageSwitch: (arg: string) => void;
  user: {
    id: number;
    name: string;
  };
}

const Body = (props: BodyProps) => {
  const location = useLocation();
  const {onLanguageSwitch, user} = props;
  const darkMode = useDarkMode(false);
  const snow = useContext(snowContext);
  const [isDark, setIsDark] = useState(darkMode.value);
  const [isAuthorized, setIsAthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    if (sessionStorage.getItem("JWT")){
      sessionStorage.removeItem("JWT");
    } else {
      localStorage.removeItem("JWT");
    }
    dispatch(resetUserData());
    dispatch(resetDecodeUser());
    setIsAthorized(false);
    navigate("/");
  };

  useEffect(() => {
    setIsAthorized(!!user?.id);

    const jwt = sessionStorage.getItem("JWT") ||  localStorage.getItem("JWT");

    if (jwt) {
      const jwtDecoded = jwt_decode(jwt) as {admin: boolean};
      setIsAdmin(jwtDecoded?.admin);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    darkMode.toggle();
  };

  const sidebarStatus = {
    authorized: isAuthorized,
    admin: isAdmin,
    lightTheme: !isDark,
    snowing: !!snow?.snow,
  };

  const callbacks = {
    snowToggle: () => snow?.setSnow(!snow.snow),
    handleSignOut,
    toggleTheme: toggleTheme,
  };
  const mainSidebarConfig = buildMainSidebarConfig(sidebarStatus, callbacks, location.pathname);

  return (
    <div className="body-page">
      <Menu setIsMenuActive={setIsMenuActive}
        isMenuActive={isMenuActive}
      />
      <Header
        onLanguageSwitch={onLanguageSwitch}
        onSignOut={handleSignOut}
      />
      <NavbarStudyStudio config={mainSidebarConfig} isMenuActive={isMenuActive}/>
      <Main />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {user: state?.login?.user};
};

export default connect(mapStateToProps)(Body);
