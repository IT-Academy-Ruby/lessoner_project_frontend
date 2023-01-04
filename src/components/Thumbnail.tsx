import "./Thumbnail.scss";
import frame85 from "./icons/Frame85.png";
import Placeholder from "./icons/PlaceholderM.png";
import { useIntl } from "react-intl";
import React, { ChangeEvent, FC, useState } from "react";
import request from "../services/request";
import { ILessonBack } from "./types/types";
import { ReactComponent as Upload } from "./icons/upload.svg";

interface ThumbnailProps {
  propImage?: string;
}

interface imageTypes {
  lastModified?: number;
  lastModifiedDate?: Date;
  name: string;
  size: number;
  type?: string;
  webkitRelativePath?: string;
}

export const Thumbnail: FC<ThumbnailProps> = (propImage) => {
  const intl = useIntl();
  const fileReader = new FileReader();
  const [image, setImage] = useState<imageTypes>();
  const [imageURL, setImageURL] = useState<any>();
  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  };
  const handleOnChange = (e: ChangeEvent<any>) => {
    e.preventDefault();
    console.log("change", e.target.files[0]);
    if (e.target.files[0].size <= 2000000) {
      const file = e.target.files[0];
      setImage(file);
      fileReader.readAsDataURL(file);

    /* const formData = new FormData();
    formData.append("file", file); */
    /* request("https://lessoner.s3.amazonaws.com/", "PUT", formData); */
    } else {
      alert(
        "size to big: " +
          (Math.floor(e.target.files[0].size) / 1000000).toFixed(2)
      );
    }
  };

  console.log(propImage.propImage);

  return (
    <div className="thumbnail__wrapper">
      {propImage.propImage === null && !image ? (
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
                    imageURL
                      ? imageURL
                      : propImage.propImage != null
                      ? propImage.propImage
                      : frame85
                  }
                  alt="picture"
                />
              </div>
              <div className="thumbnail__item-info">
                <p
                  className="thumbnail__item-name"
                  title={image ? image.name : "Some.png"}
                >
                  {image ? image.name : "Some image name.png"}
                </p>
                <p className="thumbnail__item-size">
                  {image
                    ? (Math.floor(image.size) / 1000000).toFixed(2)
                    : "0.0"}{" "}
                  MB
                </p>
              </div>
            </div>
          </div>
          <div className="thumbnail__right">
            <div className="thumbnail__right-inner">
              <label htmlFor="but__loader" className="button__fs16-white">
                <div className="svg__change"></div>
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
    </div>
  );
};
