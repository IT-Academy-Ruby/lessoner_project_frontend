const buildVideoSrc = (src: string, previewImg?: string): Plyr.SourceInfo | null => {
  return {
    type: "video" as const,
    title: "Elephants",
    sources: [
      {
        src: src,
        type: "video/mp4",
        size: 1080,
      },
    ],
    poster: previewImg,
    //Subtitles
    tracks: [
      {
        kind: "captions" as const,
        label: "Russian",
        src: "",
        default: true,
      },
      {
        kind: "captions" as const,
        label: "English",

        src: "",
        default: true,
      },
    ],
    // Preview example
    // previewThumbnails: {enabled: true,
    //   src: [
    //     "https://cdn.plyr.io/static/demo/thumbs/100p.vtt",
    //     "https://cdn.plyr.io/static/demo/thumbs/240p.vtt",
    //   ],},
  };
};

export default {buildVideoSrc};
