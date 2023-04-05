export const buildVideoSrc = (src: string, previewImg?: string): Plyr.SourceInfo | null => {
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
  };
};