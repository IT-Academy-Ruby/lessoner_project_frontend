import "./button.scss";
import "./Thumbnail.scss";
import frame85 from "./icons/Frame85.png";
import Placeholder from "./icons/PlaceholderM.png";
import { useIntl } from "react-intl";
import React, { ChangeEvent, FC, useState } from "react";
import request from "../services/request";
import { ILessonBack } from "./types/types";
import { ReactComponent as Upload } from "./icons/upload.svg";
import { ReactComponent as ChangeFile } from "./icons/changeFile.svg";
import { BACKEND_URL_LESSONS } from "../constants";

interface ThumbnailProps {
  lesson?: ILessonBack | null;
  imageURltoParent?: (imageURL: any) => void;
}

interface imageTypes {
  lastModified?: number;
  lastModifiedDate?: Date;
  name: string;
  size: number;
  type?: string;
  webkitRelativePath?: string;
}

export const Thumbnail: FC<ThumbnailProps> = (props, {imageURltoParent}) => {

  const intl = useIntl();
  const fileReader = new FileReader();
  const formData = new FormData();
  const [image, setImage] = useState<any>();
  const [imageURL, setImageURL] = useState<any>();


 
    imageURltoParent = (imageURL: any) => imageURL;
    
    /* console.log("Thumbnail: ", imageURL); */

  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
    imageURltoParent(imageURL);
  };

  const handleOnChange = (e: ChangeEvent<any>) => {
    e.preventDefault();
    console.log("change", e.target.files[0]);
    if (e.target.files[0].size <= 2_000_000) {
      const file = e.target.files[0];
      setImage(file);
      fileReader.readAsDataURL(file);

      

    } else {
      alert(
        "size to big: " +
          (Math.floor(e.target.files[0].size) / 1_000_000).toFixed(2)
      );
    }
  };



  const imageUpload = () => {
    formData.append("lesson_image", imageURL);
    const token = localStorage.getItem("JWT");
    fetch(`${BACKEND_URL_LESSONS + props.lesson?.id}`, {
      method: "PUT",
      headers: new Headers({ Authorization: `Bearer ${token}` }),
      body: formData,
    });
  };

  return (
    <div className="thumbnail__wrapper">
      {props.lesson?.image_link === null && !image ? (
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
              <button onClick={imageUpload}>Upload</button>
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
    </div>
  );
};
