import { Lesson } from "../../content/lessons/Lessons";

export const getSrcFromId = (lessonsArr: Lesson[], id: number | undefined) => {
  const foundElem = lessonsArr.find((elem) => elem.id === id);
  if (foundElem) return foundElem.video_link;
  return lessonsArr[1].video_link;
};

export const buildVideoSrc = (src: string): Plyr.SourceInfo | null => {
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
    poster:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/" +
      "Elephants_Dream_cover.jpg/1200px-Elephants_Dream_cover.jpg?20060831021346",
    tracks: [
      {
        kind: "captions" as const,
        label: "Russian",
        src: "../examples/plyr/subtitles/subtitles-ru.vtt",
        default: true,
      },
      {
        kind: "captions" as const,
        label: "English",

        src: "../examples/plyr/subtitles/subtitles-en.vtt",
        default: true,
      },
    ],
    // Preview example
    previewThumbnails: {
      enabled: true,
      src: [
        "https://cdn.plyr.io/static/demo/thumbs/100p.vtt",
        "https://cdn.plyr.io/static/demo/thumbs/240p.vtt",
      ],
    },
  };
};
