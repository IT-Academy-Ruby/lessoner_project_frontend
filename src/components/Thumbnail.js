import "./Thumbnail.scss";
import Button from "./Button";
import frame85 from "./icons/Frame85.png";
import { useIntl } from "react-intl";
import { ChangeEvent, useState } from "react";

export const Thumbnail = () => {
  const intl = useIntl();
  const fileReader = new FileReader();
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  }
  const handleOnChange = (e/* : ChangeEvent<HTMLInputElement> */) => {
    e.preventDefault();
    console.log("change", e.target.files[0]);
    if (e.target.files[0].size <= 2000000) {
    const file = e.target.files[0];
    setImage(file);
    fileReader.readAsDataURL(file);
    } else {
      alert("size to big: " + (Math.floor(e.target.files[0].size)/1000000).toFixed(2) )
    }
  };
  return (
    <div className="thumbnail__wrapper">
      <div className="thumbnail__left">
        <div className="thumbnail__left-inner">
          <div className="thumbnail__picture">
            <img className="thumbnail__img" src={imageURL ? imageURL : frame85} alt="picture" />
          </div>
          <div className="thumbnail__item-info">
            <p className="thumbnail__item-name">{image ? image.name : "Some.png"}</p>
            <p className="thumbnail__item-size">{image ? (Math.floor(image.size)/1000000).toFixed(2) : "0.0"} MB</p>
          </div>
        </div>
      </div>
      <div className="thumbnail__right">
        <div className="thumbnail__right-inner">
          <label
            htmlFor="but__loader"
            className="button__fs16-white"
          >
            Change
          </label>
          <input
            id="but__loader"
            type="file"
            className="button__notsee"
            onChange={handleOnChange}
          />
          {/* <Button
            buttonType="button"
            buttonText={intl.formatMessage({ id: "app.button.change" })}
            className="button__fs16-white"
            buttonIcon={<div className="svg__change"></div>}
          /> */}
        </div>
      </div>
    </div>
  );
};
