import { FormattedMessage } from "react-intl";
import {useAppSelector} from "../../../../store/hooks";

const Lessoner = () => {
  const decodedUserName = useAppSelector(state => state.userDecodedName.session.name);
  return <div>
    <h1>{decodedUserName}</h1>
    <FormattedMessage id="app.lessoner" />
  </div>;
};

export default Lessoner;
