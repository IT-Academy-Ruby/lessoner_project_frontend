import "./VideoViewPage.scss";
import { VideoPlayer } from "../../src/components/body/content/videoplayer/Videoplayer";
import { VideoSideBar } from "../../src/components/body/content/VideoSideBar/VideoSideBar";
import { useParams } from "react-router-dom";

export const VideoViewPage = () => {
  const { id } = useParams();
  if (!id) {
    return null;
  }
  return (
    <div className="video__page_wrapper">
      <div className="videoplayer__wrapper">
        <VideoPlayer id={+id} />
      </div>
      <div className="video__side_bar">
        <VideoSideBar id={+id} />
      </div>
    </div>
  );
};
