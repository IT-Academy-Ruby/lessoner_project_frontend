import React from "react";
import Plyr from "plyr-react";

import "plyr-react/plyr.css";
import './index.scss';

const videoSrc  = {
  type: "video" as const,
  title: "Elephants",
  sources: [
    {
      src:
        "https://rawcdn.githack.com/chintan9/Big-Buck-Bunny/915c4b2aba75614b20dec3852375b394bb305f10/ElephantsDream.mp4",
      type: "video/mp4",
      size: 576,
    },
    {
      src:
        "https://rawcdn.githack.com/chintan9/Big-Buck-Bunny/915c4b2aba75614b20dec3852375b394bb305f10/ElephantsDream.mp4",
      type: "video/mp4",
      size: 720,
    },
    {
      src:
        "https://rawcdn.githack.com/chintan9/Big-Buck-Bunny/915c4b2aba75614b20dec3852375b394bb305f10/ElephantsDream.mp4",
      type: "video/mp4",
      size: 1080,
    },

  ],
  poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Elephants_Dream_cover.jpg/1200px-Elephants_Dream_cover.jpg?20060831021346',
  tracks: [
    {
      kind: "captions" as const,
      label: "Russian",
      srclang: "ru",
      src: "../examples/plyr/subtitles/subtitles-ru.vtt",
      default: true
    },
    {
      kind: "captions" as const,
      label: "English",
      srclang: "en",
      src: "../examples/plyr/subtitles/subtitles-en.vtt",
      default: true
    },
  ],
  // Preview example
  previewThumbnails: {
    enabled: true,
    src: ['https://cdn.plyr.io/static/demo/thumbs/100p.vtt', 'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'],
  },
  tooltips: {
    controls: true,
  },
};

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
      {
        time: 15,
        label: "Test",
      },
      {
        time: 23,
        label: "Test",
      },
      {
        time: 31,
        label: '<strong>Test</strong> marker',
      },
    ],
  },
  controls: [
    'play-large', // The large play button in the center
    'restart', // Restart playback
    'rewind', // Rewind by the seek time (default 10 seconds)
    'play', // Play/pause playback
    'fast-forward', // Fast forward by the seek time (default 10 seconds)
    'progress', // The progress bar and scrubber for playback and buffering
    'current-time', // The current time of playback
    'duration', // The full duration of the media
    'mute', // Toggle mute
    'volume', // Volume control
    'captions', // Toggle captions
    'settings', // Settings menu
    'pip', // Picture-in-picture (currently Safari only)
    'airplay', // Airplay (currently Safari only)
    // 'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
    'fullscreen', // Toggle fullscreen
    'advertisement',
    'ads',
  ],
  seekTime: 10,
};

export default function App() {
  return (
    <VideoPlayer />
  );
}

export const VideoPlayer: React.FC = () => {
  return (
    <div className ="player">
      <Plyr options={optionsVideoplayer} source={videoSrc}
      />
    </div>
  );
};
