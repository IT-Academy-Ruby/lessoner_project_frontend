import "./lessoner.scss";
import { FormattedMessage } from "react-intl";
import { Hero } from "../../../hero/hero";
import {useAppSelector} from "../../../../store/hooks";


const Lessoner = () => {
  const decodedUserName = useAppSelector(state => state.userDecodedName.session.name);
  
  return (
    <div className="lessoner__wrapper">
      <Hero />
      <h1>{decodedUserName}</h1>
      <FormattedMessage id="app.lessoner" />
    </div>
  );
};

export default Lessoner;
