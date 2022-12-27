import "./Thumbnail.scss";
import Button from "./Button";
import frame85 from "./icons/Frame85.png";
import { useIntl } from "react-intl";

export const Thumbnail = () => {
  const intl = useIntl();
  return (
    <div className="thumbnail__wrapper">
      <div className="thumbnail__left">
        <div className="thumbnail__left-inner">
          <div className="thumbnail__picture">
            <img className="thumbnail__img" src={frame85} alt="picture" />
          </div>
          <div className="thumbnail__item-info">
            <p className="thumbnail__item-name">Image-thumb.jpg</p>
            <p className="thumbnail__item-size">2.3 MB</p>
          </div>
        </div>
      </div>
      <div className="thumbnail__right">
        <div className="thumbnail__btn-wrapper">
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({ id: "app.button.cancel" })}
            className="button__fs16-white button__fs16-white-evlt"
          />
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({ id: "app.button.save" })}
            className="button__fs16"
          />
        </div>
      </div>
    </div>
  );
};
