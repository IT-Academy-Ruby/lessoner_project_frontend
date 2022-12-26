import "./Thumbnail.scss"
import React from "react";
import classNames from "classnames";
import frame85 from "./icons/Frame85.png";
import { useIntl } from "react-intl";
import Button from "./Button";

export const Thumbnail = () => {
  const intl = useIntl();
  return (
    <div className="evlth__inner">
      <div className="evlth__inner-left">
        <div className="evlth__item">
          <img className="evlth__item-img" src={frame85} alt="picture" />
          <div className="evlth__item-info">
            <p className="evlth__item-name">Image-thumb.jpg</p>
            <p className="evlth__item-size">2.3 MB</p>
          </div>
        </div>
      </div>
      <div className="evlth__inner-right">
        <Button
          buttonType="button"
          buttonText={intl.formatMessage({ id: "app.button.cancel" })}
          className="button__fs16-white button__fs16-white-evlt"
        />
        <Button
          buttonType="submit"
          buttonText={intl.formatMessage({ id: "app.button.save" })}
          className="button__fs16"
        />
      </div>
    </div>
  );
};
