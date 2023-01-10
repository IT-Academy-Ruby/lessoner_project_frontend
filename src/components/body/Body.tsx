import "./Body.scss";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./content/Main";
import {NAVBAR_ADMIN} from "../../constants";
import NavbarStudyStudio from "./navigation/NavbarStudyStudio";
import {nameDecodedUser} from "../../store/header/decodeJwtSlice";
import {resetUserData} from "../../store/loginName/loginSlice";
import {useAppDispatch} from "../../store/hooks";

type BodyProps = {
  onLanguageSwitch: (arg: string) => void;
}

const Body = ({ onLanguageSwitch }: BodyProps) => {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    localStorage.removeItem("JWT");
    dispatch(nameDecodedUser());
    dispatch(resetUserData());
  };

  return (
    <div className="body-page">
      <Header onLanguageSwitch={onLanguageSwitch} onSignOut={handleSignOut} />
      <NavbarStudyStudio menuType={NAVBAR_ADMIN} onSignOut={handleSignOut} />
      <Main />
      <Footer />
    </div>
  );
};

export default Body;
