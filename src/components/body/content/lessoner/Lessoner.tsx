import { FormattedMessage } from "react-intl";
import {useAppSelector} from "../../../../store/hooks";

const Lessoner = () => {
  const decodeUserName = useAppSelector(state => state.userDecodeName.name);
  return <div>
    <h1>{decodeUserName}</h1>
    <FormattedMessage id="app.lessoner" />
  </div>;
};

export default Lessoner;
