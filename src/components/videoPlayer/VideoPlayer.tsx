import "./videoPlayer.module.scss";
import "plyr-react/plyr.css";
import Plyr from "plyr-react";
import React from "react";
import {YouTubePlayer} from "./YouTubePlayer";
import {addLessonView} from "../../store/lessonSlice/lessonSlice";
import {buildVideoSrc} from "./helpers";
import {useAppDispatch} from "../../store/hooks";

const optionsVideoplayer = {
  quality: {
    default: 576,
    // The options to display in the UI, if available for the source media
    options: [1080, 720, 576, 480, 360, 240],
    forced: true,
  },
  // markers: {enabled: true,
  //   points: [
  //     { time: 15, label: "Test" },
  //     { time: 23, label: "Test" },
  //     { time: 31, label: "<strong>Test</strong> marker" },
  //   ],},
  controls: [
    "play-large", // The large play button in the center
    "restart", // Restart playback
    "rewind", // Rewind by the seek time (default 10 seconds)
    "play", // Play/pause playback
    "fast-forward", // Fast forward by the seek time (default 10 seconds)
    "progress", // The progress bar and scrubber for playback and buffering
    "current-time", // The current time of playback
    "duration", // The full duration of the media
    "mute", // Toggle mute
    "volume", // Volume control
    "captions", // Toggle captions
    "settings", // Settings menu
    "pip", // Picture-in-picture (currently Safari only)
    "airplay", // Airplay (currently Safari only)
    // 'download', // Show a download button with a link to either the current
    // source or a custom URL you specify in your options
    "fullscreen", // Toggle fullscreen
    "advertisement",
    "ads",
  ],
  seekTime: 10,
};

interface VideoPlayerProps {
  src: string;
  id: number;
  previewImg?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const {
    src, id, previewImg
  } = props;

  const dispatch = useAppDispatch();
  let count = 0;

  const addView = () => {
    if (!count) {
      dispatch(addLessonView(id));
      count++;
    }
  };

  const isYoutubeSource = src.toLowerCase().includes("/embed/");
  const videoId = src.split("/").reverse()[0];

  return (
    <div>
      {isYoutubeSource && <div className="video-player__wrapper" id="player" key="plyr-youtube">
        <YouTubePlayer videoId={videoId} onClick={addView}/>
      </div>}
      {!isYoutubeSource && <div className="player" onClick={addView}>
        <Plyr options={optionsVideoplayer} source={buildVideoSrc(src, previewImg)}/>
      </div>}
    </div>
  );
};
