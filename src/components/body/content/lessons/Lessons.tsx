import { FormattedMessage } from "react-intl";
import { VideoPlayer } from "../videoplayer/Videoplayer";

const Lessons = () => {
  return (
    <div className="lessons">
      <FormattedMessage id="app.lessons" />
      <div className="wrapper">
        <VideoPlayer />
      </div>
    </div>);
};

export default Lessons;
