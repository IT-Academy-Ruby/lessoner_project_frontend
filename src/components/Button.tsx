import "./button.scss";
import React, { Fragment, MouseEventHandler } from "react";

type ButtonProps = {
  buttonType: "button" | "submit" | "reset";
  buttonText: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  buttonIcon?: React.ReactNode;
}

const Button = ({
  buttonType, buttonText, onClick, className, buttonIcon
}: ButtonProps) => {
  return (
    <Fragment>
      <button type={buttonType} className={className} onClick={onClick}>
        {buttonIcon}
        {buttonText}
      </button>
    </Fragment>
  );
};

export default Button;