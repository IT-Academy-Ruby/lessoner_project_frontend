import { VideoPlayer } from "../../src/components/body/content/videoplayer/Videoplayer";
import "./VideoViewPage.scss";
import { useParams } from "react-router-dom";
export const VideoViewPage=() => {
  const { id } = useParams()
  console.log(id)
  return <div className="video__page_wrapper">
    
    <VideoPlayer />
    <div className="pagination">
     Привет 
    </div>
  </div>;
};
