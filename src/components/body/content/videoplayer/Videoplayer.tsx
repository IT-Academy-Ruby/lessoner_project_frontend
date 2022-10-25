import React from "react";
import Plyr from "plyr-react";
// import Vimeo from '@u-wave/react-vimeo';
import "plyr-react/plyr.css";

import './index.scss';

const videoSrc: {
  type: string;
  title: string;
  sources: [{
    src: string;
    type: string;
    size: number
  }],
  poster: string;
  tracks: [{
    kind: string;
      label: string;
      srclang: string;
      src: string;
      default: boolean;
  }],
  previewThumbnails: {
    enabled: boolean;
    src: string[];
  },
  tooltips: {
    controls: boolean;
  },

} = 

{

  type: "video",
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
      kind: "captions",
      label: "Russian",
      srclang: "ru",
      src: "../subtitles/subtitles-ru.vtt",
      default: true
    },
    {
      kind: "captions",
      label: "English",
      srclang: "en",
      src: "../subtitles/subtitles-en.vtt",
      default: true
    },
    {
      kind: "captions",
      label: "Ukraine",
      srclang: "ua",
      src: "../subtitles/subtitles-ua.vtt",
      default: true
    },
  ],
  previewThumbnails: {
    enabled: true,
    src: ['https://cdn.plyr.io/static/demo/thumbs/100p.vtt', 'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'],
  },
  tooltips: {
    controls: true,
  },
  //Another exemple  a videoplayer
  // type: 'video',
  // title: 'View From A Blue Moon',
  // sources: [
  //   {
  //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
  //     type: 'video/mp4',
  //     size: 576,
  //   },
  //   {
  //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
  //     type: 'video/mp4',
  //     size: 720,
  //   },
  //   {
  //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
  //     type: 'video/mp4',
  //     size: 1080,
  //   },
  //   {
  //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
  //     type: 'video/mp4',
  //     size: 1440,
  //   },
  // ],
  // poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
  // tracks: [
  //   {
  //     kind: 'captions',
  //     label: 'English',
  //     srclang: 'en',
  //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
  //     default: true,
  //   },
  //   {
  //     kind: 'captions',
  //     label: 'French',
  //     srclang: 'fr',
  //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
  //   },
  // ],
  // previewThumbnails: {
  //   src: ['https://cdn.plyr.io/static/demo/thumbs/100p.vtt', 'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'],
  // },

  //AUDIO
  // type: 'audio',
  // title: 'Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;',
  // sources: [
  //   {
  //     src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
  //     type: 'audio/mp3',
  //   },
  //   {
  //     src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg',
  //     type: 'audio/ogg',
  //   },
  // ],

  //YOUTUBE
  // type: 'video',
  // sources: [
  //   {
  //     src: 'https://youtube.com/watch?v=bTqVqk7FSmY',
  //     provider: 'youtube',
  //   },
  // ],

  //VIMEO
  // type: 'video',
  // sources: [
  //   {
  //     src: 'https://vimeo.com/40648169',
  //     provider: 'vimeo',
  //   },
  // ],
};

const optionsVideoplayer = {
  quality: {
    default: 576,
    // The options to display in the UI, if available for the source media
    options: [1080, 720, 576, 480, 360, 240],
    forced: true,
    onChange: null,
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

// learn more https://github.com/sampotts/plyr#the-source-setter

export default function App() {
  return (
    <div className="wrapper">
      <h1>PLYR</h1>
      <VideoPlayer />
    </div>
  );
}

export const VideoPlayer: React.FC = () => {
  return (
    <div className ="player">
      <Plyr options={optionsVideoplayer}
        source={videoSrc}
      />
      {/* <Vimeo options={optionsVideoplayer} 
      source={videoSrc} 
       /> */}
    </div>
  );
};

console.log(Plyr);