import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./content/Main";
import Navigation from "./navigation/NavbarStudyStudio";

type BodyProps = {
  onLanguageSwitch: (arg: string) => void
}

const Body = ({onLanguageSwitch}: BodyProps) => {
  return (
    <div className="body-page">
      <Header onLanguageSwitch={onLanguageSwitch}/>
      <Navigation menuType={"study"}/>
      <Main/>
      <Footer/>
    </div>
  );
};
export default Body;
