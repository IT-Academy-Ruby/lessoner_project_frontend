import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./content/Main";
import Navigation from "./navigation/NavbarStudyStudio";

type BodyProps = {
  onLanguageSwitch: (arg: string) => void;
  languageCode:string;
}

const Body = ({onLanguageSwitch,languageCode}: BodyProps) => {
  return (
    <div className="body-page">
      <Header/>
      <Navigation menuType={"study"}/>
      <Main languageCode={languageCode}/>
      <Footer onLanguageSwitch={onLanguageSwitch}/>
    </div>
  );
};
export default Body;
