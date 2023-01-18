/* eslint-disable max-len */
import "./index.scss";
import "plyr-react/plyr.css";
import React, { useEffect, useState } from "react";
import Plyr from "plyr-react";
import { buildVideoSrc } from "./VideoPlayerHelper";

const optionsVideoplayer = {
  quality: {
    default: 576,
    // The options to display in the UI, if available for the source media
    options: [1080, 720, 576, 480, 360, 240],
    forced: true,
  },
  markers: {
    enabled: true,
    points: [
      { time: 15, label: "Test" },
      { time: 23, label: "Test" },
      { time: 31, label: "<strong>Test</strong> marker" },
    ],
  },
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
  onAddViewer: () => void;
  isViewed: boolean;
  previewImg?: string;
}
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  onAddViewer,
  isViewed,
  previewImg,
}) => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<Plyr.SourceInfo | null>(null);

  useEffect(() => {
    setDataIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (!dataIsLoaded) {
      setVideoSrc(buildVideoSrc(src, previewImg));
      setDataIsLoaded(true);
    }
  }, [dataIsLoaded, src, previewImg]);

  return (
    <>
      {videoSrc && dataIsLoaded ? (
        <div className="player" onClick={!isViewed ? onAddViewer : undefined}>
          <Plyr options={optionsVideoplayer} source={videoSrc} />
        </div>
      ) : (
        <h1>Загрузка данных</h1>
      )}
    </>
  );
};
