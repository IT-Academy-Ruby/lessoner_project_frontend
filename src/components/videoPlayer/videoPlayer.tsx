/* eslint-disable max-len */
import "./videoPlayer.scss";
import "plyr-react/plyr.css";
import React, { useEffect, useState } from "react";
import PlayerHelper from "./helpers";
import Plyr from "plyr-react";

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
  onClick: () => void;
  previewImg?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const {
    src, onClick, previewImg 
  } = props;
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<Plyr.SourceInfo | null>(null);
  const [isYoutubeSrc, setIsYoutubeSrc] = useState(false);

  useEffect(() => {
    setDataIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (!dataIsLoaded) {
      if (PlayerHelper.isYoutubeSource(src)) {
        setIsYoutubeSrc(true);
      } else {
        setVideoSrc(PlayerHelper.buildVideoSrc(src, previewImg));
      }

      setDataIsLoaded(true);
    }
  }, [dataIsLoaded, src, previewImg]);

  useEffect(() => {
    if (isYoutubeSrc) {
      onClick(); // for youtube we increment views counter with page loading
    }
  }, [isYoutubeSrc, onClick]);


  if (isYoutubeSrc) {
    return (
      <div className="video-player__wrapper" id="player" key="plyr-youtube">
        <iframe
          src={`${src}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}
          allowFullScreen
        />
      </div>
    );
  }

  if (videoSrc && dataIsLoaded) {
    return (
      <div className="player" onClick={onClick}>
        <Plyr options={optionsVideoplayer} source={videoSrc} />
      </div>
    );
  }

  return null;
};
