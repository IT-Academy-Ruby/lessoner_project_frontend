import "./index.scss";
import { FormattedMessage } from "react-intl";
import VideoRating from "../../../VideoRating";
import {useAppSelector} from "../../../../store/hooks";

const Lessoner = () => {
  const decodedUserName = useAppSelector(state => state.userDecodedName.session.name);
  return <div className="lessoner__wrapper">
    <h1>{decodedUserName}</h1>
    <FormattedMessage id="app.lessoner" />
    <VideoRating />
  </div>;
};

export default Lessoner;
