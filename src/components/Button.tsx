import "./button.module.scss";
import {Fragment, MouseEventHandler} from "react";

type ButtonProps = {
  buttonType: "button" | "submit" | "reset";
  buttonText: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  buttonImage?: string;
  imageStyle?: string;
}

export const Button = ({
  buttonType, buttonText, onClick, className, disabled = false, buttonImage, imageStyle
}: ButtonProps) => {
  return (
    <Fragment>
      <button
        type={buttonType}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {buttonImage && <img src={buttonImage} alt="icon" className={imageStyle}/>}
        {buttonText}
      </button>
    </Fragment>
  );
};