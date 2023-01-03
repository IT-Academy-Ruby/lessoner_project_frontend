import "./Body.scss";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./content/Main";
import {NAVBAR_ADMIN} from "../../constants";
import NavbarStudyStudio from "./navigation/NavbarStudyStudio";

type BodyProps = {
  onLanguageSwitch: (arg: string) => void;
}

const Body = ({onLanguageSwitch}: BodyProps) => {
  return (
    <div className="body-page">
      <Header onLanguageSwitch={onLanguageSwitch}/>
      <NavbarStudyStudio menuType={NAVBAR_ADMIN}/>
      <Main/>
      <Footer/>
    </div>
  );
};
export default Body;
