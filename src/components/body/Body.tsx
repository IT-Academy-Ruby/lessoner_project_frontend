import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./content/Main";

type BodyProps = {
  onLanguageSwitch: (arg: string) => void
}

const Body = ({onLanguageSwitch}: BodyProps) => {
  return (
    <>
      <Header />
      <Main />
      <Footer onLanguageSwitch={onLanguageSwitch} />
    </>
  );
};
export default Body;
