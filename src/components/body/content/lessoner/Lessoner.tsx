import "./lessoner.scss";
import { FormattedMessage } from "react-intl";
import { Hero } from "../../../hero/hero";

const Lessoner = () => {
  
  return (
    <div className="lessoner__wrapper">
      <Hero />
      <FormattedMessage id="app.lessoner" />
    </div>
  );
};

export default Lessoner;
