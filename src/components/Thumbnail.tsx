import "./button.scss";
import "./Thumbnail.scss";
import { 
  ChangeEvent, FC, useState 
} from "react";
import { ReactComponent as ChangeFile } from "./icons/changeFile.svg";
import { ILessonBack } from "./types/types";
import { ReactComponent as Upload } from "./icons/upload.svg";
import frame85 from "./icons/Frame85.png";
import { useIntl } from "react-intl";

interface ThumbnailProps {
  lesson?: ILessonBack | null;
  onImageUrlChange : (arg: string) => void;
  imageURL: string;
}

interface imageTypes {
  lastModified?: number;
  lastModifiedDate?: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath?: string;
}

export const Thumbnail: FC<ThumbnailProps> = (props) => {

  const onImageUrlChange = props.onImageUrlChange;
  const intl = useIntl();
  const fileReader = new FileReader();
  const [image, setImage] = useState<imageTypes>();
  const [imageTypeError, setImageTypeError] = useState(false);
  const [imageSizeError, setImageSizeError] = useState(false);
  const [imageOnPage, setImageOnPage] = useState("");

  fileReader.onloadend = () => {
    setImageOnPage(fileReader.result as string);
  };

  const handleOnChange = (e: ChangeEvent<any>) => {
    e.preventDefault();
    const image = e?.target["files"][0];
    setImageTypeError(false);
    setImageSizeError(false);
  
    if (image.size <= 2_000_000) {
      if (
        image.type === "image/jpeg" ||
        image.type === "image/jpg" ||
        image.type === "image/png" ||
        image.type === "image/gif"
      ) {
        setImage(image);
        onImageUrlChange(image);
        fileReader.readAsDataURL(image);
      } else {
        setImageTypeError(true);
      }
    } else {
      setImageSizeError(true);
    }
  };


  return (
    <div className="thumbnail__wrapper">
      {props.lesson?.image_link === undefined ? (
        <div>{intl.formatMessage({ id: "app.thumbnail.loading" })}</div>
      ) : props.lesson?.image_link === null && !image ? (
        <div className="thumbnail__upload">
          <label htmlFor="but__loader" className="button__fs16">
            <div className="svg__upload">
              <Upload />
            </div>
            {intl.formatMessage({ id: "app.button.uploadThumbnail" })}
          </label>
          <input
            id="but__loader"
            type="file"
            className="button__notsee"
            onChange={handleOnChange}
          />
        </div>
      ) : (
        <div className="thumbnail__withpicture">
          <div className="thumbnail__left">
            <div className="thumbnail__left-inner">
              <div className="thumbnail__picture">
                <img
                  className="thumbnail__img"
                  src={
                    props.imageURL
                      ? imageOnPage
                      : props.lesson?.image_link != null
                        ? props.lesson?.image_link
                        : frame85
                  }
                  alt="picture"
                />
              </div>
              <div className="thumbnail__item-info">
                <p
                  className="thumbnail__item-name"
                  title={
                    image
                      ? image.name
                      : props.lesson?.image_name != null
                        ? props.lesson?.image_name
                        : "No name"
                  }
                >
                  {image
                    ? image.name
                    : props.lesson?.image_name != null
                      ? props.lesson?.image_name
                      : "No name"}
                </p>
                <p className="thumbnail__item-size">
                  {image
                    ? (Math.floor(image.size) / 1000000).toFixed(2)
                    : props.lesson?.image_size != null
                      ? (Math.floor(+props.lesson?.image_size) / 1000000).toFixed(2)
                      : "0.0"}{" "}
                  MB
                </p>
              </div>
            </div>
          </div>
          <div className="thumbnail__right">
            <div className="thumbnail__right-inner">
              <label htmlFor="but__loader" className="button__fs16-white">
                <div className="svg__change">
                  <ChangeFile />
                </div>
                {intl.formatMessage({ id: "app.button.change" })}
              </label>
              <input
                id="but__loader"
                type="file"
                className="button__notsee"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      )}
      {imageTypeError && (
        <div className="thumbnail__error">
          {intl.formatMessage({ id: "app.thumbnail.imageTypeError" })}
        </div>
      )}
      {imageSizeError && (
        <div className="thumbnail__error">
          {intl.formatMessage({ id: "app.thumbnail.imageSizeError" })}
        </div>
      )}
    </div>
  );
};
