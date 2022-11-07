import Main from "./content/Main";
import Header from "./header/Header";
import Footer from "./footer/Footer";

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
