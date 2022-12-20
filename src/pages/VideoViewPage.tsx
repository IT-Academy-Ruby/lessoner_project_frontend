import "./VideoViewPage.scss";
import { VideoPlayer } from "../../src/components/body/content/videoplayer/Videoplayer";
import { useParams } from "react-router-dom";
export const VideoViewPage=() => {
  const { id }=useParams();
  return <div className="video__page_wrapper">
    
    <VideoPlayer id={id} />
    <div className="pagination">
     Привет 
    </div>
  </div>;
};
