import "./videoLesson.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {
  useEffect, useRef, useState
} from "react";
import Button from "../../../../Button";
import Cross from "../../../../icons/video_cross.svg";
import Download from "../../../../icons/download.svg";
import Select from "../../../../icons/select_video.svg";
import {VIDEO_DATA} from "../../../../../constants";
import Video_button from "../../../../icons/video_button.svg";

type VideoLessonProps = {
  selectVideo: {
    name: string;
    size: number;
    type: string;
    video: Blob;
  };
  setSelectVideo: (object: object) => void;
  errorVideo: string;
  setErrorVideo: (error: string) => void;
  isDisabledSelectFile: boolean;
}

const VideoLesson = ({
  selectVideo, setSelectVideo, errorVideo, setErrorVideo, isDisabledSelectFile
}: VideoLessonProps) => {
  const intl = useIntl();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isChange, setIsChange] = useState(false);

  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectVideo({
        name: event.target["files"][0]["name"],
        size: event.target["files"][0]["size"],
        type: event.target["files"][0]["type"],
        video: event.target["files"][0],
      });
    }
  };

  useEffect(() => {
    if (selectVideo.name) {
      const isFormat = VIDEO_DATA.format.some(format => format ===
        "." + selectVideo.type.slice(selectVideo.type.indexOf("/") + 1).toUpperCase());
      if (selectVideo.size > VIDEO_DATA.size) {
        setErrorVideo(intl.formatMessage({id: "app.incorrectVideoFile"}));
      } else if (!isFormat) {
        setErrorVideo(intl.formatMessage({id: "app.incorrectVideoFile"}));
      } else if (!selectVideo.name && isChange) {
        setErrorVideo(intl.formatMessage({id: "app.categories.selectFile"}));
      } else {
        setErrorVideo("");
      }
    }
  }, [intl, isChange, setErrorVideo, selectVideo]);

  const clearSelectVideo = () => {
    setSelectVideo({
      name: "",
      size: 0,
      type: "",
      video: "",
    });
    setErrorVideo("");
  };

  return (
    <div className="video-label">
      <FormattedMessage id="app.UploadVideoFromComputer"/>
      <input
        ref={fileRef}
        type="file"
        className="category-file"
        accept=".MP4, .AVI, .WMV, .MOV, .3GP, .FLV, .MPG, .MPEG-1, .MPEG-2,
        .MPEG-4, .WEBМ, .MPEGPS, .3GPP"
        onChange={(event) => {
          handleSelectFile(event);
        }}
        onBlur={() => setIsChange(true)}
      />
      <div className="field-video">
        <div className="upload">
          <img src={Download} alt="download" className="cloud-video" />
          <span className="upload-video">
            <FormattedMessage id="app.UploadVideo" />
          </span>
          <span className="video-size">
            {!errorVideo && <FormattedMessage id="app.VideoSize" />}
            {errorVideo && <span className="error message">{errorVideo}</span>}
          </span>
        </div>
        {!selectVideo.name &&
          <div className="video-buttons">
            <span className="upload-text">
              <FormattedMessage id="app.DragAndDrop" />
            </span>
            <span className="or-upload upload-text">
              <FormattedMessage id="app.or" />
            </span>
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({id: "app.SelectFile"})}
              className="button-select"
              buttonImage={Select}
              imageStyle="icon-button"
              onClick={handleUpload}
              disabled={isDisabledSelectFile}
            />
          </div>}
        {selectVideo.name && <span className="video-buttons">
          <img src={Video_button} alt="icon-button" />
          <span className="video-size">
            {selectVideo.name}
          </span>
          <img src={Cross} alt="cross" onClick={clearSelectVideo} className="video-cross" />
        </span>}
      </div>
    </div>
  );
};

export default VideoLesson;