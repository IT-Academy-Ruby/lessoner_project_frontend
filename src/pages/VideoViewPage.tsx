import { VideoPlayer } from "../../src/components/body/content/videoplayer/Videoplayer";
import "./VideoViewPage.scss";
export const VideoViewPage=() => {
  return <div className="video__page_wrapper">
    <VideoPlayer />
    <div className="pagination">
     Привет 
    </div>
  </div>;
};
