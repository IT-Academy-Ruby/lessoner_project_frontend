import YouTube, {YouTubeProps} from "react-youtube";

type YouTubePlayerProps = {
  videoId: string;
  onClick: ()=>void;
};
const YouTubePlayer = ({videoId, onClick}: YouTubePlayerProps) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {autoplay: 0,},
  };
  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} onPlay={onClick}/>;
};

export default YouTubePlayer;